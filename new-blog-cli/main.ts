const title = prompt("Add your title", "My Blog Post");
const socialDescription = prompt(
  "Add a social description",
  "My Blog Post Description"
);
const tags = prompt("Add any tags (lower and kebab case)", "my-tag, my-tag");

const tagsArray = tags && tags.split(",").map((tag) => tag.trim());

const featured = prompt("Feature on front page? (Y/N)", "N");

const date = new Date().toISOString().split("T")[0];

const data = `---
title: ${title}
pubDate: ${date}
${socialDescription && `socialDescription: ${socialDescription}`}
${tagsArray && "tags:"}
${tagsArray && tagsArray.map((tag) => `  - ${tag}`).join("\n")}
${featured === "Y" ? "featured: true" : "featured: false"}
---


`;

if (title) {
  await Deno.writeTextFile(
    `./src/content/blog/${date}-${title.replace(/\s/g, "-").toLowerCase()}.md`,
    data
  );
}
