# Research: Astro SEO Migration

## 1. Requirements Summary

**Core Functionality**: Replace manual meta tag implementation in BaseHead.astro with astro-seo package to provide comprehensive SEO capabilities including Open Graph, Twitter cards, and structured data.

**Key User Interactions**:

- Social media sharing with proper preview cards
- Search engine crawling with structured data
- Automatic SEO tag generation without manual intervention

**Integration Requirements**:

- Maintain compatibility with existing BaseLayout/BlogpostLayout props
- Use siteconfig.ts as single source of truth for SEO defaults
- Support both static pages and dynamic blog posts
- Build-time SEO generation for static site

**Success Criteria**:

- All pages pass social media validators
- Structured data validates in Google Rich Results Test
- Zero functionality regression
- Centralised SEO configuration

## 2. Codebase Analysis

### Current Component Structure

```
src/
├── components/
│   └── BaseHead.astro (current SEO component)
├── layouts/
│   ├── BaseLayout.astro (uses BaseHead, expects pageTitle/description)
│   ├── BlogpostLayout.astro (passes title/socialDescription to BaseLayout)
│   └── PageLayout.astro (passes title/socialDescription to BaseLayout)
├── data/
│   └── siteconfig.ts (site configuration)
└── schemas/
    └── blog.ts (Zod validation schemas)
```

### Props Flow Pattern

```
BlogpostLayout.astro
├── entry: CollectionEntry<"blog"> (receives)
├── title, socialDescription, tags (extracts)
└── pageTitle, description (passes to BaseLayout)

BaseLayout.astro
├── pageTitle, description (receives)
└── title, description (passes to BaseHead)
```

### Current SEO Implementation Gaps

- Basic meta tags only (title, description, viewport)
- Limited Twitter cards (summary only)
- Basic Open Graph (missing images, article metadata)
- No structured data (JSON-LD)
- No canonical URLs
- No theme color or mobile optimisations

### Established Patterns

- Uses TypeScript path aliases (@/components, @/data, @/layouts)
- Zod schemas for validation (blog.ts)
- Props passed through layout hierarchy
- siteconfig.ts as configuration source
- Astro component patterns throughout

## 3. External Research

### astro-seo Package Analysis

- **Version**: 0.8.4 (last updated ~1 year ago)
- **Bundle Size**: Lightweight, no runtime dependencies
- **TypeScript Support**: Full TypeScript definitions
- **Maintenance**: 22 projects using it, community maintained

### Key astro-seo Features

- Comprehensive meta tag generation
- Open Graph support (basic + optional + image + article)
- Twitter cards with all types
- Canonical URL handling
- Custom meta/link tags via extend prop
- Title templates and fallbacks
- Indexing control (noindex/nofollow)

### Structured Data Approach

Based on research, astro-seo doesn't include built-in structured data support. Two approaches identified:

1. **Extend Prop Method** (Recommended): Use astro-seo's extend prop to add JSON-LD script tags
2. **Separate Package**: Use astro-seo-schema (adds complexity)

### Best Practices Discovered

- Use `@graph` array for multiple schemas per page
- Include both WebSite and Article schemas for blog posts
- Generate structured data at build time
- Validate with Google Rich Results Test
- Use schema.org types: WebSite, Article, Person, Organization

### Social Media Image Standards (2025)

- **Recommended Size**: 1200x630 pixels (1.91:1 ratio)
- **Format**: JPG or PNG
- **File Size**: Under 5MB
- **Compatibility**: Works for Facebook, Twitter, LinkedIn

## 4. Implementation Blueprint

### Enhanced siteconfig.ts Structure

General idea here but refer closely to <https://github.com/jonasmerlin/astro-seo>

```typescript
const siteData = {
  // ... existing fields ...
  seo: {
    defaultDescription: "Ed Johnson-Williams' blog about web development and technology",
    locale: "en_GB",
    themeColor: "#ffffff",
    defaultImage: "/og-image.jpg", // 1200x630 pixels
    twitter: {
      site: "@_edjw",
      creator: "@_edjw",
    }
  }
};
```

### SEO Component Interface

```typescript
interface SEOProps {
  // Core props (maintain compatibility)
  pageTitle?: string;
  description?: string;

  // Article-specific props
  articleData?: {
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
  };

  // Page type
  pageType?: "website" | "article";

  // Image override
  image?: string;
}
```

### SEO.astro Component Architecture

```astro
---
import { SEO } from "astro-seo";
import siteData from "@/data/siteconfig";

interface Props {
  pageTitle?: string;
  description?: string;
  articleData?: {
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  pageType?: "website" | "article";
  image?: string;
}

const { pageTitle, description, articleData, pageType = "website", image } = Astro.props;

// Convert tags to lowercase for structured data
const processedTags = articleData?.tags?.map(tag => tag.toLowerCase()) || [];

// Generate structured data
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "name": siteData.title,
      "url": siteData.url,
      "description": siteData.description,
      "publisher": {
        "@type": "Person",
        "name": siteData.author.name
      }
    },
    // Conditional Article schema for blog posts
    ...(pageType === "article" && articleData ? [{
      "@type": "Article",
      "headline": pageTitle,
      "description": description,
      "author": {
        "@type": "Person",
        "name": siteData.author.name
      },
      "datePublished": articleData.publishedTime,
      "publisher": {
        "@type": "Person",
        "name": siteData.author.name
      },
      "keywords": processedTags.join(", ")
    }] : [])
  ]
};
---

<SEO
  title={pageTitle || siteData.title}
  description={description || siteData.seo.defaultDescription}
  canonical={Astro.url.href}
  openGraph={{
    basic: {
      title: pageTitle || siteData.title,
      type: pageType,
      image: image || siteData.seo.defaultImage,
      url: Astro.url.href
    },
    optional: {
      description: description || siteData.seo.defaultDescription,
      locale: siteData.seo.locale,
      siteName: siteData.title
    },
    image: {
      url: image || siteData.seo.defaultImage,
      width: 1200,
      height: 630,
      alt: `${pageTitle || siteData.title} preview`
    },
    ...(pageType === "article" && articleData ? {
      article: {
        publishedTime: articleData.publishedTime,
        authors: articleData.authors || [siteData.author.name],
        tags: processedTags
      }
    } : {})
  }}
  twitter={{
    card: "summary_large_image",
    site: siteData.seo.twitter.site,
    creator: siteData.author.twitterUsername,
    title: pageTitle || siteData.title,
    description: description || siteData.seo.defaultDescription,
    image: image || siteData.seo.defaultImage,
    imageAlt: `${pageTitle || siteData.title} preview`
  }}
  extend={{
    meta: [
      { name: "theme-color", content: siteData.seo.themeColor },
      { name: "viewport", content: "width=device-width, initial-scale=1" }
    ],
    link: [
      { rel: "shortcut icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "me", href: "https://mastodon.social/@_edjw" },
      { rel: "alternate", type: "application/rss+xml", title: "RSS feed", href: "/rss.xml" }
    ]
  }}
/>

<script type="application/ld+json" set:html={JSON.stringify(structuredData)} />
```

### Updated BaseLayout.astro

```astro
---
import SEO from "@/components/SEO.astro";
import Header from "@/components/Header.astro";
import Footer from "@/components/Footer.astro";

interface Props {
  pageTitle?: string;
  description?: string;
  articleData?: {
    publishedTime?: string;
    authors?: string[];
    tags?: string[];
  };
  pageType?: "website" | "article";
  image?: string;
}

const { pageTitle, description, articleData, pageType, image } = Astro.props;
---

<html lang="en">
  <head>
    <SEO
      pageTitle={pageTitle}
      description={description}
      articleData={articleData}
      pageType={pageType}
      image={image}
    />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>
```

### Updated BlogpostLayout.astro

```astro
---
import BaseLayout from "@/layouts/BaseLayout.astro";
import type { CollectionEntry } from "astro:content";

interface Props {
  entry: CollectionEntry<"blog">;
}

const { entry } = Astro.props;
const { title, pubDate, socialDescription, tags } = entry.data;

const articleData = {
  publishedTime: pubDate.toISOString(),
  authors: ["Ed Johnson-Williams"],
  tags: tags || []
};
---

<BaseLayout
  pageTitle={title}
  description={socialDescription}
  articleData={articleData}
  pageType="article"
>
  <article>
    <!-- Article content -->
    <slot />
  </article>
</BaseLayout>
```

## 5. Technology Stack Considerations

### Astro Integration

- **Build-time Generation**: All SEO tags generated at build time (perfect for static sites)
- **Component Composability**: SEO component integrates seamlessly with existing layouts
- **TypeScript Support**: Full type safety throughout the component chain
- **Performance**: Zero runtime JavaScript, pure HTML meta tags

### astro-seo Package

- **Pros**: Comprehensive, well-documented, TypeScript support
- **Cons**: Last updated ~1 year ago, but stable and functional
- **Bundle Impact**: Minimal, build-time only dependency
- **Maintenance**: Community maintained, active GitHub repository

### Structured Data Implementation

- **JSON-LD Format**: Industry standard, Google recommended
- **Schema.org Types**: WebSite, Article, Person schemas
- **Validation**: Google Rich Results Test, Schema.org validator
- **Performance**: Inline JSON-LD in head, no external requests

## 6. Validation Strategy

### Unit Testing Approach

- **Component Props**: Test SEO component accepts correct props
- **Data Mapping**: Verify siteconfig values map correctly to meta tags
- **Fallback Logic**: Test default values when props missing
- **Structured Data**: Validate JSON-LD structure and content

### Integration Testing Plan

- **Layout Integration**: Test BaseLayout → SEO component data flow
- **Blog Post Integration**: Test BlogpostLayout article data passing
- **Build Process**: Verify SEO tags appear in built HTML

### E2E Testing Scenarios

- **Social Media Previews**: Test Twitter/Facebook preview cards
- **Search Engine Crawling**: Verify meta tags and structured data
- **Canonical URLs**: Test canonical tag generation
- **Mobile Optimisation**: Test viewport and theme-color tags

### External Validation

- **Twitter Card Validator**: Test summary_large_image cards
- **Facebook Debugger**: Test Open Graph preview
- **Google Rich Results Test**: Validate structured data
- **Schema.org Validator**: Verify JSON-LD structure

## 7. Known Gotchas & Anti-Patterns

### astro-seo Specific Gotchas

- **Open Graph Required Fields**: Must provide title, type, image, url for basic Open Graph
- **Twitter Card Types**: summary_large_image requires proper image dimensions
- **Extend Prop Structure**: Custom meta tags must follow specific format
- **Build-time Only**: All data must be available at build time

### Common Implementation Mistakes

- **Missing Fallbacks**: Not providing default values for optional props
- **Incorrect Schema Types**: Using wrong schema.org types for content
- **Image Dimensions**: Not specifying image dimensions for social cards
- **Canonical URLs**: Incorrect canonical URL generation

### Performance Anti-Patterns

- **Runtime Generation**: Generating SEO tags at runtime (not applicable to Astro)
- **Large Images**: Using oversized images for social cards
- **Excessive Structured Data**: Adding too much JSON-LD data
- **Duplicate Meta Tags**: Conflicting meta tags from multiple sources

### Accessibility Pitfalls

- **Missing Alt Text**: Not providing image alt text for social cards
- **Language Tags**: Incorrect or missing language attributes
- **Viewport Issues**: Incorrect viewport meta tag configuration

## 8. Dependencies & Libraries

### Required Packages

```json
{
  "dependencies": {
    "astro-seo": "^0.8.4"
  }
}
```

### Integration Approach

- **Installation**: `pnpm add astro-seo`
- **Import Pattern**: `import { SEO } from "astro-seo"`
- **Usage**: Insert into replacement for BaseHead.astro
- **Configuration**: Centralised in siteconfig.ts

### Alternative Options Evaluated

- **astro-seo-schema**: Separate package, adds complexity
- **Manual Implementation**: Too much maintenance overhead
- **astro-seo-meta**: Less comprehensive than astro-seo

## 9. Risk Assessment

### Technical Complexity: 6/10

- **Moderate**: Requires understanding of SEO best practices
- **Component Integration**: Straightforward Astro component replacement
- **Structured Data**: Requires JSON-LD knowledge
- **Testing**: Multiple validation tools needed

### Integration Risk: Low

- **Backwards Compatible**: Maintains existing prop structure
- **Drop-in Replacement**: Minimal changes to existing layouts
- **Build Process**: No changes to Astro build pipeline
- **Type Safety**: Full TypeScript support

### Performance Risk: Low

- **Bundle Size**: Minimal impact, build-time only
- **Runtime Performance**: No runtime JavaScript
- **Image Loading**: No change to existing image handling
- **Build Time**: Negligible increase

### Timeline Confidence: 8/10

- **Well-Researched**: Comprehensive documentation available
- **Clear Implementation**: Straightforward component replacement
- **Established Patterns**: Following existing codebase conventions
- **Testing Strategy**: Clear validation approach

### Overall Confidence: 8/10

- **Proven Solution**: astro-seo is established and stable
- **Clear Requirements**: Well-defined acceptance criteria
- **Minimal Risk**: Low risk of breaking existing functionality
- **Good Documentation**: Comprehensive research completed

## 10. Implementation Phases

### Phase 1: Core Setup (1-2 hours)

- Install astro-seo package
- Enhance siteconfig.ts with SEO configuration
- Create basic SEO.astro component
- Update BaseLayout.astro to use SEO component

**Quality Gates**:

- ✓ SEO component renders basic meta tags
- ✓ No TypeScript errors
- ✓ Build process completes successfully

### Phase 2: Feature Implementation (2-3 hours)

- Add Open Graph and Twitter card support
- Implement structured data (JSON-LD)
- Update BlogpostLayout.astro for article metadata
- Add all required meta tags per requirements

**Quality Gates**:

- ✓ Open Graph tags render correctly
- ✓ Twitter cards validate
- ✓ Structured data validates in Google Rich Results Test
- ✓ Blog posts have article-specific metadata

### Phase 3: Testing & Refinement (1-2 hours)

- Create robots.txt
- Test social media previews
- Validate structured data
- Remove BaseHead.astro
- Final testing and validation

**Quality Gates**:

- ✓ All social media validators pass
- ✓ No accessibility regressions
- ✓ All pages have proper SEO tags
- ✓ No console errors or warnings

## 11. Development Environment

### Required Tools

- **Astro Development Server**: For testing meta tag generation
- **Browser DevTools**: For inspecting generated HTML
- **Social Media Validators**: Twitter Card Validator, Facebook Debugger
- **Schema Validators**: Google Rich Results Test, Schema.org validator

### Local Development Considerations

- **Build Output**: Check dist/ folder for generated HTML
- **Meta Tag Inspection**: Use browser DevTools to verify tags
- **Structured Data**: View JSON-LD in page source
- **Hot Reload**: Astro dev server for rapid iteration

### Debugging Approaches

- **Console Logging**: Add console.log in component for debugging
- **HTML Inspection**: Check generated HTML for correct tags
- **Validator Tools**: Use online validators for immediate feedback
- **Component Props**: Use Astro dev toolbar for prop inspection

## 12. Open Questions & Assumptions

### Confirmed Decisions

- **Theme Color**: "#ffffff" (white)
- **Social Image Size**: 1200x630 pixels (1.91:1 ratio)
- **Tag Processing**: Convert to lowercase for structured data
- **Author Data**: No author bio in structured data

### Assumptions Made

- **Default Image**: "/og-image.jpg" path for future OG image
- **Article Categories**: Using processed tags as keywords
- **Author Data**: Using single author (Ed Johnson-Williams) for all articles

### Areas Needing Clarification

- **Image Dimensions**: Confirm 1200x630 is acceptable
- **Tag Transformation**: Confirm lowercase conversion is desired
- **Fallback Descriptions**: Generic vs page-specific fallbacks
- **Image Handling**: Current placeholder vs immediate implementation

## 13. Success Metrics & Validation

### Immediate Validation

- [ ] All pages build successfully with SEO tags
- [ ] Twitter Card Validator passes for all page types
- [ ] Facebook Debugger shows correct Open Graph data
- [ ] Google Rich Results Test validates structured data
- [ ] No TypeScript compilation errors

### Post-Implementation Validation

- [ ] Social media sharing shows proper preview cards
- [ ] Search Console shows improved structured data
- [ ] No accessibility or performance regressions
- [ ] All existing functionality preserved

### Long-term Success Indicators

- [ ] Improved social media engagement on shared posts
- [ ] Better search engine understanding of content
- [ ] Rich snippets appearing in search results
- [ ] Easier maintenance of SEO configurations
