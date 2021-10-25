
var GetNetwork = function(size, live) {
    if (live) {
        if (size == 150)  data = retweets_150;
        if (size == 500)  data = retweets_500;
        if (size == 1500) data = retweets_1500;
    }
    else {
        if (size == 150)  data = retweets_150;
        if (size == 500)  data = retweets_500;
        if (size == 1500) data = retweets_1500;
    }
    return data;
}

var GetTwitterLink = function(handle) {
    return '<a href="https://twitter.com/' + handle.slice(1) +
        '" target="_blank">' + handle + '</a>';
}

var GetMostRetweeted = function(handle, size, live) {
    data = GetNetwork(size, live);

    var sorted_to = data['links']
        .filter(l => l.source['name'] === handle)
        .sort((l1, l2) => l2['value'] - l1['value']);
    if (sorted_to.length > 3) {
        sorted_to = sorted_to.slice(0,3);
    }
    sorted_to = sorted_to.map(l => {
        return { 'name': l.target['name'], 'val': l.value }
    });

    var sorted_from = data['links']
        .filter(l => l.target['name'] === handle)
        .sort((l1, l2) => l2['value'] - l1['value']);
    if (sorted_from.length > 3) {
        sorted_from = sorted_from.slice(0,3);
    }
    sorted_from = sorted_from.map(l => {
        return { 'name': l.source['name'], 'val': l.value }
    });

    return [ sorted_to, sorted_from ];
}

var ClosePanel = function() {
    document.getElementById('panel').classList.add('hide');
}

var OpenPanel = function(handle, size, live) {
    var user = handle.slice(1)
    document.getElementById('panel_title').innerHTML = handle;

    // add embedded twitter feed for the selected user
    var panel = document.getElementById('panel_content');
    panel.innerHTML = '<a class="twitter-timeline" href="https://twitter.com/' + user + '"></a>';
    var h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 385;
    console.log(h);
    twttr.widgets.createTimeline({
            sourceType: "profile",
            screenName: user
        }, panel, {
            dnt: true,
            height: h,
            chrome: 'transparent'
        }
    );

    // add most retweeted by user and who retweeted user most
    panel.innerHTML += '<p>Top users retweeted by this account:<br/>';
    links = GetMostRetweeted(handle, size, live);
    links[0].forEach(l => panel.innerHTML += GetTwitterLink(l['name']) + ' (' + l['val'] + ' retweets)<br/>');
    panel.innerHTML += '</p><p>Top users who retweeted this account:<br/>';
    links[1].forEach(l => panel.innerHTML += GetTwitterLink(l['name']) + ' (' + l['val'] + ' retweets)<br/>');
    panel.innerHTML += '</p>';

    document.getElementById('panel').classList.remove('hide');
}

var GetHelp = function() {
    var about_text = "";

    document.getElementById('panel_title').innerHTML = 'About this visualisation';
    document.getElementById('panel_content').innerHTML = about_text;

    document.getElementById('panel').classList.remove('hide');
}

var LoadNetwork = function(size, live) {
    data = GetNetwork(size, live);
    scale = d3.scaleOrdinal(d3.schemeDark2);

    const Graph = ForceGraph()(
      document.getElementById("graph"))
        .graphData(data)
        .backgroundColor("#ffffff")
        .zoom(0.6)
        .width(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 40)
        .height(Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 140)
        // configure nodes
        .nodeColor(n => scale(n.group))
        .nodeVal(n => n.value * 4000.0)
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

    ClosePanel();
}

LoadNetwork(150, false);
