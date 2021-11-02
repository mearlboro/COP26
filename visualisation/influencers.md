---
layout: home
title: Top Influencers
head_js:
 - "https://d3js.org/d3.v6.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
body_js:
 - "/assets/data/livegraph_1500.js"
 - "/assets/js/influencers.js"
---

<p class="text-center"> See which Twitter accounts are the top COP26 influencers. </p>

<svg></svg>

### About this visualisation

This chart lists the accounts with the largest influencer score as measured using the PageRank algorithm, a common method for quantifying user importance in network science.

This visualisation was created using Javascript D3 and uses the <a href="https://observablehq.com/@d3/bubble-chart?collection=@d3/charts" target="_blank">Bubble chart</a> package.
