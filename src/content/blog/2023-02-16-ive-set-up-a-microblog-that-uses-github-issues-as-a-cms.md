---
title: I've set up a microblog that uses Github Issues as a CMS
pubDate: 2023-02-16T21:51:29.046Z
socialDescription: I stopped using social media a while ago. What if I could just easily post stuff to a website of my own?
tags:
  - new-website
  - astro
featured: false
---

I've made a [microblog](https://microblog.edjohnsonwilliams.co.uk). It's a blog but the idea is that I can put short posts there without too much thought or effort.

The key thing here is the posting experience. If it's not easy, I won't do it.

Writing a markdown file on my phone is just not going to happen. I *can* – but usually don't – use Netlify CMS for this blog and it's not good on mobile – like it's really bad.

Github's interface for creating issues is pretty good for this though, including on the mobile app. You get a really good markdown editor for free including the ability to add images, videos, all markdown stuff and a formatting bar.

The microblog uses [Astro](https://astro.build) for the framework, same as this blog. But the microblog renders dynamically on the server using Vercel's serverless functions to fetch the content from Github's API for Issues and build the pages. Github has a limit of 5,000 API requests an hour. Seems unlikely the microblog will get enough visitors to hit that.

I also pieced together an API route which dynamically builds share (Open Graph) images for all of the pages. That uses [Vercel's 'satori'](https://github.com/vercel/satori) library.

I'll switch the site repostitory to public in a few days. I'll probably leave the Issues/CMS repository private.