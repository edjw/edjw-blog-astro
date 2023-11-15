import { z, defineCollection } from "astro:content";
const kebabCaseRegex = new RegExp(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/);
const blogCollection = defineCollection({
  type: "content",
  schema: z
    .object({
      title: z.string().min(1),
      pubDate: z.date(),
      tags: z
        .array(
          z.string().regex(kebabCaseRegex, {
            message:
              "Use lower case and kebab case for tags: eg 'my-tag' but not 'My Tag' or 'myTag'",
          }),
        )
        .optional(),
      socialDescription: z.string().max(155).optional(),
      image: z.string().optional(),
      featured: z.boolean().optional(),
    })
    .strict(),
});

const StuffSchema = z
  .object({
    name: z.string(),
    url: z.optional(z.string().url()),
    description: z.string(),
  })
  .strict();

const stuffCollection = defineCollection({
  type: "data",
  schema: z.array(StuffSchema),
});

export const collections = {
  blog: blogCollection,
  stuff: stuffCollection,
};
