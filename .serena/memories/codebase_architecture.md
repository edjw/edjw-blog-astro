# Codebase Architecture

## Directory Structure

```
src/
├── components/          # Reusable Astro components
├── content/            # Content collections
│   ├── blog/          # Markdown blog posts
│   └── stuff/         # JSON portfolio data
├── data/              # Site configuration and navigation
├── images/            # Static images with optimisation
├── layouts/           # Page layout templates
├── pages/             # File-based routing
│   ├── blog/         # Blog-related pages
│   ├── tags/         # Tag filtering pages
│   └── reading-list/ # External content (disabled)
├── schemas/           # Zod validation schemas
├── styles/           # Global CSS
└── utils/            # Utility functions
```

## Key Files

- `src/content.config.ts` - Content collections configuration
- `src/schemas/blog.ts` - Blog post validation schemas
- `src/data/siteconfig.ts` - Site metadata and configuration
- `src/newmd.config.ts` - Blog post scaffolding configuration
- `astro.config.mjs` - Astro framework configuration

## Content Collections

- **Blog**: Markdown files with frontmatter validation
- **Stuff**: JSON data for coding projects and hobbies

## Routing Strategy

- File-based routing with dynamic `[slug].astro` for blog posts
- Tag filtering at `/tags/[tag]` with comprehensive index
- RSS feed at `/rss.xml` with legacy redirect support

## Styling Architecture

- Tailwind CSS v4 integrated via Vite plugin
- Global styles in `src/styles/global.css`
- Typography plugin for blog post content formatting
- Theme switching capabilities built-in
