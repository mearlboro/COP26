---
layout: home
title: Dashboard
permalink: /dashboard/
head_js:
 - "https://d3js.org/d3.v4.js"
 - "https://d3js.org/d3-geo-projection.v2.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
 - "https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.js"
body_js:
 - "/assets/data/hashtags.js"
 - "/assets/src/dashboard.js"
---

# COP26 Dashboard

Below is a heatmap of the number of related tweets aggregated per country.

<svg id="map" width="1200" height="600"></svg>

Below are shown the most popular hashtags (word size log-proportional to frequency).

<svg id="cloud" width="1200" height="600"></svg>

