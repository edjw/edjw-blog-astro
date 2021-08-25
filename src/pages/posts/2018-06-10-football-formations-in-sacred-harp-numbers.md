---
title: Football formations in Sacred Harp numbers
date: 2018-06-10T00:00:00.000Z
socialDescription: Sacred Harp song numbers that are also football/soccer formations
tags:
  - data
  - shapenote
---
This is a very silly post.

I took all [the song numbers](https://fasola.org/indexes/1991/?v=pagenum) from [the Sacred Harp](https://en.wikipedia.org/wiki/Sacred_Harp) and asked the question, "Which song numbers in the Sacred Harp are football/soccer formations?"

The answer (if you only count modern, **proper** formations with a forward) is:

> _343_, _352_, _361_, _424_, _433_, _442_, _451_, _523_, _532_, and _541_

There's a great book called [Inverting the Pyramid](https://www.orionbooks.co.uk/books/detail.page?isbn=9781409176824) that's about the history of football formations. A really popular formation in the 1880s was _2-3-5_. Some teams in recent years have also experimented with playing without a forward.

So, if you count all possible formations with 10 outfield players and at least 1 player in defence and midfield (but not necessarily [at least 1 forward](https://en.wikipedia.org/wiki/Forward_(association_football)#False_9)) then the full list is:

> _118_, _127_, _136_, _145t_, _145b_, _154_, _163t_, _163b_, _172_, _181_, _217_, _235_, _271t_, _271b,_ _280_, _316_, _325_, _334_, _343_, _352_, _361_, _370_, _415_, _424_, _433_, _442_, _451_, _460_, _523_, _532_, _541_, and _550_

And the Python code I used to get the answers to this very silly question…

<pre>

# All song numbers with the t (top) or b (bottom) taken off
song_numbers = [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 191, 192, 193, 195, 196, 197, 198, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 220, 222, 223, 224, 225, 227, 228, 229, 230, 231, 232, 234, 235, 236, 240, 242, 245, 250, 254, 260, 263, 266, 267, 268, 269, 270, 271, 272, 273, 274, 275, 276, 277, 278, 279, 280, 282, 283, 284, 285, 286, 287, 288, 289, 290, 291, 292, 293, 294, 295, 296, 297, 298, 299, 300, 301, 302, 303, 304, 306, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 318, 319, 320, 321, 322, 323, 324, 325, 326, 327, 328, 329, 330, 331, 332, 333, 334, 335, 336, 337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 347, 348, 349, 350, 351, 352, 353, 354, 355, 358, 359, 360, 361, 362, 365, 367, 368, 369, 370, 371, 372, 373, 374, 375, 376, 377, 378, 379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393, 394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 419, 420, 421, 422, 423, 424, 425, 426, 428, 429, 430, 431, 432, 433, 434, 435, 436, 437, 438, 439, 440, 441, 442, 444, 445, 446, 447, 448, 449, 450, 451, 452, 453, 454, 455, 456, 457, 458, 459, 460, 461, 462, 463, 464, 465, 466, 467, 468, 470, 471, 472, 473, 474, 475, 476, 477, 478, 479, 480, 481, 482, 483, 484, 485, 486, 487, 488, 489, 490, 491, 492, 493, 494, 495, 496, 497, 498, 499, 500, 501, 502, 503, 504, 505, 506, 507, 510, 511, 512, 513, 515, 516, 517, 518, 521, 522, 523, 524, 527, 528, 530, 531, 532, 534, 535, 536, 538, 539, 540, 541, 542, 543, 544, 545, 546, 547, 548, 549, 550, 551, 553, 556, 558, 560, 562, 564, 565, 566, 567, 568, 569, 570, 571, 572, 573]

total_is_ten = []

for number in song_numbers:
    number_of_digits = len(str(number))

    # Remove numbers from the list that are only 2 digits.
    # Football formations have at least 3 digits in
    if number_of_digits != 3:
        continue

    # Remove numbers from the list with a zero for the middle number
    # No-one plays 0 in defence or midfield. Some teams like Barcelona occasionally play 0 up front
    list_of_digits = [int(digit) for digit in str(number)]
    if min(list_of_digits[1:2]) == 0:
        continue

    # From the remaining numbers in the list, keep it if the sum of the digits in the number is 10
    sum_of_digits = sum(int(digit) for digit in str(number))
    if sum_of_digits == 10:
        total_is_ten.append(number)

print(total_is_ten)

# All results
# 118, 127, 136, 145, 154, 163, 172, 181, 217, 235, 271, 280, 316, 325, 334, 343, 352, 361, 370, 415, 424, 433, 442, 451, 460, 523, 532, 541, 550

# All results where it's a proper formation nowadays
# 343, 352, 361, 424, 433, 442, 451, 523, 532, 541

</pre>
