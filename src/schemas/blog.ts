import { z } from "zod";
import existingTags from "../../tags-so-far.json";

const kebabCaseRegex = new RegExp(/^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/);

// Schema for Astro content collections
export const blogSchema = z
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
      .optional()
      .superRefine((tags) => {
        if (tags) {
          tags.forEach((tag) => {
            if (!existingTags.includes(tag)) {
              // Add a warning (not an error) for new tags
              console.warn(`Warning: New tag "${tag}" is not in tags-so-far.json. Consider adding it to maintain consistency.`);
            }
          });
        }
      }),
    socialDescription: z.string().max(155).optional(),
    image: z.string().optional(),
    featured: z.boolean().optional(),
  })
  .strict();

// Schema for newmd (with date coercion)
export const newmdBlogSchema = z.object({
  title: z.string().min(1),
  pubDate: z.coerce.date(),
  tags: z
    .array(
      z.string().regex(kebabCaseRegex, {
        message:
          "Use lower case and kebab case for tags: eg 'my-tag' but not 'My Tag' or 'myTag'",
      }),
    )
    .optional()
    .superRefine((tags) => {
      if (tags) {
        tags.forEach((tag) => {
          if (!existingTags.includes(tag)) {
            // Add a warning (not an error) for new tags
            console.warn(`Warning: New tag "${tag}" is not in tags-so-far.json. Consider adding it to maintain consistency.`);
          }
        });
      }
    }),
  socialDescription: z.string().max(155).optional(),
  image: z.string().optional(),
  featured: z.boolean().optional(),
});
