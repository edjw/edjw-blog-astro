#!/bin/bash

# Blog post creation script
# Usage: ./post.sh "Your Blog Post Title"

set -e  # Exit on error

# Check if title provided
if [ -z "$1" ]; then
    echo "Usage: $0 \"Your Blog Post Title\""
    exit 1
fi

# Get script directory for absolute paths
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
BLOG_DIR="${SCRIPT_DIR}/src/content/blog"

# Generate date and slug
DATE=$(date +%Y-%m-%d)
TITLE="$1"

# Better slug generation: preserve hyphens, handle edge cases
# Convert to lowercase, replace spaces with hyphens, remove special chars except hyphens
# Collapse multiple hyphens, trim leading/trailing hyphens
SLUG=$(echo "$TITLE" | \
    tr '[:upper:]' '[:lower:]' | \
    sed 's/[[:space:]]/-/g' | \
    sed 's/[^a-z0-9-]//g' | \
    sed 's/--*/-/g' | \
    sed 's/^-//;s/-$//')

# Validate slug is not empty
if [ -z "$SLUG" ]; then
    echo "Error: Generated slug is empty. Please use a title with alphanumeric characters."
    exit 1
fi

FOLDER_NAME="${DATE}-${SLUG}"
FOLDER_PATH="${BLOG_DIR}/${FOLDER_NAME}"

# Check if folder already exists
if [ -d "$FOLDER_PATH" ]; then
    echo "Error: Post folder already exists: ${FOLDER_PATH}"
    echo "Please use a different title or remove the existing folder."
    exit 1
fi

# Create the folder
mkdir -p "$FOLDER_PATH"

# Check if npx/newmd is available
if ! command -v npx &> /dev/null; then
    echo "Error: npx not found. Please ensure npm is installed."
    rm -rf "$FOLDER_PATH"
    exit 1
fi

# Use newmd to create the post with a temporary name
TEMP_NAME="${FOLDER_NAME}-temp"
TEMP_PATH="${BLOG_DIR}/${TEMP_NAME}.md"

# Change to src directory for newmd (it requires this)
cd "${SCRIPT_DIR}/src"

# Create the post
if ! npx newmd blog --slug "${TEMP_NAME}" "$TITLE" 2>/dev/null; then
    echo "Error: Failed to create blog post with newmd"
    rm -rf "$FOLDER_PATH"
    exit 1
fi

# Move the created file to index.md in the new folder
if [ -f "$TEMP_PATH" ]; then
    mv "$TEMP_PATH" "${FOLDER_PATH}/index.md"
    echo "✓ Created new blog post: ${FOLDER_PATH}/index.md"
    echo "  You can now add images directly to: ${FOLDER_PATH}/"
else
    echo "Error: Expected file not created: ${TEMP_PATH}"
    # Clean up - use rm -rf for robust cleanup
    rm -rf "$FOLDER_PATH"
    exit 1
fi