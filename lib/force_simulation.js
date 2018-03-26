const width = window.innerWidth;
const height = window.innerHeight;

const label = d3
  .select("#label")
  .attr("class", "tooltip")
  .style("opacity", 0);

const svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);

const simulation = d3
  .forceSimulation()
  .force("charge", d3.forceManyBody().strength(-250))
  .force("link", d3.forceLink().distance(100))
  .force("x", d3.forceX(width / 2))
  .force("y", d3.forceY(height / 2))
  .force("collide", d3.forceCollide(25))
  .on("tick", ticked);

let link = svg.selectAll(".link");
let node = svg.selectAll(".node");

var data = require("../assets/so_data.js");

function render(data) {
  simulation.nodes(data.nodes);
  simulation.force("link").links(data.links);

  link = link
    .data(data.links)
    .enter()
    .append("line")
    .filter(d => !d.invis)
    .attr("class", "link")
    .style("stroke", "#999")
    .style("stroke-width", "0.3");

  node = node
    .data(data.nodes)
    .enter()
    .append("g")
    .attr(
      "class",
      d =>
        d.index !== 0 ? (d.parent ? "node parent" : "node leaf") : "node root"
    );

  var images = require("../assets/images.js");
  const img = node
    .filter(".leaf")
    .append("image")
    .attr("xlink:href", d => images[d.name])
    .attr("width", 50)
    .attr("height", 50)
    .on("mouseover", function(d) {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("height", 120)
        .attr("width", 120)
        .on("end", d => tip(d));
      this.parentElement.parentElement.append(this.parentElement);
    })
    .on("mouseleave", function(d) {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("height", 40)
        .attr("width", 40);
      hideTip();
    });

  // const rootHeader = node
  //   .filter(".root")
  //   .append("text")
  //   .text("What's in your stack?")
  //   .style("text-anchor", "middle");
  //
  // rootHeader.attr("transform", "translate(100, 100)");

  const parentText = d3
    .selectAll(".parent")
    .append("text")
    .attr("width", 40)
    .attr("height", 40)
    .text(d => d.name)
    .style("text-anchor", "middle");

  const circle = d3
    .selectAll(".parent")
    .append("circle")
    .attr("r", Math.floor(Math.random() * (60 - 80 + 1) + 80))
    .attr("opacity", 0.4)
    .on("mouseenter", function() {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("r", 120);
    })
    .on("mouseleave", function(d) {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("r", Math.floor(Math.random() * (60 - 80 + 1) + 80));
    });

  // node.exit().remove();
  // link.exit().remove();
  // node.call(
  //   d3
  //     .drag()
  //     .on("start", dragstarted)
  //     .on("drag", dragged)
  //     .on("end", dragended)
  // );
}

function tip(node) {
  label
    .style("opacity", 1)
    .html(node.name)
    .style("top", node.y + 35 + "px")
    .style("left", node.x + "px");
}

function hideTip() {
  label.style("opacity", 0);
}

// function dragstarted(d) {
//   hideTip();
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }
//
// function dragged(d) {
//   hideTip();
//   d.fx = d3.event.x;
//   d.fy = d3.event.y;
// }
//
// function dragended(d) {
//   if (!d3.event.active) simulation.alphaTarget(0);
//   d.fx = null;
//   d.fy = null;
// }

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

render(data);
