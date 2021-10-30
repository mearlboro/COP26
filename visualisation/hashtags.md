---
layout: home
title: Most popular Hashtags
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

<p class="text-center"> The Green and Red groups represent the two clusters in the retweet network with the greatest structural polarisation. 
Switch the toggle to see the #Hashtags most associated with each group. 
Click on a hashtag to see the associated COP26 tweets. </p>

<div class="toggle text-center">
  <span class="green">Green group</span>
  <label class="switch"><input type="checkbox" onclick="Redraw(this)"><span class="slider"></span></label>
  <span class="red">Red group</span>
</div>

<svg id="redCloud"   class="center hide"></svg>
<svg id="greenCloud" class="center"></svg>

### About this visualisation

The 180 hashtags that most often occur in tweets from two ideologically opposed COP26 Twitter communities. The size of a hashtag indicates the prevalence of that hashtag within an ideological group.

Ideological opposition is detected automatically by applying community detection methods to the retweet network prior to COP26 (data from 01/06/2021 to 20/10/2021), and identifying the communities whose interactions exhibit the clearest separation. Note, for privacy and data protection reasons we do not identify which twitter users fall within each group.

This visualisation was created using Javascript D3 and uses the <a href="https://www.jasondavies.com/wordcloud/" target="_blank">Word cloud</a> package by Jason Davies.

