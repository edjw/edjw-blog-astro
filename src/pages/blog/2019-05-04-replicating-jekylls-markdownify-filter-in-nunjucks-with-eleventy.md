---
title: Replicating Jekyll's `markdownify` filter in Nunjucks with Eleventy
date: 2019-05-04T20:11:19.010Z
socialDescription: Converting Markdown strings to HTML with Nunjucks and Eleventy
tags:
  - eleventy
---
Jekyll has a useful filter called `markdownify` that converts a Markdown string into HTML. Nunjucks doesn't have this filter.

I've replicated this in [Eleventy](https://www.11ty.io) by adding this into my `.eleventy.js` file.

```
module.exports = function (eleventyConfig) {

    const md = require('markdown-it')({
        html: false,
        breaks: true,
        linkify: true
    });

    eleventyConfig.addNunjucksFilter("markdownify", markdownString => md.render(markdownString));
};
```

In a Nunjucks template, you can now use <!-- {% raw %} -->`{{ someMarkdownString | markdownify | safe }}` <!-- {% endraw %} -->to convert any Markdown string to HTML.

I'm not 100% sure about the `| safe` bit, but it's working for me like this.
