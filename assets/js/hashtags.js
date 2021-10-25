"use strict";

var Redraw = (function(e) {
    document.getElementById('greenCloud').style.display = e.checked ? 'none'  : 'block';
    document.getElementById('redCloud'  ).style.display = e.checked ? 'block' : 'none';
});

var Draw = (function(colour) {
  var data   = colour === 'red' ? hashtags_red : hashtags_green;
  var elem   = '#' + colour + 'Cloud';
  var width  = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 40;
  var height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 200;

  const cloud = d3.layout.cloud()
    .size([ width, height ])
    .words(data)
    .font('monospace')
    // the two datasets have different scales
    .fontSize((d) => colour === 'green'
                   ? 1.7 * Math.log2(d['value'])
                   : 30  * Math.log10(d['value']))
    .on("end", append);

  cloud.start();

  function append(words) {
    var svg = d3.select(elem);
    svg.attr("width", width).attr("height", height);

    // colour scale
    var scale;
    if (colour === 'red') {
      scale = d3.scaleOrdinal(d3.schemeRdGy[9]);
    }
    else {
      scale = d3.scaleOrdinal(d3.schemePuBuGn[9]);
    }

    // Draw the word cloud
    svg.append("g")
    .attr("transform", "translate(" +cloud.size()[0] / 2 + "," +cloud.size()[1] / 2 + ")")
    .selectAll("text").data(words)
      .enter()
      .append("text")
      .style("font-size", (d) => d.size + "px")
      .style("font-family", (d) => d.font)
      .style("fill", (d, i) => scale(i))
      .style("cursor", "pointer")
      .attr("text-anchor", "middle")
      .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")")
      .text((d) => d.text)
      .on("click", d => window.open('https://twitter.com/search?q=cop26%20%23' + d.text.slice(1)));
  }
});

Draw('green');
Draw('red');

