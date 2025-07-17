# Suggested Commands

## Development Commands

- `pnpm install` - Install all dependencies
- `pnpm run dev` - Start development server at localhost:3000
- `pnpm run build` - Build production site to ./dist/
- `pnpm run preview` - Preview built site locally

## Quality & Formatting

- `pnpm run format` - Format code using Prettier (Astro + Tailwind plugins)
- `pnpm run lint` - Run ESLint on .js, .ts, .astro files

## Content Management

- `pnpm run post "Your post title"` - Create new blog post with date prefix
- `./post.sh "Title"` - Direct script execution for blog post creation

## Build & Deploy

- `pnpm run build` - Production build (used by Netlify)
- Deploy happens automatically via Netlify on git push to main

## System Utilities (macOS/Darwin)

- `ls` - List directory contents
- `find` - Search for files
- `grep` - Search file contents
- `git` - Version control

## Type Checking

Note: No explicit typecheck script defined. Consider adding `@astrojs/check` for TypeScript validation.
