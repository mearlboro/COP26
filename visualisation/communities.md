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
	<p>Users in the same community. Hierarchy level:</p>
  </div>
  <div id="graph"></div>
</div>



<p class="small">This circle packing visualisation shows the nested communities of the 500 most influential users in the COP26 tweet/retweet network. To explore the visualisation click on a circle to zoom in on that community. Clicking on a white circle after the visualisation has zoomed will reset the visualisation.</p>

<p class="small">The visualisation uses Twitter data  for the period prior to the conference (01/06/2021 to 20/10/2021). Each white circle corresponds to a username. White circles grouped together in a larger circle indicate that those users have been identified as a community. These communities may be stand-alone, or may be a sub-community in a larger community.

<p class="small">
Communities are identified using the Infomap algorithm, an automated process which groups nodes based on how information flows through the directed edges of a network. This process is unsupervised, and groups nodes based on similarities in their interactions in the discussion relating to COP26 - it does not indicate any interactions related to discussions outside twitter, or discussions on twitter which do not explicitly reference COP26 (even if they relate to climate change).
Note, for privacy and data protection reasons we have not labelled communities.

