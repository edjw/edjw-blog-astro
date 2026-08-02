import { getCollection } from "astro:content";

export function getPublishedBlogPosts() {
  return getCollection("blog", ({ data }) => !data.draft);
}

export function getPreviewableBlogPosts() {
  return import.meta.env.PROD ? getPublishedBlogPosts() : getCollection("blog");
}
