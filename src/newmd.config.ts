import { defineConfig } from "newmd";
import { newmdBlogSchema } from "./schemas/blog";

export default defineConfig({
  // Corresponding to the `base` option in the content config
  path: "./content/blog",
  schemas: {
    blog: newmdBlogSchema,
  },
});
