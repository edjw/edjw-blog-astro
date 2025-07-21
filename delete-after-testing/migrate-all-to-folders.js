#!/usr/bin/env node

/**
 * Migration script to convert ALL remaining .md posts to folder structure
 * This creates consistency - every post uses the same structure
 * 
 * Usage:
 *   node migrate-all-to-folders.js --dry-run  # Test run
 *   node migrate-all-to-folders.js            # Perform migration
 */

const fs = require('fs').promises;
const path = require('path');

const BLOG_DIR = path.join(__dirname, 'src/content/blog');
const DRY_RUN = process.argv.includes('--dry-run');

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

async function convertToFolder(mdFile) {
  const mdPath = path.join(BLOG_DIR, mdFile);
  const postName = path.basename(mdFile, '.md');
  const folderPath = path.join(BLOG_DIR, postName);
  const newMdPath = path.join(folderPath, 'index.md');
  
  log(`Processing: ${mdFile}`, 'blue');
  
  try {
    // Check if it's already a folder
    const stats = await fs.stat(mdPath);
    if (stats.isDirectory()) {
      log(`  Already a folder, skipping...`, 'gray');
      return { file: mdFile, status: 'skipped' };
    }
    
    if (!DRY_RUN) {
      // Create folder
      await fs.mkdir(folderPath, { recursive: true });
      
      // Read content
      const content = await fs.readFile(mdPath, 'utf-8');
      
      // Write to index.md
      await fs.writeFile(newMdPath, content);
      
      // Delete original .md file
      await fs.unlink(mdPath);
      
      log(`  ✓ Converted to folder structure`, 'green');
    } else {
      log(`  [DRY RUN] Would convert to: ${postName}/index.md`, 'yellow');
    }
    
    return { file: mdFile, status: 'success' };
    
  } catch (error) {
    log(`  Error: ${error.message}`, 'red');
    return { file: mdFile, status: 'error', error: error.message };
  }
}

async function migrate() {
  log('=== Convert All Posts to Folder Structure ===', 'blue');
  log(DRY_RUN ? 'Running in DRY RUN mode' : 'Running in LIVE mode', DRY_RUN ? 'yellow' : 'green');
  
  try {
    // Get all entries in blog directory
    const entries = await fs.readdir(BLOG_DIR);
    
    // Filter for .md files only
    const mdFiles = entries.filter(f => f.endsWith('.md'));
    
    log(`\nFound ${mdFiles.length} .md files to convert`, 'blue');
    
    if (mdFiles.length === 0) {
      log('\nAll posts already use folder structure!', 'green');
      return;
    }
    
    // Process each file
    const results = [];
    for (const mdFile of mdFiles) {
      const result = await convertToFolder(mdFile);
      results.push(result);
    }
    
    // Summary
    log('\n=== Migration Summary ===', 'blue');
    const successful = results.filter(r => r.status === 'success').length;
    const skipped = results.filter(r => r.status === 'skipped').length;
    const errors = results.filter(r => r.status === 'error').length;
    
    log(`✓ Converted: ${successful}`, 'green');
    log(`- Skipped: ${skipped}`, 'gray');
    log(`✗ Errors: ${errors}`, errors > 0 ? 'red' : 'gray');
    
    if (errors > 0) {
      log('\nErrors:', 'red');
      results.filter(r => r.status === 'error').forEach(r => {
        log(`  ${r.file}: ${r.error}`, 'red');
      });
    }
    
    if (DRY_RUN) {
      log('\n✓ Dry run complete. Run without --dry-run to perform migration.', 'yellow');
    } else {
      log('\n✓ Migration complete! All posts now use folder structure.', 'green');
    }
    
  } catch (error) {
    log(`\nFatal error: ${error.message}`, 'red');
    process.exit(1);
  }
}

migrate();