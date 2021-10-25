---
layout: home
title: Hashtag Visualisation
permalink: /visualisation/hashtags
head_js:
 - "https://d3js.org/d3.v4.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
 - "https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.js"
body_js:
 - "/assets/data/hashtags_green.js"
 - "/assets/data/hashtags_red.js"
 - "/assets/js/hashtags.js"
---

Below are shown the most popular hashtags (word size log-proportional to frequency).

<div class="toggle">
  <span class="green">Green group</span>
  <label class="switch"><input type="checkbox" onclick="Redraw(this)"><span class="slider"></span></label>
  <span class="red">Red group</span>
</div>

<svg id="redCloud" style="display: none">
</svg>
<svg id="greenCloud">
</svg>

