"use strict";

var Redraw = (function(e) {
    if (e.checked) {
        document.getElementById('greenCloud').classList.add('hide');
        document.getElementById('redCloud'  ).classList.remove('hide');
    }
    else {
        document.getElementById('greenCloud').classList.remove('hide');
        document.getElementById('redCloud'  ).classList.add('hide');
    }
});

var Draw = (function(colour) {
  var data   = colour === 'red' ? hashtags_red : hashtags_green;
  var elem   = '#' + colour + 'Cloud';

  var width  = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 5,
      height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 200;
  width = width > 600 ? width * 0.8 : width - 30;

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
      let cs = [];
      for (let i = 0.5; i < 1; i += 0.05) {
        cs.push(d3.interpolateYlOrRd(i));
      }
      scale = d3.scaleOrdinal(cs);
    }
    else {
      let cs = [];
      for (let i = 0.7; i < 1; i += 0.03) {
        cs.push(d3.interpolateSpectral(i));
      }
      scale = d3.scaleOrdinal(cs);
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

