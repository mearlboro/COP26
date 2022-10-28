---
layout: home
permalink: /
title: Retweet Network
head_js:
 - "https://d3js.org/d3.v4.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
 - "assets/js/force-graph.js"
body_js:
 - "/assets/data/retweets_150_cop26.js"
 - "/assets/data/retweets_500_cop26.js"
 - "/assets/data/retweets_1500_cop26.js"
 - "/assets/data/livegraph_150_cop27.js"
 - "/assets/data/livegraph_500_cop27.js"
 - "/assets/data/livegraph_1500_cop27.js"
 - "/assets/js/network.js"
 - "https://platform.twitter.com/widgets.js"
---

<p class="text-center">
Network of publicly visible retweet interactions related to COP26. Zoom out to see full structure and look out for fringe communities.
</p>

<p class="text-center">
<a href="/visualisation/influencers">Top Influencers</a> &nbsp;&nbsp;&nbsp; <a href="/visualisation/communities">Network Communities</a>  &nbsp;&nbsp;&nbsp; <a href="/visualisation/trends">Live Trends</a>
</p>

<div class="controls small">
  <input type="checkbox" id="live" onClick="ToggleLive()"><label for="live" class="small">Live data</label><br/>
  <br/>
  <div class="hide-sm">
    Network size:<br/>
    <input name="size" value="150"  onclick="LoadNetwork(150 )"  type="radio" checked><label for="150" >150</label><br/>
    <input name="size" value="500"  onclick="LoadNetwork(500 )"  type="radio"><label for="500" >500</label><br/>
    <input name="size" value="1500" onclick="LoadNetwork(1500)"  type="radio"><label for="1500">1500</label><br/>
  </div>
  <p class="small" id="updated"></p>
</div>

<div id="graph">
</div>

<div id="panel" class="hide hide-sm">
  <a id="exit" onclick="ClosePanel()">x</a>
  <h3 id="panel_title"></h3>
  <div id="panel_content" class="text-center"></div>
</div>

### About this visualisation

Use the buttons on the left to change the size of the visualised network (not available on mobile) or switch between the network of interactions prior to COP26, and live during COP26. Since COP26 is being hosted in the UK, the network of interactions prior to the conference is dominated by UK-based twitter accounts.

Each node corresponds to a Twitter account which tweeted, or retweeted, any tweet containing the term “cop26”. An edge between two nodes indicates that one user retweeted a tweet originally authored by the other user. Such a connection is generally considered to indicate the retweeter endorsing, or expressing an interest in, the originally authored tweet’s message (despite the common disclaimer that retweets are not endorsements). Quote tweets are excluded since these are more likely to express a contrasting opinion to the original tweet.

For the network illustrating interactions prior to COP26, tweets were downloaded for the period 01/06/2021 to 20/10/21. The total network contains over 300 thousand unique users and over 800 thousand edges. Here, for practical purposes, we only show users and edges relating to the most influential twitter accounts discussing COP26, as measured using <a target="_blank" href="https://en.wikipedia.org/wiki/PageRank">standard techniques in network science</a>. The size of the nodes corresponds approximately to the influence of each user in the network. Nodes are coloured according to their “community” in the Twitter discussion related to COP26. This procedure is automated using the <a target="_blank" href="https://towardsdatascience.com/infomap-algorithm-9b68b7e8b86">Infomap community detection algorithm</a>. To see the network’s community structure in more detail, click on the communities tab on the visualisations page, or click <a href="/visualisation/communities">here</a>.

For the live version, retweet interactions are shown for the 72 hour period preceding the most recent update.

Tweet and user data was collected using the official <a href="https://developer.twitter.com/en/products/twitter-api/academic-research">Twitter API for academic use</a>. Data relating to protected and deleted accounts, and deleted tweets, are not accessible via the Twitter API and are not used to construct the network.

This visualisation was created using Javascript D3 and the <a target="_blank" href="https://github.com/vasturiano/force-graph">force-graph</a> package.



