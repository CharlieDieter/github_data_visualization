var width = 1280;
var height = 800;

const simulation = d3
  .forceSimulation(nodes)
  .force("charge", d3.forceManyBody())
  .force("center", d3.forceCenter(width / 2, height / 2))
  .on("tick", ticked);

const ticked = () => {
  const circles = d3
    .select("#canvas")
    .selectAll("circle")
    .data(nodes);

  circles
    .enter()
    .append("circle")
    .attr("r", 10)
    .merge(circles)
    .attr("cx", d => d.x)
    .attr("cy", d => d.y);

  circles.exit.remove();
};
