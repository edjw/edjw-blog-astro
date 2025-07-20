# Migration Scripts - Delete After Testing

These scripts were used to migrate the blog to a consistent folder structure where:
1. All blog posts use folders with `index.md`
2. Images are co-located with their posts

## Scripts:

### `migrate-blog-images.js`
- Migrated images from `src/images/` to their respective blog post folders
- Updated image paths from `@/images/` to `./`
- Moved 22 images across 7 blog posts

### `migrate-all-to-folders.js`
- Converted all remaining `.md` files to folder structure
- Ensured every post uses the same `folder/index.md` pattern
- Converted 40 posts to folders

### `rollback-blog-images.js`
- Rollback script if migration needed to be reversed
- Moves images back to centralized folder
- Converts folders back to `.md` files

## Status:
✅ Migration completed successfully
✅ All 47 blog posts now use consistent folder structure
✅ All blog images are co-located with their posts
✅ Site builds and runs successfully

These scripts can be deleted once you're confident the migration is stable.