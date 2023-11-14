import { z, defineCollection } from "astro:content";
const kebabCaseRegex = new RegExp(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/);
const blogCollection = defineCollection({
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

export const collections = {
  blog: blogCollection,
};
