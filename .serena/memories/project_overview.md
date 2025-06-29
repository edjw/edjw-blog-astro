# Project Overview

## Purpose

Personal blog website for Ed Johnson-Williams (edjohnsonwilliams.co.uk). This is a static blog site with content management capabilities, featuring blog posts, reading lists, and project portfolios.

## Tech Stack

- **Framework**: Astro 5+ (static site generator)
- **Language**: TypeScript throughout
- **Styling**: Tailwind CSS v4 (via Vite plugin)
- **Package Manager**: pnpm 10+
- **Deployment**: Netlify
- **Content**: Markdown with frontmatter validation using Zod schemas

## Key Features

- Blog posts with date-prefixed URLs and tag filtering
- Content collections for blog posts and portfolio items ("stuff")
- Reading list integration (currently disabled)
- RSS feed generation
- Theme switcher (dark/light mode)
- Responsive design with accessibility considerations

## Content Management

- Blog posts created via `newmd` library through custom script
- All content validated with Zod schemas
- Uses Astro's content collections API
- Images stored in `src/images/` with Sharp optimisation
