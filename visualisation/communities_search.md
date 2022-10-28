---
layout: home
title: Community User Networks
permalink: /visualisation/communities_search
head_js:
    - "https://d3js.org/d3.v4.min.js"
    - "https://d3js.org/d3-scale-chromatic.v1.min.js"
    - "/assets/js/force-graph.js"
body_js:
    - "/assets/data/ego_network.js"
    - "/assets/js/communities.js"
---
<div class="text-center">
<p>The user network shows the neighbours of, and interactions between, the neighbours of a single chosen user.<br/>
Search for a user by typing <a>@username</a> into the search box. Need inspiration? Hit <a>I'm feeling lucky</a>.</p>

<input type="text" id="username" value="@username">
<button id="search" onclick="UserSearch(0)" >Search</button>
<button if="lucky"  onclick="LuckySearch(0)">I'm feeling lucky</button>
<p id="message"></p>
</div>

<div id="graph" class="center"></div>

### About this visualisation

The network visualises the structure of publicly visible retweet interactions for a single user and their direct connections. Only users with more than 10,000 followers are shown.

Each node corresponds to a Twitter account which tweeted, or retweeted, any tweet containing the term “cop26”. An edge between two nodes indicates that one user retweeted a tweet originally authored by the other user. 

Data for this network was collected prior to COP26, in the period 01/06/2021 to 20/10/21. The size of the nodes shown corresponds to the influence of each user in the network. Nodes are coloured according to their “community” in the Twitter discussion related to COP26. This procedure is automated using the <a target="_blank" href="https://towardsdatascience.com/infomap-algorithm-9b68b7e8b86">Infomap community detection algorithm</a>. 

Tweet and user data was collected using the official <a href="https://developer.twitter.com/en/products/twitter-api/academic-research">Twitter API for academic use</a>. Data relating to protected and deleted accounts, and deleted tweets are not accessible via the Twitter API and are not used to construct the network.

This visualisation was created using Javascript D3 and the <a target="_blank" href="https://github.com/vasturiano/force-graph">force-graph</a> package.


