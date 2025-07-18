export interface SEOProps {
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

export interface SEOConfig {
  defaultDescription: string;
  locale: string;
  themeColor: string;
  defaultImage: string;
  twitter: {
    site: string;
  };
}

export interface StructuredDataWebSite {
  "@type": "WebSite";
  name: string;
  url: string;
  description: string;
  publisher: {
    "@type": "Person";
    name: string;
  };
}

export interface StructuredDataArticle {
  "@type": "Article";
  headline: string;
  description: string;
  author: {
    "@type": "Person";
    name: string;
  };
  datePublished: string;
  publisher: {
    "@type": "Person";
    name: string;
  };
  keywords: string;
}

export interface StructuredData {
  "@context": "https://schema.org";
  "@graph": (StructuredDataWebSite | StructuredDataArticle)[];
}