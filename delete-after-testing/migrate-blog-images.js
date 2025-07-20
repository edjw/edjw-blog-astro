#!/usr/bin/env node

/**
 * Migration script to move blog images from centralized folder to co-located with posts
 * 
 * Usage:
 *   node migrate-blog-images.js --dry-run  # Test run without making changes
 *   node migrate-blog-images.js            # Perform actual migration
 */

const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');

// Configuration
const BLOG_DIR = path.join(__dirname, 'src/content/blog');
const IMAGES_DIR = path.join(__dirname, 'src/images');
const DRY_RUN = process.argv.includes('--dry-run');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  gray: '\x1b[90m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Find all image references in a markdown file
 * Looks for patterns like ![...](@/images/...)
 */
function findImageReferences(content) {
  const imageRegex = /!\[([^\]]*)\]\(@\/images\/([^)]+)\)/g;
  const images = [];
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    images.push({
      fullMatch: match[0],
      altText: match[1],
      imagePath: match[2],
      fullImagePath: path.join(IMAGES_DIR, match[2])
    });
  }
  
  return images;
}

/**
 * Update image references in markdown content
 * Changes @/images/... to ./...
 */
function updateImagePaths(content, images) {
  let updatedContent = content;
  
  for (const image of images) {
    const newReference = `![${image.altText}](./${path.basename(image.imagePath)})`;
    updatedContent = updatedContent.replace(image.fullMatch, newReference);
  }
  
  return updatedContent;
}

/**
 * Process a single blog post
 */
async function processBlogPost(mdFile) {
  const mdPath = path.join(BLOG_DIR, mdFile);
  const postName = path.basename(mdFile, '.md');
  const newFolderPath = path.join(BLOG_DIR, postName);
  const newMdPath = path.join(newFolderPath, 'index.md');
  
  log(`\nProcessing: ${mdFile}`, 'blue');
  
  try {
    // Read the markdown file
    const content = await fs.readFile(mdPath, 'utf-8');
    
    // Find all image references
    const images = findImageReferences(content);
    
    if (images.length === 0) {
      log(`  No images found, skipping...`, 'gray');
      return { post: mdFile, images: [], status: 'skipped' };
    }
    
    log(`  Found ${images.length} image(s)`, 'green');
    
    // Check if all referenced images exist
    const missingImages = [];
    for (const image of images) {
      if (!existsSync(image.fullImagePath)) {
        missingImages.push(image.imagePath);
      }
    }
    
    if (missingImages.length > 0) {
      log(`  Missing images: ${missingImages.join(', ')}`, 'red');
      return { post: mdFile, images: [], status: 'error', error: 'Missing images' };
    }
    
    if (!DRY_RUN) {
      // Create the new folder
      await fs.mkdir(newFolderPath, { recursive: true });
      log(`  Created folder: ${postName}/`, 'green');
      
      // Update content with new image paths
      const updatedContent = updateImagePaths(content, images);
      
      // Write the updated content to index.md
      await fs.writeFile(newMdPath, updatedContent);
      log(`  Created: ${postName}/index.md`, 'green');
      
      // Copy images to the new folder
      for (const image of images) {
        const destPath = path.join(newFolderPath, path.basename(image.imagePath));
        await fs.copyFile(image.fullImagePath, destPath);
        log(`  Copied: ${image.imagePath}`, 'green');
      }
      
      // Delete the original .md file
      await fs.unlink(mdPath);
      log(`  Deleted: ${mdFile}`, 'yellow');
      
    } else {
      log(`  [DRY RUN] Would create folder: ${postName}/`, 'yellow');
      log(`  [DRY RUN] Would move ${mdFile} → ${postName}/index.md`, 'yellow');
      for (const image of images) {
        log(`  [DRY RUN] Would copy: ${image.imagePath} → ${postName}/${path.basename(image.imagePath)}`, 'yellow');
      }
    }
    
    return { 
      post: mdFile, 
      images: images.map(img => img.imagePath), 
      status: 'success' 
    };
    
  } catch (error) {
    log(`  Error: ${error.message}`, 'red');
    return { post: mdFile, images: [], status: 'error', error: error.message };
  }
}

/**
 * Clean up migrated images from src/images/
 */
async function cleanupImages(migratedImages) {
  if (DRY_RUN) {
    log('\n[DRY RUN] Would delete the following images from src/images/:', 'yellow');
    for (const imagePath of migratedImages) {
      log(`  - ${imagePath}`, 'yellow');
    }
  } else {
    log('\nCleaning up migrated images from src/images/:', 'blue');
    for (const imagePath of migratedImages) {
      try {
        await fs.unlink(path.join(IMAGES_DIR, imagePath));
        log(`  Deleted: ${imagePath}`, 'green');
      } catch (error) {
        log(`  Failed to delete ${imagePath}: ${error.message}`, 'red');
      }
    }
  }
}

/**
 * Main migration function
 */
async function migrate() {
  log('=== Blog Image Migration Script ===', 'blue');
  log(DRY_RUN ? 'Running in DRY RUN mode - no changes will be made' : 'Running in LIVE mode - changes will be made', DRY_RUN ? 'yellow' : 'green');
  
  try {
    // Get all .md files in the blog directory
    const files = await fs.readdir(BLOG_DIR);
    const mdFiles = files.filter(f => f.endsWith('.md'));
    
    log(`\nFound ${mdFiles.length} blog posts to process`, 'blue');
    
    // Process each blog post
    const results = [];
    const allMigratedImages = new Set();
    
    for (const mdFile of mdFiles) {
      const result = await processBlogPost(mdFile);
      results.push(result);
      
      if (result.status === 'success') {
        result.images.forEach(img => allMigratedImages.add(img));
      }
    }
    
    // Summary
    log('\n=== Migration Summary ===', 'blue');
    const successful = results.filter(r => r.status === 'success').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const errors = results.filter(r => r.status === 'error').length;
    
    log(`✓ Successful: ${successful}`, 'green');
    log(`- Skipped (no images): ${skipped}`, 'gray');
    log(`✗ Errors: ${errors}`, errors > 0 ? 'red' : 'gray');
    log(`Total images to migrate: ${allMigratedImages.size}`, 'blue');
    
    if (errors > 0) {
      log('\nErrors:', 'red');
      results.filter(r => r.status === 'error').forEach(r => {
        log(`  ${r.post}: ${r.error}`, 'red');
      });
    }
    
    // Clean up migrated images from src/images/
    if (allMigratedImages.size > 0 && errors === 0) {
      await cleanupImages(Array.from(allMigratedImages));
    } else if (errors > 0) {
      log('\nSkipping image cleanup due to errors', 'yellow');
    }
    
    if (DRY_RUN) {
      log('\n✓ Dry run complete. Run without --dry-run to perform actual migration.', 'yellow');
    } else {
      log('\n✓ Migration complete!', 'green');
    }
    
  } catch (error) {
    log(`\nFatal error: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the migration
migrate();