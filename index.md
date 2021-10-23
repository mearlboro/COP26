---
layout: home
permalink: /
title: COP26 Retweet Network
head_js:
 - "https://unpkg.com/force-graph"
body_js:
 - "/assets/data/retweets_150.js"
 - "/assets/data/retweets_500.js"
 - "/assets/data/retweets_1500.js"
 - "/assets/js/network.js"
 - "https://platform.twitter.com/widgets.js"
---

<a href="/visualisation/communities">See the communities in this network</a>

<div class="controls">
<input type="checkbox"><label for="live" class="small">Live data</label><br/>
<br/>
<p class="small">Network size:</p>
<input name="size" value="150"  onclick="LoadNetwork(150 , false)"  type="radio" checked><label for="150" >150</label><br/>
<input name="size" value="500"  onclick="LoadNetwork(500 , false)"  type="radio"><label for="500" >500</label><br/>
<input name="size" value="1500" onclick="LoadNetwork(1500, false)" type="radio"><label for="1500">1500</label><br/>
</div>

<div id="graph">
</div>

<div id='panel' class='hide'>
  <a id='exit' onclick="ClosePanel()">x</a>
  <h3 id='panel_title'></h3>
  <div id='panel_content'></div>
</div>

<p class="small">(<a onclick="GetHelp()">About this visualisation</a>)</p>

