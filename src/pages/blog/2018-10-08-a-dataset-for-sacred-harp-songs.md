---
title: A dataset for Sacred Harp songs
date: 2018-10-08T00:00:00.000Z
socialDescription: CSV and JSON datasets of the Sacred Harp
tags:
  - data
  - shapenote
layout: "../../layouts/BlogpostLayout.astro"
---

I've previously done some analysis involving songs from the Sacred Harp. Some [have been serious](/blog/2018-02-07-female-composers-in-the-sacred-harp); some [less](/blog/2018-06-10-football-formations-in-sacred-harp-numbers){' '}[so](/blog/2018-06-10-square-numbers-in-sacred-harp-song-numbers).

One challenge in doing this analysis is having a machine-readable dataset of all songs to work with. The excellent [indexes on fasola.org](https://fasola.org/indexes/1991/) present the information for each individual song on a different page which is great but you can't easily analyse all the songs at once.

To make future analysis easiser, I've prepared a single dataset of all the songs in _The Sacred Harp, 1991 Edition_ (Denson Revision) in both a `.CSV` spreadsheet and also in a `.JSON` file.

---

**Download the [.CSV spreadsheet](https://raw.githubusercontent.com/edjw/Sacred-Harp-datasets/master/sacred_harp_songs_data.csv)** (Right click on this link and click Save or Download)

**Download the [.JSON file](https://raw.githubusercontent.com/edjw/Sacred-Harp-datasets/master/sacred_harp_songs_data.json)** (Right click on this link and click Save or Download)

---

The files are [stored in a Github repository here](https://github.com/edjw/Sacred-Harp-datasets). (Don't worry if that bit doesn't make sense. You can still use the CSV and JSON files above.)

Where the data exists, these data are available:

- song number
- bare song number (ie. without the 't' or 'b' after the song number for top or bottom)
- song title
- composer/source
- composition date
- poet/source
- poetry date
- poetic meter
- lyrics
- time signature

~~I'm planning to add time signature data for all the songs.~~ Time signatures are also included.

[**Let me know**](mailto:mail@edjohnsonwilliams.co.uk) if you find mistakes in the data or if you have any ideas about how to make it better.
