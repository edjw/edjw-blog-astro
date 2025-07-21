#!/usr/bin/env node

/**
 * Rollback script to reverse the blog image migration
 * Moves images back to src/images/ and converts folders back to .md files
 * 
 * Usage:
 *   node rollback-blog-images.js --dry-run  # Test run
 *   node rollback-blog-images.js            # Perform rollback
 */

const fs = require('fs').promises;
const path = require('path');
const { existsSync } = require('fs');

const BLOG_DIR = path.join(__dirname, 'src/content/blog');
const IMAGES_DIR = path.join(__dirname, 'src/images');
const DRY_RUN = process.argv.includes('--dry-run');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function rollbackPost(folderName) {
  const folderPath = path.join(BLOG_DIR, folderName);
  const indexPath = path.join(folderPath, 'index.md');
  const newMdPath = path.join(BLOG_DIR, `${folderName}.md`);
  
  log(`\nProcessing: ${folderName}/`, 'blue');
  
  try {
    // Read index.md
    let content = await fs.readFile(indexPath, 'utf-8');
    
    // Find all local image references
    const imageRegex = /!\[([^\]]*)\]\(\.\/([^)]+)\)/g;
    const images = [];
    let match;
    
    while ((match = imageRegex.exec(content)) !== null) {
      images.push({
        filename: match[2],
        altText: match[1]
      });
    }
    
    log(`  Found ${images.length} image(s) to move back`, 'green');
    
    // Update image paths back to @/images/
    for (const image of images) {
      const oldRef = `![${image.altText}](./${image.filename})`;
      const newRef = `![${image.altText}](@/images/${image.filename})`;
      content = content.replace(oldRef, newRef);
    }
    
    if (!DRY_RUN) {
      // Write the updated content as .md file
      await fs.writeFile(newMdPath, content);
      log(`  Created: ${folderName}.md`, 'green');
      
      // Move images back to src/images/
      for (const image of images) {
        const srcPath = path.join(folderPath, image.filename);
        const destPath = path.join(IMAGES_DIR, image.filename);
        
        if (existsSync(srcPath)) {
          await fs.copyFile(srcPath, destPath);
          log(`  Moved: ${image.filename} → src/images/`, 'green');
        }
      }
      
      // Remove the folder
      await fs.rm(folderPath, { recursive: true });
      log(`  Removed folder: ${folderName}/`, 'yellow');
      
    } else {
      log(`  [DRY RUN] Would create: ${folderName}.md`, 'yellow');
      for (const image of images) {
        log(`  [DRY RUN] Would move: ${image.filename} → src/images/`, 'yellow');
      }
      log(`  [DRY RUN] Would remove folder: ${folderName}/`, 'yellow');
    }
    
    return { folder: folderName, status: 'success', images: images.length };
    
  } catch (error) {
    log(`  Error: ${error.message}`, 'red');
    return { folder: folderName, status: 'error', error: error.message };
  }
}

async function rollback() {
  log('=== Blog Image Rollback Script ===', 'blue');
  log(DRY_RUN ? 'Running in DRY RUN mode' : 'Running in LIVE mode', DRY_RUN ? 'yellow' : 'green');
  
  try {
    const entries = await fs.readdir(BLOG_DIR, { withFileTypes: true });
    const folders = entries.filter(e => e.isDirectory()).map(e => e.name);
    
    log(`\nFound ${folders.length} folders to process`, 'blue');
    
    const results = [];
    for (const folder of folders) {
      const result = await rollbackPost(folder);
      results.push(result);
    }
    
    // Summary
    log('\n=== Rollback Summary ===', 'blue');
    const successful = results.filter(r => r.status === 'success').length;
    const errors = results.filter(r => r.status === 'error').length;
    
    log(`✓ Successful: ${successful}`, 'green');
    log(`✗ Errors: ${errors}`, errors > 0 ? 'red' : 'gray');
    
    if (DRY_RUN) {
      log('\n✓ Dry run complete. Run without --dry-run to perform rollback.', 'yellow');
    } else {
      log('\n✓ Rollback complete!', 'green');
    }
    
  } catch (error) {
    log(`\nFatal error: ${error.message}`, 'red');
    process.exit(1);
  }
}

rollback();