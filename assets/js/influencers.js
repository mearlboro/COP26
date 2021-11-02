"use strict";

var Draw = (function() {

  var data = live_1500;
  data = data['nodes'].slice(1,50);
  for (var i = 0; i < data.length; i++) {
    data[i]['rank'] = i + 1;
  }

  var size = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 5;
  size = size > 600 ? size * 0.8 : size - 30;

  var chart = BubbleChart(data, {
    label: d => d.name,
    value: d => d.value,
    group: d => d.group,
    title: d => d.name,
    link: d => `https://twitter.com/${d.name.slice(1)}`,
  })

  // Copyright 2021 Observable, Inc.
  // Released under the ISC license.
  // https://observablehq.com/@d3/bubble-chart
  function BubbleChart(data, {
    name = ([x]) => x, // alias for label
    label = name, // given d in data, returns text to display on the bubble
    value = ([, y]) => y, // given d in data, returns a quantitative size
    group, // given d in data, returns a categorical value for color
    title, // given d in data, returns text to show on hover
    link, // given a node d, its link (if any)
    linkTarget = "_blank", // the target attribute for links, if any
    width = size, // outer width, in pixels
    height = size, // outer height, in pixels
    padding = 3, // padding between circles
    margin = 1, // default margins
    marginTop = margin, // top margin, in pixels
    marginRight = margin, // right margin, in pixels
    marginBottom = margin, // bottom margin, in pixels
    marginLeft = margin, // left margin, in pixels
    groups, // array of group names (the domain of the color scale)
    fill = "#ccc", // a static fill color, if no group channel is specified
  } = {}) {
    // Compute the values.
    const D = d3.map(data, d => d);
    const V = d3.map(data, value);
    const G = group == null ? null : d3.map(data, group);
    const I = d3.range(V.length).filter(i => V[i] > 0);

    // Unique the groups.
    if (G && groups === undefined) groups = I.map(i => G[i]);
    groups = G && new d3.InternSet(groups);

    // Construct scales.
    const color = G && d3.scaleOrdinal(d3.schemeDark2);

    // Compute labels and titles.
    const L = label == null ? null : d3.map(data, label);
    const T = title === undefined ? L : title == null ? null : d3.map(data, title);

    // Compute layout: create a 1-deep hierarchy, and pack it.
    const root = d3.pack()
        .size([width - marginLeft - marginRight, height - marginTop - marginBottom])
        .padding(padding)
      (d3.hierarchy({children: I})
        .sum(i => V[i]));

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("viewBox", [-marginLeft, -marginTop, width, height])
        .attr("fill", "#fff");

    const leaf = svg.selectAll("a")
      .data(root.leaves())
      .join("a")
        .attr("xlink:href", link == null ? null : (d, i) => link(D[d.data], i, data))
        .attr("target", link == null ? null : linkTarget)
        .attr("transform", d => `translate(${d.x},${d.y})`);

    leaf.append("circle")
        .attr("fill", G ? d => color(G[d.data]) : fill == null ? "none" : fill)
        .attr("r", d => d.r);

    if (T) leaf.append("title")
        .text(d => T[d.data]);

    if (L) {
      // A unique identifier for clip paths (to avoid conflicts).
      const uid = `O-${Math.random().toString(16).slice(2)}`;

      leaf.append("clipPath")
          .attr("id", d => `${uid}-clip-${d.data}`)
        .append("circle")
          .attr("r", d => d.r);

      leaf.append("text")
          .attr("clip-path", d => `url(${new URL(`#${uid}-clip-${d.data}`, location)})`)
        .selectAll("tspan")
        .data(d => `${L[d.data]}`.split(/\n/g))
        .join("tspan")
          .attr("x", 0)
          .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
          .text(d => d);
    }

    return Object.assign(svg.node(), {scales: {color}});
  }
});

Draw();
