import * as d3 from "d3";

const height = 950,
  width = 950;

const canvas = d3
  .select("#canvas")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(50, 50)");

const pack = d3.layout
  .pack()
  .size([width, height - 50])
  .padding(10);

d3.json("language_data.json", data => {
  const nodes = pack.nodes(data);
  console.log(nodes);
});
