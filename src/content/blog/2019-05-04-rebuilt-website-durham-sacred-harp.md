---
title: "Rebuilt website: Durham Sacred Harp"
pubDate: 2019-05-04T20:40:11.516Z
socialDescription: I rebuilt this site in Eleventy which brought some nice advantages
tags:
  - new-website
  - shapenote
---

I've rebuilt the [Durham Sacred Harp site](https://durhamsacredharp.co.uk) in [Eleventy](https://www.11ty.io). The [source is on Github here](https://github.com/durhamsacredharp/durham-sacred-harp).

This let me add in Netlify CMS which will make managing the content a lot easier as it was just one big HTML file before. The site should look the same.

On the old site, I was using client-side Javascript to work out the dates of the next three singings. This was always a hack that I wasn't that happy with. If someone had the date and time wrong on their computer it wouldn't show the correct dates.

I've put the script into an Eleventy Javascript Data files to get those dates at build time. Then I use the IFTT and Netlify build webhook technique I wrote about [in this blogpost](/blog/2019-04-25-publishing-my-pocket-reading-list-on-this-website) to rebuild the site every Sunday at midnight.
