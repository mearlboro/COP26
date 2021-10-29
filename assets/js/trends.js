"use strict";

var Draw = (function(color) {

  var width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 5;
  width = width > 600 ? width * 0.8 : width - 30;
  width -= 30;
  var height = width * 0.4 - 40;

  // append the svg object to the body of the page
  var svg = d3.select("svg")
    .attr("width",  width  + 20)
    .attr("height", height + 40)
    .append("g")
      .attr("width",  width )
      .attr("height", height)
      .attr("transform", "translate(20, 20)");

  //Read the data
  d3.csv("/assets/data/trend_data.csv", function(data) {
    var parser = d3.timeParse("%Y-%m-%dT%I");

    // group the data by the hashtag
    var sumstat = d3.nest()
      .key((d) => d.hashtag)
      .entries(data);

    var xaxis = d3.scaleLinear()
      .domain(d3.extent(data, (d) => parser(d.date)))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(xaxis).ticks(5).tickFormat(d3.timeFormat("%d %b")));

    var yaxis = d3.scaleLinear()
      .domain([ 0, d3.max(data, (d) => Math.sqrt(d.n)) + 1])
      .range([ height, 0 ])
    svg.append("g")
      .call(d3.axisLeft(yaxis));

    // color palette
    var res = sumstat.map((d) => d.key) // list of group names
    var color = d3.scaleOrdinal()
      .domain(res)
      .range(d3.schemeDark2);

    // Draw the line
    svg.selectAll(".line")
        .data(sumstat)
        .enter()
        .append("path")
          .attr("fill", "none")
          .attr("stroke", (d) => color(d.key))
          .attr("stroke-width", 1)
          .attr("stroke-opacity", 0.5)
          .attr("d", (d) => d3.line()
              .x((d) => xaxis(parser(d.date)))
              .y((d) => yaxis(Math.sqrt(d.n)))
              (d.values)
          );

  })
});

Draw();
