var width = window.innerWidth;
var height = window.innerHeight;
var svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);

var simulation = d3
  .forceSimulation()
  .force("charge", d3.forceManyBody().strength(-350))
  .force("link", d3.forceLink().distance(100))
  .force("x", d3.forceX(width / 2))
  .force("y", d3.forceY(height / 2))
  .force("collide", d3.forceCollide(20))
  .on("tick", ticked);
var link = svg.selectAll(".link");
var node = svg.selectAll(".node");

function render(data = "data/github_by_year_flattened.json") {
  d3.json(data, data => {
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);

    link = link
      .data(data.links)
      .enter()
      .append("line")
      .attr("class", "link")
      .style("stroke", "#999")
      .style("stroke-width", "1.5px");

    var images = require("../data/images.js");

    node = node
      .data(data.nodes)
      .enter()
      .append("svg:image")
      .attr("xlink:href", d => images[d.name])
      .attr("width", 40)
      .attr("height", 40)
      .attr(
        "class",
        d =>
          d.index !== 0
            ? d.children ? "node parent" : "node leaf"
            : "node root"
      );

    node.exit().remove();
    link.exit().remove();
    node.call(
      d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );
  });
}
function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}
function ticked() {
  link
    .attr("x1", function(d) {
      return d.source.x;
    })
    .attr("y1", function(d) {
      return d.source.y;
    })
    .attr("x2", function(d) {
      return d.target.x;
    })
    .attr("y2", function(d) {
      return d.target.y;
    });

  node.attr(
    "transform",
    d => "translate(" + (d.x - 25) + "," + (d.y - 25) + ")"
  );
}

d3.select("#git").on("click", () => {
  render("data/github_2017.json");
});

d3.select("#so-fav").on("click", () => {
  render("data/s_o_loved.json");
});

render();
