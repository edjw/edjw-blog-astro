---
title: Winners and Losers in the City of Durham Parish Council Election
pubDate: 2018-05-04T00:00:00.000Z
socialDescription: Analysing the results of the City of Durham Parish Council Election 2018
tags:
  - politics
  - data
---

Yesterday saw the first [City of Durham Parish Council Election](https://www.durham.gov.uk/durhamcityelection). Considering it was the first election of its type, it would have been handy if [the council had told people](https://twitter.com/_edjw/status/991946855562076160) how the electoral system would work.

The [parish council is divided into three wards](https://www.durham.gov.uk/media/24199/Community-Governance-Review-City-of-Durham-Parish-Boundary-and-Wards/pdf/CityOfDurhamParishBoundaryAndWards2017.pdf):

Elvet and Gilesgate (six councillors) — [results](https://www.durham.gov.uk/media/24668/Declaration-of-Result-City-of-Durham-Parish-Elvet-and-Gilesgate-Ward/pdf/DeclarationOfResult-CityOfDurhamElvetAndGilesgateWard.pdf)
Neville's Cross (eight councillors) — [results](https://www.durham.gov.uk/media/24669/Declaration-of-Result-City-of-Durham-Parish-Nevilles-Cross-Ward/pdf/DeclarationOfResult-CityOfDurhamNevillesCrossWard1.pdf)
Durham South (one councillor) — [results](https://www.durham.gov.uk/media/24667/Declaration-of-Result-City-of-Durham-Parish-Durham-South-Ward/pdf/DeclarationOfResult-CityOfDurhamDurhamSouthWard.pdf)

Nearly all the candidates stood for a party but you voted for the candidates rather than the party. If you live in a ward with six councillors, you can vote for up to six candidates and the six candidates with the most votes win. It's [first-past-the-post](https://en.wikipedia.org/wiki/First-past-the-post_voting) in a multi-member constituency.

I ran [some numbers on the results](https://docs.google.com/spreadsheets/d/1Zd9AObNK9Lg9brqe4iERKLBiPNTHiYNtGNFHWOtvqRo/edit?usp=sharing). Fun times.
(Thanks to [Tabula](https://github.com/tabulapdf/tabula) and specifically the [tabula-py](https://github.com/chezou/tabula-py) Python wrapper for Tabula that helped with exporting the table of results from Durham County Council's PDFs into CSVs.)

[**Aggregated _Neville's Cross_ Results**](https://www.durham.gov.uk/media/24669/Declaration-of-Result-City-of-Durham-Parish-Nevilles-Cross-Ward/pdf/DeclarationOfResult-CityOfDurhamNevillesCrossWard1.pdf)

The quirks of the system are clearest in the Neville's Cross ward.

<table class="border-collapse border-spacing-0">
  <tr class="border border-black">
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      PARTY
    </th>
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      VOTES
    </th>
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      SEATS WON
    </th>
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      NUM OF CANDIDATES
    </th>
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      AVG VOTES PER CANDIDATE
    </th>
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      % VOTES
    </th>
    <th class="overflow-hidden border border-black px-1 py-3 font-semibold">
      % SEATS
    </th>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-yellow-200">LD</td>
    <td class="overflow-hidden border border-black bg-yellow-200">7098</td>
    <td class="overflow-hidden border border-black bg-yellow-200">4</td>
    <td class="overflow-hidden border border-black bg-yellow-200">8</td>
    <td class="overflow-hidden border border-black bg-yellow-200">887</td>
    <td class="overflow-hidden border border-black bg-yellow-200">41.5</td>
    <td class="overflow-hidden border border-black bg-yellow-200">50</td>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-red-600 text-white">
      LAB
    </td>
    <td class="overflow-hidden border border-black bg-red-600 text-white">
      4031
    </td>
    <td class="overflow-hidden border border-black bg-red-600 text-white">2</td>
    <td class="overflow-hidden border border-black bg-red-600 text-white">6</td>
    <td class="overflow-hidden border border-black bg-red-600 text-white">
      672
    </td>
    <td class="overflow-hidden border border-black bg-red-600 text-white">
      23.5
    </td>
    <td class="overflow-hidden border border-black bg-red-600 text-white">
      25
    </td>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      GREEN
    </td>
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      3012
    </td>
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      1
    </td>
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      4
    </td>
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      753
    </td>
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      17.6
    </td>
    <td class="overflow-hidden border border-black bg-lime-600 text-white">
      12.5
    </td>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-sky-700 text-white">
      CON
    </td>
    <td class="overflow-hidden border border-black bg-sky-700 text-white">
      1241
    </td>
    <td class="overflow-hidden border border-black bg-sky-700 text-white">0</td>
    <td class="overflow-hidden border border-black bg-sky-700 text-white">3</td>
    <td class="overflow-hidden border border-black bg-sky-700 text-white">
      414
    </td>
    <td class="overflow-hidden border border-black bg-sky-700 text-white">
      7.2
    </td>
    <td class="overflow-hidden border border-black bg-sky-700 text-white">0</td>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-stone-300">IND 2</td>
    <td class="overflow-hidden border border-black bg-stone-300">823</td>
    <td class="overflow-hidden border border-black bg-stone-300">1</td>
    <td class="overflow-hidden border border-black bg-stone-300">1</td>
    <td class="overflow-hidden border border-black bg-stone-300">823</td>
    <td class="overflow-hidden border border-black bg-stone-300">4.8</td>
    <td class="overflow-hidden border border-black bg-stone-300">12.5</td>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-stone-300">IND 1</td>
    <td class="overflow-hidden border border-black bg-stone-300">566</td>
    <td class="overflow-hidden border border-black bg-stone-300">0</td>
    <td class="overflow-hidden border border-black bg-stone-300">1</td>
    <td class="overflow-hidden border border-black bg-stone-300">566</td>
    <td class="overflow-hidden border border-black bg-stone-300">3.3</td>
    <td class="overflow-hidden border border-black bg-stone-300">0</td>
  </tr>
  <tr class="border border-black">
    <td class="overflow-hidden border border-black bg-stone-300">IND 3</td>
    <td class="overflow-hidden border border-black bg-stone-300">353</td>
    <td class="overflow-hidden border border-black bg-stone-300">0</td>
    <td class="overflow-hidden border border-black bg-stone-300">1</td>
    <td class="overflow-hidden border border-black bg-stone-300">353</td>
    <td class="overflow-hidden border border-black bg-stone-300">2.1</td>
    <td class="overflow-hidden border border-black bg-stone-300">0</td>
  </tr>
</table>
---

1. Three Green candidates in Neville's Cross got more votes than the average Labour candidate. But only one Green candidate was elected whereas two Labour candidates were elected.
2. Green candidates got more votes on average than Labour candidates but two Labour candidates were elected and only one Green candidate was elected.
3. One Lib Dem candidate got more votes than the average Labour and Green candidate. But she didn't get elected even though Labour and the Greens won two seats and one seat respectively.

It looks like Green voters ran out of Green candidates to vote for. With their remaining votes it seems likely that they voted for Labour candidates with the effect of boosting Labour candidates above Green candidates.

It's important to note that two Labour candidates who won seats got significantly more support than the other Labour candidates. I'm not sure but lots of voters could know them personally.

So key takeaways are:

1. If you support a single party, vote for all the candidates from that party and don't vote for any others. Just don't use all your votes. If you do, you risk boosting them above the candidates from your most-preferred party.
2. If you're a political party in one of these elections, do everything you can to field the maximum number of candidates. It ensures that supporters of your party just vote for your candidates and don't boost other parties' candidates above your most popular candidate(s).

Despite the quirks, for a first-past-the-post election, these results were _relatively_ proportional. In general, the Greens suffered the most. I [used this website](http://www.dhondt.eu/js/) to project what the results would have been under one type of proportional representation where voters voted for a party rather than individual candidates. The Greens would have won two extra seats overall across the city.
