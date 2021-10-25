Draw = (function() {
  var cloud = d3.layout.cloud()
    .size([
      Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 40,
      Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 200 ])
    .words(hashtagData)
    .font('monospace')
    .fontSize((d) => 1.7 * Math.log2(d['value']))
    .on("end", append);

  cloud.start();

  function append(words) {
    var svg = d3.select("#cloud"),
      width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 40,
      height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 200;
    svg.attr("width", width).attr("height", height);

    // colour scale
    var scale = d3.scaleOrdinal(d3.schemeDark2);

    // Draw the word cloud
    svg.append("g")
    .attr("transform", "translate(" +cloud.size()[0] / 2 + "," +cloud.size()[1] / 2 + ")")
    .selectAll("text").data(hashtagData)
      .enter()
      .append("text")
      .text((d) => d.text)
      .style("font-size", (d) => d.size + "px")
      .style("font-family", (d) => d.font)
      .style("fill", (d, i) => scale(i))
      .attr("text-anchor", "middle")
      .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")");
  }
});

Draw();
