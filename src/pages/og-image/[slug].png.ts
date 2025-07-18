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
  `${process.cwd()}/public/fonts/Jost-Regular.ttf`
);
const jostBoldFontFile = readFileSync(
  `${process.cwd()}/public/fonts/Jost-Bold.ttf`
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
  const postsWithTags = allPosts.filter((post) => post.data.tags && post.data.tags.length > 0);
  const allUniqueTags = [...new Set(postsWithTags.map((post) => post.data.tags).flat())]
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

  let typeIndicator = "";
  if (pageType === "blogpost") {
    typeIndicator = '<div class="flex text-gray-500 text-xl mt-2">Blog post</div>';
  }

  const markup = html`<div class="bg-white flex flex-col w-full h-full">
    <div class="flex flex-col w-full h-4/5 p-10 justify-center">
      <div class="flex text-6xl w-full font-bold leading-tight text-gray-900">${title}</div>
      <div class="flex text-gray-600 text-2xl mt-4">${date}</div>
      ${typeIndicator}
    </div>
    <div
      class="w-full h-1/5 border-t border-gray-200 flex p-10 flex-col text-2xl"
    >
      <div class="flex items-center">
        <span class="text-gray-900 font-semibold">${siteData.author.name}</span>
      </div>
      <div class="flex items-center mt-1">
        <span class="text-base text-gray-600"
          >${siteData.url.replace('https://', '')}</span
        >
      </div>
    </div>
  </div>`;

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