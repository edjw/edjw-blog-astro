# PRD: Astro SEO Migration

## 1. Introduction/Overview

This feature replaces the manual meta tag implementation in BaseHead.astro with the astro-seo package to provide comprehensive, modern SEO capabilities for the Ed Johnson-Williams blog site.

**Problem Statement**: The current implementation has basic meta tags but lacks crucial SEO features including Open Graph images, structured data, canonical URLs, and comprehensive social media optimisation. Social media preview issues are impacting content sharing effectiveness.

**Goal Statement**: Implement a complete SEO solution using astro-seo that automatically handles all meta tags, social media cards, and structured data, making the site fully optimised for search engines and social media platforms while maintaining the existing component architecture.

## 2. Goals & Success Metrics

### Primary Goals
- Fix social media preview issues by implementing proper Open Graph and Twitter cards
- Provide comprehensive meta tags for all pages automatically
- Add structured data for better search engine understanding
- Maintain backwards compatibility with existing component props
- Centralise all SEO configuration in siteconfig.ts

### Success Metrics
- All pages pass social media preview validators (Twitter Card Validator, Facebook Debugger)
- Structured data validates successfully in Google's Rich Results Test
- Zero regression in existing functionality
- All pages have proper canonical URLs and meta descriptions

### Timeline
- Implementation can be completed in a single development session
- No phased rollout required - all pages migrated simultaneously

## 3. User Stories

### Primary User Stories
1. **As a blog reader**, I want to share articles on social media so that the preview shows an attractive card with title, description, and image (when available)
2. **As a search engine**, I need structured data to understand the content type, author, and publication dates so that I can properly index and display the content
3. **As the blog author**, I want SEO to be handled automatically so that I can focus on writing content without worrying about meta tags

### Secondary User Stories
1. **As a developer**, I want a single component to manage all SEO concerns so that maintenance is centralised
2. **As a developer**, I want all SEO defaults configured in siteconfig.ts so that there's one source of truth

## 4. Functional Requirements

### Core Requirements
1. **Must** install astro-seo package using pnpm
2. **Must** create new SEO.astro component that wraps astro-seo
3. **Must** maintain compatibility with existing props (pageTitle, pageDescription)
4. **Must** generate canonical URLs using Astro.url.href
5. **Must** implement Twitter cards with summary_large_image type
6. **Must** add Open Graph tags for all pages with proper fallbacks
7. **Must** include structured data (JSON-LD) for blog posts and website

### Configuration Requirements
8. **Must** add SEO-specific fields to siteconfig.ts:
   - `seo.defaultDescription` - Fallback description for pages
   - `seo.locale` - Set to "en_GB"
   - `seo.twitter.site` - Site Twitter handle
   - `seo.defaultImage` - Placeholder for future OG image
   - `seo.themeColor` - Mobile browser theme colour
9. **Must** use siteconfig.ts as single source of truth for all SEO defaults
10. **Must** import from "@/data/siteconfig.ts" using alias

### Meta Tag Requirements
11. **Must** set proper og:type (website for pages, article for blog posts)
12. **Must** set og:locale from siteconfig.ts
13. **Must** include twitter:creator from siteconfig author.twitterUsername
14. **Must** use site title from siteconfig.ts for og:site_name
15. **Must** generate dynamic meta descriptions with fallback to siteconfig

### Blog Post Specific Requirements
16. **Must** add article:published_time from pubDate
17. **Must** add article:author from siteconfig author.name
18. **Must** add article:tag for each blog post tag
19. **Must** use blog post socialDescription for descriptions
20. **Should** prepare for future image support from siteconfig defaultImage

### Technical Requirements
21. **Must** remove BaseHead.astro after migration
22. **Must** update BaseLayout.astro to use SEO component
23. **Must** update BlogpostLayout.astro to pass article-specific data
24. **Must** handle all SEO at build time (static site generation)

## 5. Non-Goals (Out of Scope)

### Current Iteration Exclusions
- Automatic OG image generation (noted as coming soon)
- Multi-language support beyond en_GB
- AMP pages or instant articles
- Video or audio meta tags
- Dynamic meta tag generation at runtime
- Social media posting automation
- Modifying the blog schema image field validation
- Adding e-commerce or product structured data
- Implementing FAQ or HowTo schemas

### Future Considerations
- OG image generation will be added separately later
- Additional structured data types can be added as needed

## 6. Technical Considerations

### Astro Integration
- Use astro-seo as a build-time component
- Props passed from layouts must map to astro-seo format
- Leverage Astro.url.href for canonical URL generation
- Ensure component works with Astro's static site generation

### siteconfig.ts Structure
```typescript
const siteData = {
  // ... existing fields ...
  seo: {
    defaultDescription: "Ed Johnson-Williams' blog about web development and technology",
    locale: "en_GB",
    themeColor: "#1a1a1a", // Or appropriate colour
    defaultImage: "/og-image.jpg", // Placeholder for future
    twitter: {
      site: "@_edjw", // Site's Twitter account
    }
  }
};
```

### Data Flow
- SEO.astro imports all defaults from siteconfig.ts
- BaseLayout receives pageTitle and description props
- SEO component merges props with siteconfig defaults
- BlogpostLayout passes additional article metadata
- All data resolves at build time

### Component Architecture
```
BaseLayout.astro
  └── SEO.astro (new)
        └── SEO from astro-seo

BlogpostLayout.astro
  └── BaseLayout.astro
        └── SEO.astro (new)
              └── SEO from astro-seo
```

## 7. Design Considerations

### Meta Tag Organisation
- All SEO concerns centralised in SEO component
- All SEO defaults centralised in siteconfig.ts
- No scattered meta tags across multiple files
- Clean separation between layout and SEO logic

### Fallback Strategy (using siteconfig.ts)
- Pages without descriptions use seo.defaultDescription
- Missing titles fall back to site title
- Locale always from seo.locale
- Twitter site handle from seo.twitter.site
- Theme colour from seo.themeColor

### Developer Experience
- Props remain familiar (pageTitle, pageDescription)
- No changes required to existing page components
- All defaults clearly defined in siteconfig.ts
- Single import for all SEO configuration

## 8. Developer Experience Requirements

### Error Handling
- Component must not break build if optional props missing
- Clear console warnings for missing recommended fields
- Graceful fallbacks to siteconfig.ts values

### Debugging Support
- SEO tags visible in build output HTML
- Comments in generated HTML indicating source component
- Clear prop validation messages

### Code Organisation
- siteconfig.ts as single source of truth
- Documented prop mappings in SEO component
- TypeScript interfaces for all prop types
- Use @/data/siteconfig.ts import alias

## 9. Dependency Strategy

### Required Dependencies
- astro-seo (latest version)
- No additional dependencies needed

### Integration Points
- Uses existing Zod schemas for data validation
- Integrates with enhanced siteconfig.ts
- Works with current Astro static build process
- Uses @ import alias consistently

### Performance Impact
- Minimal bundle size increase (astro-seo is lightweight)
- No runtime performance impact (build-time only)
- No additional network requests

## 10. Observability Requirements

### Build-Time Validation
- Log successful SEO tag generation during build
- Warn about missing recommended fields
- Error on critical field validation failures

### Monitoring Considerations
- No runtime monitoring needed (static generation)
- Post-deployment validation via external tools
- Social media preview testing after deployment

## 11. Edge Cases & Error Handling

### Missing Data Scenarios (all fallback to siteconfig.ts)
1. **Page without title**: Use siteData.title
2. **Page without description**: Use siteData.seo.defaultDescription
3. **Blog post without socialDescription**: Use siteData.seo.defaultDescription
4. **Blog post without tags**: Omit article:tag fields
5. **Missing configuration**: Component provides helpful error messages

### Data Validation
1. **Empty title**: Already prevented by Zod schema
2. **Description over 155 chars**: Already limited by schema
3. **Invalid date format**: Converted to ISO 8601 for article:published_time
4. **Special characters**: Properly escaped in meta content

### Build Failures
1. **astro-seo not installed**: Clear error message with install command
2. **Invalid prop types**: TypeScript compilation errors
3. **Missing siteconfig fields**: Default to sensible values with warnings

## 12. Acceptance Criteria

### Functional Acceptance
1. ✓ All pages have proper meta tags when built
2. ✓ Twitter card previews show correctly with summary_large_image
3. ✓ Open Graph previews work on Facebook/LinkedIn
4. ✓ Canonical URLs correctly set for all pages
5. ✓ Structured data validates in Google Rich Results Test
6. ✓ Blog posts have article-specific metadata
7. ✓ All SEO defaults pulled from siteconfig.ts

### Technical Acceptance
1. ✓ BaseHead.astro successfully replaced with SEO.astro
2. ✓ siteconfig.ts enhanced with SEO configuration
3. ✓ No TypeScript errors in build
4. ✓ All existing pages continue to work
5. ✓ Props properly mapped from old to new format
6. ✓ Build time remains reasonable

### Quality Gates
1. ✓ No console errors in development or production
2. ✓ HTML validates with proper meta tags
3. ✓ Social media validators pass for all page types
4. ✓ No accessibility regressions
5. ✓ siteconfig.ts remains the single source of truth

## 13. Implementation Notes

### siteconfig.ts Enhancement
Add the following structure to siteconfig.ts:
```typescript
seo: {
  defaultDescription: "Ed Johnson-Williams' blog about web development and technology",
  locale: "en_GB",
  themeColor: "#1a1a1a",
  defaultImage: "/og-image.jpg", // Placeholder
  twitter: {
    site: "@_edjw"
  }
}
```

### robots.txt Creation
Create `/public/robots.txt` with:
```
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api

Sitemap: https://edjohnsonwilliams.co.uk/sitemap-index.xml
```

### SEO Component Structure
The component should:
1. Import all configuration from @/data/siteconfig.ts
2. Accept existing props (pageTitle, description, and article data)
3. Map to astro-seo format with siteconfig defaults
4. Add extend prop for structured data
5. Handle all fallback logic internally using siteconfig

### Migration Sequence
1. Enhance siteconfig.ts with SEO fields
2. Install astro-seo
3. Create SEO.astro
4. Update BaseLayout.astro
5. Update BlogpostLayout.astro
6. Test all pages
7. Remove BaseHead.astro
8. Create robots.txt

### Future Image Support
When OG image generation is added:
1. Update siteconfig.ts defaultImage path
2. SEO component already prepared to use it
3. Add image URL to Open Graph and Twitter tags
4. Include image dimensions if available