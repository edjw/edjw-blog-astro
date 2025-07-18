import satori from "satori";
import { html } from "satori-html";
import sharp from "sharp";
import { readFileSync } from "fs";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { getSlug } from "@/utils/getSlug";
import { titleCase } from "title-case";
import siteData from "@/data/siteconfig";

const jostRegularFontFile = readFileSync(
  `${process.cwd()}/public/fonts/Jost-Regular.ttf`,
);
const jostBoldFontFile = readFileSync(
  `${process.cwd()}/public/fonts/Jost-Bold.ttf`,
);

export async function getStaticPaths() {
  const allPaths = [];

  // Home page
  const homePath = {
    params: { slug: "index" },
    props: {
      title: "Ed Johnson-Williams",
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      pageType: "homepage",
    },
  };

  // About page
  const aboutPath = {
    params: { slug: "about" },
    props: {
      title: "About me",
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      pageType: "page",
    },
  };

  // Now page
  const nowPath = {
    params: { slug: "now" },
    props: {
      title: "Now",
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      pageType: "page",
    },
  };

  // Blog index page
  const blogIndexPath = {
    params: { slug: "blog" },
    props: {
      title: "All blogposts",
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      pageType: "page",
    },
  };

  // Tags index page
  const tagsIndexPath = {
    params: { slug: "tags" },
    props: {
      title: "Tags",
      date: new Date().toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      pageType: "page",
    },
  };

  // Get all blog posts
  const allPosts = await getCollection("blog");
  const allPostsPaths = allPosts.map((post) => {
    return {
      params: { slug: post.id },
      props: {
        title: post.data.title,
        date: post.data.pubDate.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        pageType: "blogpost",
      },
    };
  });

  // Get all unique tags
  const postsWithTags = allPosts.filter(
    (post) => post.data.tags && post.data.tags.length > 0,
  );
  const allUniqueTags = [
    ...new Set(postsWithTags.map((post) => post.data.tags).flat()),
  ]
    .filter((tag): tag is string => !!tag)
    .map((tag) => getSlug(tag));

  const allTagsPaths = allUniqueTags.map((tag) => {
    return {
      params: { slug: `tag-${tag}` },
      props: {
        title: `Posts tagged as ${titleCase(tag).replace(/-/g, " ")}`,
        date: new Date().toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        pageType: "tag",
      },
    };
  });

  allPaths.push(homePath);
  allPaths.push(aboutPath);
  allPaths.push(nowPath);
  allPaths.push(blogIndexPath);
  allPaths.push(tagsIndexPath);
  allPaths.push(...allPostsPaths);
  allPaths.push(...allTagsPaths);

  return allPaths;
}

export async function GET({ params, props }: APIContext) {
  const { slug } = params;
  const { title, date, pageType } = props;

  if (slug === undefined || slug === null) {
    return new Response(null, {
      status: 404,
      statusText: "Not found",
    });
  }

  const blogPostHtml =
    pageType === "blogpost"
      ? '<div class="text-gray-600 text-xl mt-2">Blog post</div>'
      : "";

  const markup =
    html(`<div style="background: white; display: flex; flex-direction: column; width: 100%; height: 100%; font-family: Jost, sans-serif;">
    <div style="display: flex; flex-direction: column; width: 100%; height: 80%; padding: 60px; justify-content: center;">
      <div style="font-size: 64px; font-weight: 700; line-height: 1; color: #1a1a1a; margin-bottom: 20px;">${title}</div>
      <div style="color: #666; font-size: 24px; margin-bottom: 4px;">${date}</div>
      ${blogPostHtml}
    </div>
    <div style="width: 100%; height: 20%; border-top: 4px solid #DA291C; display: flex; padding: 60px; flex-direction: column; justify-content: center; background: #f8f9fa;">
      <div style="display: flex; align-items: center; margin-bottom: 16px;">
        <span style="color: #1a1a1a; font-weight: 600; font-size: 28px;">${siteData.author.name}</span>
      </div>
      <div style="display: flex; align-items: center;">
        <span style="font-size: 20px; color: #666;">${siteData.url.replace("https://", "")}</span>
      </div>
    </div>
  </div>`);

  const svg = await satori(markup, {
    width: 1200,
    height: 630,
    fonts: [
      {
        name: "Jost",
        data: jostRegularFontFile,
        weight: 400,
      },
      {
        name: "Jost",
        data: jostBoldFontFile,
        weight: 700,
      },
    ],
  });

  const png = sharp(Buffer.from(svg)).png();
  const response = await png.toBuffer();

  return new Response(response, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "s-maxage=31536000, stale-while-revalidate=86400",
    },
  });
}
