---
layout: home
title: COP26 Most popular Hashtags
permalink: /visualisation/hashtags
head_js:
 - "https://d3js.org/d3.v4.min.js"
 - "https://d3js.org/d3-scale-chromatic.v1.min.js"
 - "https://cdnjs.cloudflare.com/ajax/libs/d3-cloud/1.2.5/d3.layout.cloud.js"
body_js:
 - "/assets/data/hashtags_green.js"
 - "/assets/data/hashtags_red.js"
 - "/assets/js/hashtags.js"
---

The Green and Red groups represent the two clusters in the network with the greatest structural polarisation. Switch the toggle to see the #Hashtags most associated with each group. Click on a hashtag to see the COP26 tweets associated with that hashtag.

<div class="toggle">
  <span class="green">Green group</span>
  <label class="switch"><input type="checkbox" onclick="Redraw(this)"><span class="slider"></span></label>
  <span class="red">Red group</span>
</div>

<svg id="redCloud" style="display: none">
</svg>
<svg id="greenCloud">
</svg>

### About this visualisation

These word clouds show the 180 hashtags which most often occur in tweets from two ideologically opposed COP26 twitter communities. The size of a hashtag indicates the prevalence of that hashtag within an ideological group.

This ideological opposition is detected automatically by applying community detection methods to the tweet/retweet network prior to COP26 (data from 01/06/2021 to 20/10/2021), and identifying the communities whose interactions exhibit the clearest separation.  Words are coded from red to green, depending on the proportion tweets which contain the hashtag in each of the two ideology groups (the red group and the green group).

Note, for privacy and data protection reasons we do not identify which twitter users fall within each group.

This visualisation was created using Javascript D3 and uses the <a href="https://www.jasondavies.com/wordcloud/" target="_blank">Word cloud</a> package by Jason Davies.

