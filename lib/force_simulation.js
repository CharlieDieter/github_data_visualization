const data = require("../assets/so_data.js");
const images = require("../assets/images.js");
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3
  .select("svg")
  .attr("width", width)
  .attr("height", height);

const simulation = d3
  .forceSimulation()
  .force("charge", d3.forceManyBody().strength(-350))
  .force("link", d3.forceLink().distance(120))
  .force("x", d3.forceX(width / 2 + 100))
  .force("y", d3.forceY(height / 2))
  .force("collide", d3.forceCollide(25))
  .on("tick", ticked);

const label = d3
  .select("#label")
  .attr("class", "tooltip")
  .style("opacity", 0);

let link = svg.selectAll(".link");
let node = svg.selectAll(".node");

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
    .attr("height", 100)
    .attr("width", 100)
    .attr(
      "class",
      d =>
        d.index !== 0 ? (d.parent ? "node parent" : "node leaf") : "node root"
    );

  const img = node
    .filter(".leaf")
    .append("image")
    .attr("xlink:href", d => images[d.name])
    .attr("width", 40)
    .attr("height", 40)
    .attr("opacity", 0.9)
    .on("mouseover", function(d) {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("height", 100)
        .attr("width", 100)
        .attr("opacity", 1)
        .on("end", d => tip(d));
      this.parentElement.parentElement.append(this.parentElement);
    })
    .on("mouseleave", function(d) {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("height", 50)
        .attr("width", 50)
        .attr("opacity", 0.9);
      hideTip();
    });

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
    .attr("r", 80)
    .attr("opacity", 0.4)
    .on("mouseenter", function() {
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("r", 120);
      d3
        .select(this.parentElement.children[0])
        .transition()
        .duration(1000)
        .attr("font-size", "30px");
    })
    .on("mouseleave", function(d) {
      d3
        .select(this.parentElement.children[0])
        .transition()
        .duration(1000)
        .attr("font-size", "15px");
      d3
        .select(this)
        .transition()
        .duration(1000)
        .attr("r", 80);
    });
  // removal on exit for data updates in the future
  // node.exit().remove();
  // link.exit().remove();
  node.call(
    d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
  );
}

function tip(node) {
  label
    .style("opacity", 1)
    .html(node.name)
    .style("top", node.y + 60 + "px")
    .style("left", node.x + "px");

  let percent = node.instances < 100 ? "%" : "";
  label
    .append("div")
    .html(node.instances + percent)
    .attr("class", "blurb-number");
  label
    .append("div")
    .html(node.blurb)
    .attr("class", "blurb-body");
}

function hideTip() {
  label.style("opacity", 0);
}

function dragstarted(d) {
  hideTip();
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  hideTip();
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

render(data);
