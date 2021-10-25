Draw = (function() {
  var svg = d3.select("#circles");

  var margin = 20,
    diameter = Math.min(1000,
        Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)) - 40;

  var g = svg.append("g")
    .attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");
  var color = d3.scaleLinear().range(d3.schemeSpectral[8]);

  var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

  d3.json("/assets/data/hierarchies.json", function(error, root) {
    if (error) throw error;

    root = d3.hierarchy(root)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);

    var focus = root,
      nodes = pack(root).descendants(),
      view;

    var circle = g.selectAll("circle").data(nodes)
      .enter().append("circle")
      .attr("class", d => d.parent ? d.children ? "node" : "node node--leaf" : "node node--root")
      .style("fill", d => d.children ? color(d.depth - 1) : null)
      .on("click",   d => { if (focus !== d) zoom(d), d3.event.stopPropagation() } );

    var text = g.selectAll("text").data(nodes)
      .enter().append("text")
      .attr("class", "label")
      .style("display", d => d.parent === root  ? "inline" : "none")
      .text(d => { return isNaN(d.data.name) ? d.data.name : "" });

    var node = g.selectAll("circle,text");

    svg.on("click", function() { zoom(root); });

    zoomTo([root.x, root.y, root.r * 2 + margin]);

    function zoom(d) {
      var focus0 = focus; focus = d;

      var transition = d3.transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

      transition.selectAll("text")
        .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
          .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
          .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
    }

    function zoomTo(v) {
      var k = diameter / v[2]; view = v;
      node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
      circle.attr("r", function(d) { return d.r * k; });
    }
  });
});

Draw();
