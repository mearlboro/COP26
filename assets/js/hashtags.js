function DrawCloud(words) {
  var svg = d3.select("#cloud"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  // colour scale
  var fill = d3.scaleOrdinal(d3.schemeCategory20);

  // Draw the word cloud
  svg.append("g")
  .attr("transform", "translate(" +cloud.size()[0] / 2 + "," +cloud.size()[1] / 2 + ")")
  .selectAll("text").data(hashtagData)
    .enter()
    .append("text")
    .text((d) => d.text)
    .style("font-size", (d) => d.size + "px")
    .style("font-family", (d) => d.font)
    .style("fill", (d, i) => fill(i))
    .attr("text-anchor", "middle")
    .attr("transform", (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")");
}

var cloud = d3.layout.cloud()
  .size([1200,600])
    .words(hashtagData)
  .font('monospace')
    .fontSize((d) => 1.5 * Math.log2(d['value']))
  .on("end", DrawCloud);
cloud.start();
