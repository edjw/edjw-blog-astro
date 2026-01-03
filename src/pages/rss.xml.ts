import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
import sanitizeHtml from "sanitize-html";
import MarkdownIt from "markdown-it";
import siteData from "@/data/siteconfig";

const parser = new MarkdownIt();

export async function GET(context: { site: any }) {
  const blog: CollectionEntry<"blog">[] = await getCollection("blog");
  const response = await rss({
    title: siteData.title,
    description: siteData.description,
    site: context.site,
    customData: `<language>${siteData.seo.locale.toLowerCase().replace("_", "-")}</language>`,
    items: blog.map((post) => ({
      link: `/blog/${post.id}/`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      content: sanitizeHtml(parser.render(post.body || "")),
    })),
  });

  // Add CORS headers to allow cross-origin requests
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
