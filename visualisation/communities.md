---
layout: home
title: COP26 Communities Visualisation
permalink: /visualisation/communities
head_js:
    - "https://d3js.org/d3.v4.min.js"
    - "https://d3js.org/d3-scale-chromatic.v1.min.js"
    - "https://unpkg.com/force-graph"
body_js:
    - "/assets/js/communities.js"
    - "/assets/data/ego_network.js"
---

Below is a visualisation of communities discussing COP26 amongst the 500 most influential nodes. Click on each coloured circle to explore community members. Click on a white circle to zoom out.

<svg id="circles"></svg>
Search for a user: <input type="text" id="username" value="@username">
<button id="search" onclick="UserSearch()" >Search</button>
<button if="lucky"  onclick="LuckySearch()">I'm feeling lucky</button>
<p id="message"></p>

<div class="flexi flexi-2">
  <div id="table">
    <p>Users in the same community, hierarchy level:</p>
  </div>
  <div id="graph"></div>
</div>
