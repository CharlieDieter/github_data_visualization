var centered;

var width = 1280;
var height = 800;

// const height = 950;
// const width = 950;
// debugger;
const canvas = d3
    .select("#canvas")
    .attr("width", width)
    .attr("height", height),
  margin = 20,
  diameter = width,
  g = canvas.append("g").attr("transform", "translate(" + 2 + "," + 2 + ")");

d3.json("data/by_year.json", root => {
  const pack = d3
    .pack()
    .size([width, height])
    .padding(10);
  root = d3
    .hierarchy(root)
    .sum(d => d.instances)
    .sort((a, b) => b.value - a.value);

  const nodes = pack(root).descendants();

  const circle = g
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr(
      "class",
      d =>
        d.parent
          ? d.children ? "node year" : "node language leaf"
          : "node root"
    )
    .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
    .style("opacity", "0.5")
    .style("fill", "blue")
    .attr("r", d => d.r)
    .on("click", (d, i) => clicked(d, i));

  const node = g.selectAll("circle");
});
const clicked = (d, i) => {
  if (d !== centered) {
    canvas
      // .selectAll("circle")
      .filter((d, idx) => idx === i)
      .transition()
      .duration(2500)
      .attr("transform", "translate(" + d.x / 2 + "," + d.y / 2 + ")");
  }
};

// FOR FIXED YEAR CIRCLE WIDTH calculate radius of leaves as % of year circle
// return d.parent
//   ? d.children ? d.parent.r / 3 : d.r / d.parent.r * 100
//   : d.r;
