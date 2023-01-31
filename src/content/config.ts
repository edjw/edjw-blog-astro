import { z, defineCollection } from "astro:content";
const blogCollection = defineCollection({
  schema: z
    .object({
      title: z.string().min(1),
      pubDate: z.date(),
      tags: z.array(z.string()).optional(),
      socialDescription: z.string().max(155).optional(),
      image: z.string().optional(),
      featured: z.boolean().optional(),
    })
    .strict(),
});

export const collections = {
  blog: blogCollection,
};
