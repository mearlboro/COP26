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

The user network shows the neighbours of, and interactions between, the neighbours of a single chosen user.

Search for a user by typing @username into the search box. Need inspiration? Hit I'm feeling lucky.

Search for a user: <input type="text" id="username" value="@username">
<button id="search" onclick="UserSearch(0)" >Search</button>
<button if="lucky"  onclick="LuckySearch(0)">I'm feeling lucky</button>
<p id="message"></p>

<div id="graph"></div>

