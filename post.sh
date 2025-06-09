#!/bin/bash
cd src
DATE=$(date +%Y-%m-%d)
TITLE="$1"
SLUG=$(echo "$TITLE" | sed 's/[^a-zA-Z0-9 ]//g' | tr '[:upper:]' '[:lower:]' | sed 's/ /-/g')
newmd blog --slug "${DATE}-${SLUG}" "$TITLE"