import slugify from "npm:slugify";

const title = prompt("Add your title", "My Blog Post");
const socialDescription = prompt(
  "Add a social description",
  "My Blog Post Description",
);
const tags = prompt("Add any tags (lower and kebab case)", "my-tag, my-tag");

const slugifiedTitle = slugify(title, { lower: true, strict: true });

const tagsArray = tags?.split(",").map((tag) => tag.trim());

const featured = prompt("Feature on front page? (Y/N)", "N");

const datetime = new Date().toISOString();

const date = new Date().toISOString().split("T")[0];

const frontmatter = `---
title: ${title}
pubDate: ${datetime}
${socialDescription && `socialDescription: ${socialDescription}`}
${tagsArray && "tags:"}
${tagsArray?.map((tag) => `  - ${tag}`).join("\n")}
${
  featured && featured.toLowerCase() === "y"
    ? "featured: true"
    : "featured: false"
}
---


`;

if (title) {
  await Deno.writeTextFile(
    `./src/content/blog/${date}-${slugifiedTitle}.md`,
    frontmatter,
  );
}
