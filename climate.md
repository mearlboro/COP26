---
layout: home
permalink: /climate/
title: COP26 General Climate Network
head_js:
 - "https://unpkg.com/force-graph"
body_js:
 - "/assets/data/climate.js"
 - "/assets/src/climate_net.js"
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
