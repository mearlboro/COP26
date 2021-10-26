---
layout: home
title: COP26 Community User Networks
permalink: /visualisation/communities_search
head_js:
    - "https://d3js.org/d3.v4.min.js"
    - "https://d3js.org/d3-scale-chromatic.v1.min.js"
    - "https://unpkg.com/force-graph"
body_js:
    - "/assets/data/ego_network.js"
    - "/assets/js/communities.js"
---

Search for a user: <input type="text" id="username" value="@username">
<button id="search" onclick="UserSearch(0)" >Search</button>
<button if="lucky"  onclick="LuckySearch(0)">I'm feeling lucky</button>
<p id="message"></p>

<div id="graph"></div>

