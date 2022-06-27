import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import NetlifyCMS from "astro-netlify-cms";

// https://astro.build/config
export default defineConfig({
  site: "https://edjohnsonwilliams.co.uk",
  markdown: {
    remarkPlugins: [
      "remark-html",
      "remark-gfm",
      [
        "remark-footnotes",
        {
          inlineNotes: true,
        },
      ],
    ],
  },
  integrations: [
    sitemap(),
    tailwind({
      config: { applyBaseStyles: false }
    }),
    NetlifyCMS({
      config: {
        backend: {
          name: "git-gateway",
          branch: "main",
          commit_messages: {
            "create": `Create {{collection}} "{{slug}}"`,
            "update": `Update {{collection}} "{{slug}}`,
            "delete": `Delete {{collection}} "{{slug}}`,
            "uploadMedia": `Upload "{{path}}`,
            "deleteMedia": `Delete "{{path}}`
          }
        },
        media_folder: "public/images",
        // publish_mode:  "editorial_workflow"
        collections: [

          {
            "name": "blog",
            "label": "Post",
            "folder": "src/pages/blog",
            "create": true,
            "slug": "{{year}}-{{month}}-{{day}}-{{slug}}",
            "fields": [
              {
                "label": "Title",
                "name": "title",
                "widget": "string"
              },
              {
                "label": "Publish Date",
                "name": "date",
                "widget": "datetime"
              },
              {
                "label": "Social Description",
                "name": "socialDescription",
                "widget": "string",
                "pattern": [
                  ".{0,155}",
                  "Maximum of 155 characters"
                ],
                "default": "Ed Johnson-Williams' blog"
              },
              {
                "label": "Tags",
                "name": "tags",
                "widget": "list",
                "field": {
                  "label": "Tag",
                  "name": "tag",
                  "widget": "string"
                }
              },
              {
                "label": "Body",
                "name": "body",
                "widget": "markdown"
              }
            ]
          },
          {
            "name": "pages",
            "label": "Page",
            "folder": "src/pages",
            "create": false,
            "slug": "{{slug}}",
            "fields": [
              {
                "label": "Title",
                "name": "title",
                "widget": "string"
              },
              {
                "label": "Social Description",
                "name": "socialDescription",
                "widget": "string",
                "pattern": [
                  ".{0,155}",
                  "Maximum of 155 characters"
                ],
                "default": "Ed Johnson-Williams' blog"
              },
              {
                "label": "Body",
                "name": "body",
                "widget": "markdown"
              }
            ]
          }
        ],
      },
    }),
  ],
});
