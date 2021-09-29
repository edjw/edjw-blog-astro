---
title: "New website: Making it easy to get thumbnails of YouTube videos"
date: 2018-08-26T14:00:00.000Z
permalink: /2018/08/26/making-it-easy-to-get-thumbnails-of-youtube-videos.html
socialDescription: I made a web app that makes it easy to download thumbnails for YouTube videos
tags:
  - new website
  - python
layout: ../../layouts/BlogpostLayout.astro
---

I made a web app that makes it easy to download thumbnails for YouTube videos. It’s called [Get YouTube Thumbnails](https://youtubethumbnails.pythonanywhere.com).

> Update 12 Jan 2021: This broke and I forgot how it worked so I couldn’t fix it. I’ve rebuilt it here: <a href="https://getyoutubethumbnails.netlify.app">getyoutubethumbnails.netlify.app</a>

When you submit a YouTube URL, you get back the image, a link to that image, and the original height and width of that image (even if it's scaled down on your screen size).

You can also download the image with a YouTube play logo overlaid on the top.

This is useful when you want to link to a YouTube video and you can't or don't want to embed a video. This might be:

* in emails
* in presentation slides (PowerPoint etc)
* in websites where you don't want any Javascript
* in websites where you want to minimise data transfers

Let me know if you find it useful!