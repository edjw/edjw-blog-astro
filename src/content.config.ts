import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { blogSchema } from "@/schemas/blog";

const blogCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/blog" }),
  schema: blogSchema,
});

const StuffSchema = z
  .object({
    name: z.string(),
    url: z.optional(z.string().url()),
    description: z.string(),
  })
  .strict();

const stuffCollection = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/stuff" }),
  schema: z.array(StuffSchema),
});

export const collections = {
  blog: blogCollection,
  stuff: stuffCollection,
};
