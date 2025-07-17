# Code Style & Conventions

## Language & Formatting

- **Language**: TypeScript exclusively (no plain JavaScript)
- **Formatting**: Prettier with Astro and Tailwind CSS plugins
- **Linting**: ESLint with TypeScript, Astro, and jsx-a11y plugins

## Code Structure

- **Imports**: ES modules (import/export) preferred
- **TypeScript**: Strict mode, unused vars allowed with `_` prefix
- **Accessibility**: jsx-a11y rules enforced throughout

## File Organisation

- **Components**: `.astro` files in `src/components/`
- **Layouts**: Base layouts in `src/layouts/`
- **Pages**: File-based routing in `src/pages/`
- **Content**: Markdown files in `src/content/` with collections
- **Utilities**: Helper functions in `src/utils/`
- **Schemas**: Zod validation schemas in `src/schemas/`
- **Styles**: Global CSS in `src/styles/`

## Naming Conventions

- **Files**: kebab-case for all files and directories
- **Content**: Blog post files use YYYY-MM-DD-slug format
- **Tags**: Must be kebab-case (regex validated)
- **Components**: PascalCase for Astro components

## Content Standards

- **Blog Schema**: Validated with Zod, separate schemas for Astro vs newmd
- **Social descriptions**: Limited to 155 characters
- **Images**: Stored in `src/images/` with Sharp optimisation
