"use strict";

var GetData = (function(username, level) {
    var root = graph_data['nodes'].filter(
      n => n.name.toLowerCase() === username.toLowerCase())[0];
    if (!root) return 0;

    var id = root.id

    // get all links containing this node and their node ids
    var dir_links = graph_data['links'].filter(
        l => l['source'] === id || l['target'] == id);
    var dir_ids = dir_links.map(
      l => l['source'] === id ? l['target'] : l['source']);
    // get all links between the direct neighbours
    var indir_links = graph_data['links'].filter(
      l => dir_ids.includes(l['source']) && dir_ids.includes(l['target']))

    var nodes = graph_data['nodes'].filter(n => dir_ids.includes(n.id) || id === n.id);

    var community_filt = nodes.filter(n => n['group'][level] === root['group'][level])
      .map(n => n.name)

    var data = {
        'nodes': nodes,
        'links': dir_links.concat(indir_links),
        'table': community_filt
    };
    return(data);
});

var LoadEgo = (function(username, level) {
    var data = GetData(username, level),
        scale = d3.scaleOrdinal(d3.schemeDark2);

    if (!data) {
      document.querySelector('#message').innerHTML = "Account not in our community database.";
      return;
    }
    if (data['nodes'].length > 300) {
      document.querySelector('#message').innerHTML = "Account related to " + data['nodes'].length + " users with more than 10 thousand followers, which can be previewed on the <a href="/">network visualisation.</a>";
      return;
    }

    var width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
        size = (width > 600) ? (width/ 2 - 10) : (width - 20);

    var elem = document.querySelector('#table')
    elem.setAttribute("style", "width:"  + size + "px");
    elem.setAttribute("style", "height:" + size + "px");
    var elem = document.querySelector('#table p')
    elem.innerHTML += level + '</br></br>';
    elem.innerHTML += data['table'].map(
      n => '<a href="https://twitter.com/' + n.split(1) + '" target="_blank">' + n + '</a>')
     .join('<br/>')
    elem.setAttribute("style", "display: block");
    console.log(elem);

    elem = document.querySelector('#graph')
    elem.setAttribute("style", "width:"  + size + "px");
    elem.setAttribute("style", "height:" + size + "px");
    const Graph = ForceGraph()(elem)
        .graphData({ 'nodes': data['nodes'], 'links': data['links'] })
        .backgroundColor("#ffffff")
        .width(size)
        .height(size)
        .zoom(0.8)
        // configure nodes
        .nodeColor(n => scale(n.group[level]))
        .nodeVal(n => n.value * 100000.0)
        // configure links, particles travelling links indicate link direction
        .linkCurvature(.2)
        .linkDirectionalParticles(l => l.value)
        .linkDirectionalParticleSpeed(l => l.value * 0.001)
        .linkDirectionalParticleWidth(3)
        // decorate the node
        .nodeCanvasObject((n, ctx, globalScale) => {
          const label = n.name;
          ctx.font =  (Math.pow(2, 1 + n.value * 20) * 10).toString() + 'px monospace';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.strokeText(label, n.x, n.y + 12);
          ctx.fillStyle = n.color;
          ctx.fillText(label, n.x, n.y + 12);
        })
        .nodeCanvasObjectMode(() => 'after')
        // node remains in position after dragging
        .onNodeDragEnd(node => {
          node.fx = node.x;
          node.fy = node.y;
        })
        // show panel on node click
        .onNodeClick(n => OpenPanel(n.name, size, live))

    // Spread nodes a little wider
    Graph.d3Force("charge").strength(-900);
    Graph.d3VelocityDecay(0.1)

});

var UserSearch = (function() {
    var user = document.querySelector('input').value
    LoadEgo(user, 1)
});

var LuckySearch = (function() {
    var users = [ '@CarolineLucas', '@NetZeroWatch', '@GretaThunberg',
        '@ExtinctionR', '@BBCNews' ]
    var rand = Math.floor(Math.random() * users.length);
    LoadEgo(users[rand], 1);
});

var Draw = (function() {
  var svg = d3.select("#circles");
  var margin = 20,
    diameter = Math.min(1000,
        Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)) - 40;
  svg.attr("width", diameter).attr("height", diameter)

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
      .text(d => { return isNaN(d.data.name) ? "@" + d.data.name : "" });

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
