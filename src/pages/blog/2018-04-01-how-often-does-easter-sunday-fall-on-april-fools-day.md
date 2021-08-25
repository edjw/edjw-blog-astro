---
title: When does Easter Sunday fall on April Fools' Day?
date: 2018-04-01T00:00:00.000Z
socialDescription: Today is both April Fools' Day and Easter Sunday. When did
  this last happen and when will it happen again?
tags:
  - python
  - data
---
**Today is both [April Fools' Day](https://en.wikipedia.org/wiki/April_Fools'_Day) and [Easter Sunday](https://en.wikipedia.org/wiki/Easter) (in [Western Christianity](https://en.wikipedia.org/wiki/Western_Christianity)).**

When did this last happen and when will it happen again?

This is relatively straightforward to find out thanks to [Python](https://en.wikipedia.org/wiki/Python_(programming_language)) and specifically the [dateutil](https://github.com/dateutil/dateutil) module. Dateutil makes it easy to find out the date of Easter Sunday for any given year between 1583 and 4099. The code I used for this is right at the bottom of this post.

**The last time April Fools' Day was on Easter Sunday was 1956 – 62 years ago. And the next time will be in 2029 – only 11 more years!**

Here's a full list of years where Western Easter Sunday is on April Fools' Day.

1584
1646
1657
1668
1714
1725
1736
1804
1866
1877
1888
1923
1934
1945
1956
2018
2029
2040
2108
2170
2181
2192
2238
2249
2260
2306
2317
2328
2401
2412
2485
2496
2553
2564
2610
2621
2632
2700
2762
2773
2784
2857
2863
2868
2925
2936
3004
3077
3088
3145
3156
3235
3240
3308
3387
3392
3449
3455
3460
3517
3528
3601
3607
3612
3691
3696
3759
3764
3821
3827
3832
3900
3973
3979
3984
4063
4068
4074

## The Code

<pre>

from dateutil.easter import easter

for year in range(1583, 4100):
    easter_full_date = easter(year)
    easter_full_date = str(easter_full_date)
    year, month, date = easter_full_date.split("-")

    if date == "01" and month == "04":
        print(year)
</pre>
