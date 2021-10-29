"use strict";

var GetNetwork = (function(size, live) {
    var data;
    if (live) {
        if (size == 150)  data = live_150;
        if (size == 500)  data = live_500;
        if (size == 1500) data = live_1500;
    }
    else {
        if (size == 150)  data = retweets_150;
        if (size == 500)  data = retweets_500;
        if (size == 1500) data = retweets_1500;
    }
    return data;
});

var GetTwitterLink = (function(handle) {
    return '<a href="https://twitter.com/' + handle.slice(1) +
        '" target="_blank">' + handle + '</a>';
});

var GetMostRetweeted = (function(handle, size, live) {
    var data = GetNetwork(size, live);

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
});

var ClosePanel = (function() {
    document.getElementById('panel').classList.add('hide');
});

var OpenPanel = (function(handle, size, live) {
    var user = handle.slice(1)
    document.getElementById('panel_title').innerHTML = handle;

    // add embedded twitter feed for the selected user
    var panel = document.getElementById('panel_content');
    panel.innerHTML = '<a class="twitter-timeline" href="https://twitter.com/' + user + '"></a>';
    var h = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 370;
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
    var links = GetMostRetweeted(handle, size, live);
    links[0].forEach(l => panel.innerHTML += GetTwitterLink(l['name']) + ' (' + l['val'] + ' retweets)<br/>');
    panel.innerHTML += '</p><p>Top users who retweeted this account:<br/>';
    links[1].forEach(l => panel.innerHTML += GetTwitterLink(l['name']) + ' (' + l['val'] + ' retweets)<br/>');
    panel.innerHTML += '</p>';

    document.getElementById('panel').classList.remove('hide');
});


var ToggleLive = (function() {
    var bs = document.querySelectorAll('input[name=size]');
	var size;
	for (var b of bs) {
		if (b.checked) size = b.value; break;
	}

	LoadNetwork(size);
});


var LoadNetwork = (function(size) {
    var live = document.querySelector('#live').checked;
    var data = GetNetwork(size, live),
        scale = d3.scaleOrdinal(d3.schemeDark2);

    var width  = Math.max(document.documentElement.clientWidth  || 0, window.innerWidth  || 0) - 5,
        height = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) - 140;
    width = width > 600 ? width * 0.8 : width - 30;

    var elem = document.querySelector('#graph');
    elem.setAttribute("style", "width:"  + width  + "px");
    elem.setAttribute("style", "height:" + height + "px");
    let Graph = ForceGraph()(elem)
        .graphData(data)
        .backgroundColor("#ffffff")
        .zoom(size == 1500 ? 0.3 : 0.6)
        .width(width)
        .height(height)
        // configure nodes and links
        .nodeColor(n => scale(n.group))
        .nodeVal(n => n.value * 4000.0)
        .linkCurvature(.2)
        // decorate the node
        .nodeCanvasObject((n, ctx, globalScale) => {
          var label = n.name;
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

    if (size != 1500) {
      // particles travelling links indicate link direction
      Graph.linkDirectionalParticles(l => l.value)
        .linkDirectionalParticleSpeed(l => l.value * 0.001)
        .linkDirectionalParticleWidth(3)
    }

    // Spread nodes a little wider
    Graph.d3Force("charge").strength(-900);
    Graph.d3VelocityDecay(0.1)

    ClosePanel();

	if (live) {
		document.querySelector('#updated').innerHTML = "Last update:<br/>" + last_updated;
	}
	else {
		document.querySelector('#updated').innerHTML = '';
	}
});

LoadNetwork(150,  false);
