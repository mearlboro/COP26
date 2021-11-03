---
layout: home
permalink: /visualisation/influencers
title: Top Influencers
head_js:
 - "https://d3js.org/d3.v6.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
body_js:
 - "/assets/data/livegraph_10000.js"
 - "/assets/js/influencers.js"
---

<p class="text-center"> The top 70 COP26 influencers in the last 5 days. Click on a bubble to see their twitter feed.</p>

<svg></svg>

### About this visualisation

This bubble chart shows the Twitter accounts with the largest influencer score across the last 5 days. The influencer score is measured using the PageRank algorithm, a common method for quantifying user importance in network science. User bubbles are coloured according to their grouping in the retweet network.

This visualisation was created using Javascript D3 and uses the <a href="https://observablehq.com/@d3/bubble-chart?collection=@d3/charts" target="_blank">Bubble chart</a> package.
