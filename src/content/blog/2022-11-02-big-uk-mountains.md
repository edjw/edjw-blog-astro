---
title: Big UK mountains
pubDate: 2022-11-02T20:11:00Z
socialDescription: Not all high mountains are rewarding to climb. Here are the most interesting ones.

tags:
  - learning-out-loud
  - geography
featured: true
---

There's a very high mountain in the Cairngorms in Scotland called ["Sgor an Lochain Uaine"](https://www.google.com/maps/d/viewer?mid=1iOCGBdsMcbORzRdTSw7klktqU_5OlKI&ll=57.05826366073055%2C-3.725758513285524&z=18). It's 1,258m above sea level. That makes it the [5th highest mountain in the UK](https://en.wikipedia.org/wiki/Sg%C3%B2r_an_Lochain_Uaine). But as the whole of the Cairngorms is pretty high, it's not much higher than the surrounding area.

And mountains that are higher than everything else around it are theoretically more likely to have better views at the top.[^1]

Prominence is a word in geography that means the vertical distance you'd have to climb down from one summit before you could start climbing up another higher summit.

Peaks with high prominence are higher than everything else in the area. Peaks with low prominence are usually a similar height to everything else in the area.[^2]

As an example, Sgor an Lochain Uaine has quite a low prominence (118m) – especially for its height (1,258m). On the other hand, Ben More on the Isle of Mull in Scotland has a height and a prominence of 966m. It's the highest mountain on an island. So you'd have to go down to sea level before you could climb anything higher. I haven't climbed Ben More, but [the view looks pretty good to me](https://www.walkhighlands.co.uk/mull/ben-more-mull.shtml#Step6)!

So how can you get a list of mountains that are likely to have a good view from the top? The [UK Prominent Peak Database](https://prominentpeaks.org.uk/index.php) is a list of the 1,530 mountains[^3] in the UK that are a) at least 500m above sea level, and b) have a prominence of at least 100m. They think this criteria makes it easier to find the UK mountains that are probably interesting to climb with a good view at the top.

They categorise all the UK's mountains by prominence. P1000 means a prominence of 1000m+, P500 is 500m+, P200 is 200m, and P100 is 100m+. The UK has 3 P1000s, 155 P500s, 577 P200s and 829 P100s.

I've taken [the UK Prominent Peak Database](https://prominentpeaks.org.uk/downloads.php) and added latitude/longitude, a Google Map link, and a Open Street Map link for each mountain.

Here's [a map I made using the reworked data](https://www.google.com/maps/d/viewer?mid=1iOCGBdsMcbORzRdTSw7klktqU_5OlKI). It's a nice way to visualise the locations of these higher and prominent mountains and find mountains in a specific area. It looks like the website may have had a map in the past but it's not working any more.

Here are links to the datasets I've adapted from the UK Prominent Peak data.

- All GB: [CSV](/files/big-uk-mountains/All_GB_Peaks_P100+_H500+.csv) / [XLSX](/files/big-uk-mountains/All_GB_Peaks_P100+_H500+.xlsx)
- P1000 (prominence of 1000m+): [CSV](/files/big-uk-mountains/P1000_GB_Peaks.csv) / [XLSX](/files/big-uk-mountains/P1000_GB_Peaks.xlsx)
- P500: [CSV](/files/big-uk-mountains/P500_GB_Peaks.csv) / [XLSX](/files/big-uk-mountains/P500_GB_Peaks.xlsx)
- P200: [CSV](/files/big-uk-mountains/P200_GB_Peaks.csv) / [XLSX](/files/big-uk-mountains/P200_GB_Peaks.xlsx)
- P100: [CSV](/files/big-uk-mountains/P100_GB_Peaks.csv) / [XLSX](/files/big-uk-mountains/P100_GB_Peaks.xlsx)

I removed mountains in Northern Ireland. Unfortunately I couldn't get my program to convert the OS map references for Northern Irish peaks into latitude/longitude which is needed for making the map above. I also removed a few columns from the dataset that weren't working any more.

There is another database called ["Database of British and Irish hills"](http://www.hills-database.co.uk/downloads.html) that seems to be updated regularly. It is extremely thorough (21,291 hills!) with data about peaks as low as just 2m above sea level! The website recommends [an iOS app called Hill Lists](https://apps.apple.com/app/id315200683) and [an Android app called British Hills](https://play.google.com/store/apps/details?id=uk.colessoft.android.hilllist&hl=en_GB) as app-based ways of accessing and filtering this database.

[^1]: Although [this photo from the top of Sgor an Lochain Uaine](https://www.geograph.org.uk/photo/3067669) makes the view seem well worth it in this case.

[^2]: I've also seen the word "drop" used instead of prominence.

[^3]: In the UK, [a mountain is 610m (2,000ft) above sea level](https://en.wikipedia.org/wiki/Mountain#Definition). But I'm just going to say mountain even though some of the peaks in the UK Prominent Peak Database are only 500m.
