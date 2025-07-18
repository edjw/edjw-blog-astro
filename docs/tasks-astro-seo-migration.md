# Tasks: Astro SEO Migration Implementation

## Relevant Files

### Astro Components & Layouts
- `src/components/SEO.astro` - New SEO component wrapping astro-seo
- `src/layouts/BaseLayout.astro` - Updated to use SEO component
- `src/layouts/BlogpostLayout.astro` - Enhanced with article metadata
- `src/components/BaseHead.astro` - Will be removed after migration

### Configuration & Types
- `src/data/siteconfig.ts` - Enhanced with SEO configuration
- `src/types/seo.ts` - TypeScript interfaces for SEO props
- `public/robots.txt` - New robots.txt file

### Testing & Validation
- `src/utils/seo-validator.ts` - SEO validation utilities
- `docs/seo-validation.md` - Validation checklist and tools

### Development & Tooling
- `package.json` - Add astro-seo dependency
- `docs/seo-implementation.md` - Implementation documentation

## Tasks

- [ ] 1.0 Setup and Dependencies [Confidence: 9/10]
  - [ ] 1.1 Install astro-seo package using pnpm
  - [ ] 1.2 Verify astro-seo TypeScript definitions work correctly
  - [ ] 1.3 Update package.json with correct version constraint
  - [ ] 1.4 Test basic astro-seo import and component rendering

- [ ] 2.0 Configuration Enhancement [Confidence: 8/10]
  - [ ] 2.1 Add SEO configuration section to siteconfig.ts with defaultDescription, locale, themeColor
  - [ ] 2.2 Add Twitter configuration with site and creator handles
  - [ ] 2.3 Add defaultImage placeholder path for future OG image support
  - [ ] 2.4 Verify siteconfig.ts imports work with @/ alias
  - [ ] 2.5 Create TypeScript interfaces for SEO configuration

- [ ] 3.0 SEO Component Development [Confidence: 7/10]
  - [ ] 3.1 Create SEO.astro component with astro-seo integration
  - [ ] 3.2 Implement structured data (JSON-LD) with WebSite and Article schemas
  - [ ] 3.3 Add comprehensive Open Graph support with image dimensions
  - [ ] 3.4 Configure Twitter cards with summary_large_image type
  - [ ] 3.5 Add canonical URL generation using Astro.url.href
  - [ ] 3.6 Implement fallback logic for missing props using siteconfig defaults
  - [ ] 3.7 Add extend prop for custom meta tags (viewport, theme-color, favicon)
  - [ ] 3.8 Handle article-specific metadata for blog posts

- [ ] 4.0 Layout Migration [Confidence: 8/10]
  - [ ] 4.1 Update BaseLayout.astro to import and use SEO component
  - [ ] 4.2 Maintain existing prop structure (pageTitle, description) for compatibility
  - [ ] 4.3 Add new optional props (articleData, pageType, image)
  - [ ] 4.4 Update BlogpostLayout.astro to extract and pass article metadata
  - [ ] 4.5 Ensure proper data flow from blog entry to SEO component
  - [ ] 4.6 Test that existing pages continue to work without changes

- [ ] 5.0 Content and Cleanup [Confidence: 9/10]
  - [ ] 5.1 Create robots.txt in public/ directory with proper sitemap reference
  - [ ] 5.2 Remove BaseHead.astro component after confirming migration success
  - [ ] 5.3 Clean up any unused imports or references to BaseHead
  - [ ] 5.4 Update any remaining layout components that might reference BaseHead

- [ ] 6.0 Testing and Validation [Confidence: 8/10]
  - [ ] 6.1 Test build process completes successfully with new SEO component
  - [ ] 6.2 Validate Twitter cards with Twitter Card Validator
  - [ ] 6.3 Test Open Graph previews with Facebook Debugger
  - [ ] 6.4 Validate structured data with Google Rich Results Test
  - [ ] 6.5 Test canonical URLs are generated correctly for all page types
  - [ ] 6.6 Verify no TypeScript compilation errors
  - [ ] 6.7 Test social media image dimensions and alt text
  - [ ] 6.8 Validate theme-color and viewport meta tags

- [ ] 7.0 Developer Experience & Tooling [Confidence: 9/10]
  - [ ] 7.1 Add comprehensive error handling for missing configuration
  - [ ] 7.2 Create SEO validation utilities for development
  - [ ] 7.3 Document SEO component props and usage patterns
  - [ ] 7.4 Add console warnings for missing recommended SEO fields

- [ ] 8.0 Error Handling & Observability [Confidence: 8/10]
  - [ ] 8.1 Implement graceful fallbacks for missing siteconfig SEO fields
  - [ ] 8.2 Add build-time validation for required SEO properties
  - [ ] 8.3 Create user-friendly error messages for SEO configuration issues
  - [ ] 8.4 Add logging for SEO tag generation during build process

## Standards to Follow

- Follow astro-seo documentation closely: https://github.com/jonasmerlin/astro-seo
- Maintain backward compatibility with existing pageTitle/description props
- Use British English throughout (colour, centre, realise)
- Implement comprehensive fallback strategy using siteconfig.ts
- Generate all SEO tags at build time (static site generation)
- Follow schema.org standards for structured data
- Use 1200x630 pixel dimensions for social media images
- Validate with external tools: Twitter Card Validator, Facebook Debugger, Google Rich Results Test
- Include proper error handling and TypeScript type safety
- Anti-pattern avoidance: Don't generate SEO tags at runtime, avoid duplicate meta tags, ensure proper image dimensions

## Implementation Notes

### Key References
- astro-seo documentation: https://github.com/jonasmerlin/astro-seo
- Research file: `/docs/research-astro-seo-migration.md`
- Requirements file: `/docs/requirements-astro-seo-migration.md`

### Migration Strategy
1. **Backwards Compatibility**: Maintain existing prop structure (pageTitle, description)
2. **Single Source of Truth**: Use siteconfig.ts for all SEO defaults
3. **Build-time Generation**: All SEO tags generated at build time for static site
4. **Comprehensive Testing**: Use external validators to verify implementation
5. **Clean Migration**: Remove BaseHead.astro only after successful migration

### Success Criteria
- All pages build successfully with new SEO component
- Twitter Card Validator and Facebook Debugger pass
- Google Rich Results Test validates structured data
- No TypeScript compilation errors
- No functionality regression
- Improved social media preview cards