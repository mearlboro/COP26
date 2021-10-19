---
layout: home
permalink: /network/
title: COP26 Retweet Network
head_js: 
 - "https://unpkg.com/force-graph"
body_js:
 - "/assets/data/graph.js"
 - "/assets/src/network.js"
 - "https://platform.twitter.com/widgets.js"
---

<p class="small">(<a onclick="GetHelp()">About this visualisation</a>)</p>

<div id="graph">
</div>

<div id='panel' class='hide'>
  <a id='exit' onclick="ClosePanel()">x</a>
  <h3 id='panel_title'></h3>
  <div id='panel_content'></div>
</div>
