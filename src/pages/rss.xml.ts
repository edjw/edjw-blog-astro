import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";
// @ts-ignore
import sanitizeHtml from "sanitize-html";
// @ts-ignore
import MarkdownIt from "markdown-it";
const parser = new MarkdownIt();

export async function GET(context: { site: any }) {
  const blog: CollectionEntry<"blog">[] = await getCollection("blog");
  return rss({
    title: "Ed Johnson-Williams",
    description: "Ed Johnson-Williams' website",
    site: context.site,
    customData: `<language>en-gb</language>`,
    items: blog.map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      content: sanitizeHtml(parser.render(post.body)),
    })),
  });
}
