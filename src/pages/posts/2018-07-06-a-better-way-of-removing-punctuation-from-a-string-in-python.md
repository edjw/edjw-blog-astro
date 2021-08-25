---
title: A better way of removing punctuation from a string in Python
date: 2018-07-06T00:00:00.000Z
socialDescription: An easier way to remove punctuation from strings in Python
tags:
  - python
---
This post is as a future reminder for me as much as anything.

I made [a Python program](https://github.com/edjw/game-image-resizer) called game-image-resizer a few months ago. It takes a list of board games, finds each board game on [BoardGameGeek](http://boardgamegeek.com/)'s API, downloads the best image for each game, does some resizing and editing of the image, and then saves it using a useful filename.

That final stage of saving as a useful filename meant taking the board game name, making it lower case, removing punctuation, and replacing spaces with underscores.

I did it like this – roughly using the information in [this StackOverflow discussion](https://stackoverflow.com/questions/265960/best-way-to-strip-punctuation-from-a-string-in-python).

<pre>

from string import punctuation

# making string lower case
working_string = working_string.lower()

# removing punctuation
remove_punctuation = str.maketrans('', '', punctuation)
working_string = working_string.translate(remove_punctuation)

# replacing spaces and double-spaces with an underscore
working_string = working_string.replace("  ", "_")
working_string = working_string.replace(" ", "_")
</pre>

I found a better, easier-to-use way of doing this earlier this morning on [a Reddit post](https://www.reddit.com/r/Python/comments/8wc2vi/5_rarely_mentioned_but_super_useful_packages_you/) in [/r/Python](https://www.reddit.com/r/Python).

It uses [Inflection](https://inflection.readthedocs.io/en/latest/) – a "string transformation library". Inflection does all sorts of things including `inflection.parameterize().` [Parameterize](https://inflection.readthedocs.io/en/latest/index.html#inflection.parameterize) "replace\[s\] special characters in a string so that it may be used as part of a 'pretty' URL."

This means I can now do the following which is a much nicer-to-read and nicer-to-write solution.

<pre>

from inflection import parameterize

# Example board game names with upper case, punctuation, and non-ASCII characters
board_game_names = [
    "Dawn of the Zeds (Third edition)",
    "Flash Point: Fire Rescue – Honor & Duty",
    "Orléans",
    "Mechs vs. Minions",
    "Tzolk'in: The Mayan Calendar",
    "T.I.M.E Stories",
    "Aeon's End",
]

for name in board_game_names:
    parameterized_name = parameterize(name, separator="_") # Default is `separator='-'`
    print(parameterized_name) # Or whatever I want to do with it


Output

dawn_of_the_zeds_third_edition
flash_point_fire_rescue_honor_duty
orleans
mechs_vs_minions
tzolk_in_the_mayan_calendar
t_i_m_e_stories
aeon_s_end

</pre>

Parameterize mostly just uses some regular expressions but it's very useful. It has the effect of:

1. [Replacing non-ASCII characters](https://inflection.readthedocs.io/en/latest/_modules/inflection.html#transliterate) with an ASCII approximation – using `inflection.transliterate()`
2. [Replacing any character](https://inflection.readthedocs.io/en/latest/_modules/inflection.html#parameterize) with the separator if it isn't one of:
   * a-z
   * A-Z
   * 0-9
   * a hyphen (-)
   * an underscore(_)
3. Ensuring there is never more than one separator in a row
4. Removing separators from the start or end of the string
5. Making the string lower case
