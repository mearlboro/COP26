---
layout: home
permalink: /
title: COP26 Retweet Network
head_js:
 - "https://d3js.org/d3.v4.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
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
  <div id='help' class='hide'>
     <p class='small'>The network shown visualises the structure of publically visible tweet/retweet interactions related to COP26. </p>
<p class="small">
     Use the buttons on the left to change the size of the visualised network or switch between the network of interaction prior to COP26, and live during COP26. Note, that since COP26 is being hosted in the UK, the network of interactions prior to the conference is dominated by UK-based twitter accounts.</p>

<p class="small">
     Each node corresponds to a Twitter account which tweeted, or retweeted, any tweet containing the term "cop26". An edge between two nodes indicates that one user retweeted a tweet originally authored by the other user. Such a connection is generally considered to indicate the retweeter endorsing, or expressing an interest in, the originally authored tweet's message (despite the common disclaimer that retweets are not endorsements). Quote tweets are excluded since these are more likely to express a contrasting opinion to the original tweet. </p>

<p class="small">
     For the network illustrating interactions prior to COP26, tweets were downloaded for the period 01/06/2021 to 20/10/21. The total network contains over 300 thousand unique users and over 800,000 tweet/retweet interactions. However, for practical purposes we only show users and edges relating to the most influential twitter accounts discussing COP26, as measured using <a target="_blank" href="https://en.wikipedia.org/wiki/PageRank">standard techniques in network science</a>. The size of the nodes shown corresponds approximately to the influence of each user in the network. Nodes are coloured according to their "community" in the twitter discussion related to COP26. This procedure is automated using the <a target="_blank" href="https://towardsdatascience.com/infomap-algorithm-9b68b7e8b86">Infomap community detection algorithm</a>. To see the network's community structure in more detail, click on the communities tab on the visualisations page, or click <a href="/visualisation/communities">here</a>. </p>

<p class="small">
     For the live version, tweet/retweet interactions are shown for the 48 hour period preceding the most recent update.</p>

<p class="small">
     Tweet and user data was collected using the official <a hreff="https://developer.twitter.com/en/products/twitter-api/academic-research">Twitter API for academic use</a>. Data relating to protected and deleted accounts, and deleted tweets is not accessible via the Twitter API and is not used to construct the network.</p>

<p class="small">
     This visualisation was created using Javascript D3 and the <a target="_blank" href="https://github.com/vasturiano/force-graph">force-graph</a> package.</p>
    </div>

</div>

<p class="small">(<a onclick="GetHelp()">About this visualisation</a>)</p>

