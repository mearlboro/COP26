---
layout: home
title: Hashtag Trends
permalink: /visualisation/trends
head_js:
 - "https://d3js.org/d3.v6.min.js"
body_js:
 - "/assets/data/trends_data.js"
 - "/assets/js/trends.js"
---

<p class="text-center"> See which COP26 hashtags are trending live. Hover over each line to explore. </p>

<svg></svg>

### About this visualisation

The chart shows the "trending score" for hashtags associated with COP26, calculated on an hourly basis. All hashtags which appear in the top 5 trending hashtags at any point during the observation window are included on the chart.

The trending score is based on methods inspired by Twitter's trending algorithm. The implementation used was created by Jeff Kolb and Josh Montague and is available <a href="https://github.com/twitterdev/Gnip-Trend-Detection" target="_blank">here</a>. 

This visualisation was created using Javascript D3 and uses the XXX package.

