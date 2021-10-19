
function LoadMap(error, topo) {
  var svg = d3.select("#map"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  // Map, projection, colour scale
  var path = d3.geoPath();
  var projection = d3.geoMercator()
    .scale(200)
    .center([10,40])
    .translate([width / 2, height / 2]);
  var scale = d3.scaleThreshold()
    .domain([4, 16, 64, 256, 1024, 4096, 16384])
    .range(d3.schemeOrRd[8]);

  // Add tooltip
  const tooltip = d3.select("body").append("div").attr("class", "tooltip").style("opacity", 0);

  let mouseOver = function(d) {
    d3.selectAll(".Country")
      .transition().duration(200).style("opacity", .5).style("stroke", "transparent");
    d3.select(this)
      .transition().duration(200).style("opacity",  1).style("stroke", "black");
    tooltip.style("left", (d3.event.pageX + 15) + "px")
      .style("top", (d3.event.pageY - 28) + "px")
      .transition().duration(400)
      .style("opacity", 1)
      .text(d.id + ': ' + mapData.get(d.id));
  }
  let mouseLeave = function() {
    d3.selectAll(".Country")
      .transition().duration(200).style("opacity", 1).style("stroke", "transparent");
    tooltip.transition().duration(300).style("opacity", 0)
  }

  // Draw each country on the map and add mouse functions
  svg.append("g").selectAll("path").data(topo.features)
    .enter()
    .append("path")
    .attr("d", d3.geoPath().projection(projection))
    .attr("fill", d => scale(mapData.get(d.id) || 0))
    .attr("data-name", d => d.properties.code)
    .attr("id", d => d.id)
    .attr("class", d => "Country")
    .on("mouseover", mouseOver)
    .on("mouseleave", mouseLeave);

  // Draw a legend
  const legend = svg.append("g").attr("id", "legend");
  const legend_entry = legend.selectAll("g.legend")
    .data(scale.range().map(d => {
      d = scale.invertExtent(d);
      if (d[0] == null) d[0] = 1;
      return d;
    }))
    .enter().append("g").attr("class", "legend_entry");
  legend_entry.append("rect").attr("x", 20).attr("y", (d, i) => height - (i * 20) - 40)
    .attr("width", 20).attr("height", 20).style("fill", d => scale(d[0]));
  legend_entry.append("text").attr("x", 50).attr("y", (d, i) => height - (i * 20) - 26)
    .text((d, i) => d[1] ? (d[0] + "-" + d[1]) : ("> " + d[0]));

}

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

var mapData = d3.map();
d3.queue()
  .defer(d3.json, "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
  .defer(d3.csv, "/assets/data/country_counts.csv", d => mapData.set(d.code, +d.count))
  .await(LoadMap);

var cloud = d3.layout.cloud()
  .size([1200,600])
    .words(hashtagData)
  .font('monospace')
    .fontSize((d) => 1.5 * Math.log2(d['value']))
  .on("end", DrawCloud);
cloud.start();
