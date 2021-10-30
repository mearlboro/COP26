---
layout: home
title: Geographical Visualisations
permalink: /visualisation/geographical/
head_js:
 - "https://d3js.org/d3.v4.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
 - "https://d3js.org/d3-geo-projection.v2.min.js"
body_js:
 - "/assets/js/geographical.js"
---

<p class="text-center">See which countries have been most engaged in the discussion surrounding COP26.</p>

<svg id="graph"></svg>

### About this visualisation

The map shown indicates the number of users from each country engaged in the COP26 tweet/retweet network for the period 01/06/2021 to 20/10/2021. User locations are only extracted if a user has a publicly disclosed location and that location makes explicit reference to the name of a country in English. This limitation results in a bias towards English language twitter, although we note that 85% of all tweets in the discussion prior to COP26 were labelled as English language by the Twitter API.

This visualisation was created in Javascript D3 based on <a href="https://github.com/holtzy/D3-graph-gallery" target="_blank">D3-graph-gallery</a>.

