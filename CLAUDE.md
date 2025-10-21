# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal blog site for Ed Johnson-Williams (edjohnsonwilliams.co.uk) that uses TypeScript, Tailwind CSS v4, and pnpm for package management. The site is deployed on Netlify.

## Essential Commands

- `pnpm install` - Install dependencies
- `pnpm run dev` - Start local development server at localhost:4321 (or next available port)
- `pnpm run build` - Build production site to ./dist/
- `pnpm run format` - Format files using Prettier with Astro and Tailwind plugins
- `pnpm run post "Your post title"` - Create new blog post with folder structure (uses ./post.sh script)

## Content Management Architecture

### Blog Post Creation System

- Uses `newmd` library for blog post scaffolding
- Blog posts created via `pnpm run post "title"` which calls `./post.sh`
- Posts automatically get date prefix (YYYY-MM-DD-slug format)
- All posts use folder structure with `index.md` to support co-located images

### Content Schema & Validation

- Content collections defined in `src/content.config.ts`
- Blog schema split into separate module at `src/schemas/blog.ts`
- Two schemas: `blogSchema` (for Astro) and `newmdBlogSchema` (with date coercion for newmd)
- Tags must be kebab-case (enforced by regex validation)
- Social descriptions limited to 155 characters

### Content Structure

- **Blog collection**: Markdown files with frontmatter validation
  - All posts use folder structure: `YYYY-MM-DD-title/index.md`
  - Images are co-located in the same folder as the post
- **Stuff collection**: JSON data files for coding projects and hobbies
- Uses Astro's glob loader pattern for content discovery

## Architecture Notes

### Routing & Pages

- File-based routing with dynamic `[slug].astro` for blog posts
- Tag-based filtering at `/tags/[tag]` with index page
- Reading list pages pull from external APIs (feedbin, pocket, raindrop) but this is disabled now
- RSS feed generated at `/rss.xml` with redirect from legacy `/feed.xml`

### Styling & UI

- Tailwind CSS v4 via Vite plugin
- Global styles in `src/styles/global.css`
- Theme switcher component for dark/light mode
- Typography plugin for blog post styling

### Asset Management

- Blog images co-located with posts in their folders (e.g., `src/content/blog/post-name/image.png`)
- Shared images (like headshots) remain in `src/images/`
- Images in blog posts referenced with relative paths: `![Alt](./image.png)`
- Public files include admin interface for Netlify CMS and downloadable datasets
- Sharp for image optimisation

### Deployment

- Netlify deployment with extensive redirect rules for URL migration
- Security headers configured in netlify.toml

## Claude Code Integration

### Development Server Management

This project works with the global dev server management commands:

- **Start**: `/dev-start` - Automatically detects Astro and starts on port 4321 (or next available)
- **Status**: `/dev-status` - Shows server status and port usage
- **Logs**: `/dev-logs` - Access server logs
- **Stop**: `/dev-stop` - Clean shutdown with process cleanup
