#!/bin/bash

# Updated post creation script that creates folder structure
# Usage: ./post-new.sh "Your Blog Post Title"

cd src

# Generate date and slug
DATE=$(date +%Y-%m-%d)
TITLE="$1"
SLUG=$(echo "$TITLE" | sed 's/[^a-zA-Z0-9 ]//g' | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
FOLDER_NAME="${DATE}-${SLUG}"

# Create the folder
mkdir -p "content/blog/${FOLDER_NAME}"

# Use newmd to create the post, but we need to move it after
# First create it with a temporary name
TEMP_NAME="${FOLDER_NAME}-temp"
newmd blog --slug "${TEMP_NAME}" "$TITLE"

# Move the created file to index.md in the new folder
if [ -f "content/blog/${TEMP_NAME}.md" ]; then
    mv "content/blog/${TEMP_NAME}.md" "content/blog/${FOLDER_NAME}/index.md"
    echo "✓ Created new blog post: content/blog/${FOLDER_NAME}/index.md"
    echo "  You can now add images directly to: content/blog/${FOLDER_NAME}/"
else
    echo "✗ Error: Failed to create blog post"
    # Clean up the folder if creation failed
    rmdir "content/blog/${FOLDER_NAME}" 2>/dev/null
    exit 1
fi