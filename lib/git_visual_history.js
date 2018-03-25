var centered;

var width = 1280;
var height = 800;

const getLinks = data => {};

const svg = d3
    .select("#canvas")
    .attr("width", width)
    .attr("height", height),
  margin = 20,
  diameter = width;
const canvas = svg.attr("transform", "translate(" + 2 + "," + 2 + ")");

const getRoot = data => {
  return d3
    .hierarchy(data)
    .sum(d => d.instances)
    .sort((a, b) => b.value - a.value);
};

function render(jsonURL = "data/github_2017.json") {
  d3.json(jsonURL, data => {
    canvas.selectAll("text").remove();

    const pack = d3
      .pack()
      .size([width, height])
      .padding(10);

    const root = getRoot(data);

    const nodes = pack(root).descendants();

    const node = canvas.selectAll(".node").data(nodes);

    const circles = canvas
      .append("g")
      .selectAll("circle")
      .data(nodes);

    canvas
      .selectAll(".lang")
      .exit()
      .remove();

    const enteringCircles = circles
      .enter()
      .append("g")
      .attr(
        "class",
        d =>
          d.parent
            ? d.children ? "node lang" : "node language leaf"
            : "node root"
      )
      .attr("transform", d => "translate(" + d.x + "," + d.y + ")")
      .append("circle")
      .attr("opacity", 0.2);

    // const text = canvas
    //   .selectAll("text")
    //   .data(nodes)
    //   .enter();
    //
    // const enteringText = canvas
    //   .selectAll(".lang")
    //   .append("text")
    //   .style("text-anchor", "middle")
    //   .text(d => d.data.name);

    const icons = canvas
      .selectAll("svg")
      .data(nodes)
      .enter();

    const enteringIcons = canvas
      .selectAll(".lang")
      .append("svg:image")
      .attr("xlink:href", d => d.data.img)
      .attr("width", 0)
      .attr("height", 0)
      .transition()
      .duration(2500)
      .attr("width", d => d.r)
      .attr("height", d => d.r)
      .attr("transform", d => "translate(" + -d.r / 2 + "," + -d.r / 2 + ")");

    circles
      .merge(enteringCircles)
      .transition()
      .duration(2000)
      .attr("x", function(d) {
        return d.x;
      })
      .attr("y", function(d) {
        return d.y;
      })
      .attr("r", d => d.r);
  });
}

d3.select("#git").on("click", () => {
  d3
    .selectAll("circle")
    .transition()
    .duration(2000)
    .attr("r", 0);

  render("data/github_2017.json");
});

d3.select("#so-pop").on("click", () => {
  d3
    .selectAll("circle")
    .transition()
    .duration(2000)
    .attr("r", 0);

  render("data/s_o_popular.json");
});

d3.select("#so-fav").on("click", () => {
  d3
    .selectAll("circle")
    .transition()
    .duration(2000)
    .attr("r", 0);

  render("data/s_o_loved.json");
});

d3.select("#so-hate").on("click", () => {
  d3
    .selectAll("circle")
    .transition()
    .duration(2000)
    .attr("r", 0);

  render("data/s_o_hated.json");
});
d3.select("#so-sal-us").on("click", () => {
  d3
    .selectAll("circle")
    .transition()
    .duration(2000)
    .attr("r", 0);

  render("data/s_o_salary_us.json");
});
render();
// d3.select("#git").on("click", () => {
//   render("data/2017_github.json");
// });
//
// d3.select("#s").on("click", () => {
//   console.log("hi");
//   render("data/by_year.json");
// });
// function engage(json = "data/2017_github.json") {
//   d3.json(json, data => {
//     var diameter = 1000,
//       format = d3.format(",d"),
//       diffsize = true,
//       circleMin = 100,
//       circleMax = 5000000,
//       idCounter = data.length;
//
//     var svg = d3
//       .select("#canvas")
//       .attr("width", 1000)
//       .attr("height", 1000)
//       .append("svg")
//       .attr("width", 1000)
//       .attr("height", 1000);
//
//     // d3.select("#git").append("button");
//
//     var root;
//     var stratify = d3
//       .stratify()
//       .id(function(d) {
//         debugger;
//         return d.id;
//       })
//       .parentId(function(d) {
//         debugger;
//         return d.parent;
//       });
//
//     var pack = d3.pack().size([diameter - 4, diameter - 4]);
//
//     var vis, titles, circles;
//
//     const getRoot = data => {
//       return d3
//         .hierarchy(data)
//         .sum(d => d.instances)
//         .sort((a, b) => b.value - a.value);
//     };
//
//     // Munch some data into the children array
//     function updateData() {
//       data.push({
//         name: "Leaf",
//         synthetic: true,
//         size: Math.floor(Math.random() * circleMax) + circleMin,
//         id: idCounter++,
//         parent: 0
//       });
//     }
//
//     // Visualization render
//     function render(root) {
//       var packedNodes = pack(root);
//       var children = packedNodes.leaves();
//
//       var circles = svg.selectAll("circle").data(children, function(d) {
//         return d.id;
//       });
//
//       // entering
//       var entering = circles.enter().append("circle");
//       entering.exit().remove();
//       // existing, before rest
//       circles.style("fill", "white");
//
//       entering
//         .style("fill", "lightgrey")
//         .style("stroke", "black")
//         .attr("cx", function(d) {
//           return d.x;
//         })
//         .attr("cy", function(d) {
//           return d.y;
//         });
//
//       circles
//         .merge(entering)
//         .transition()
//         .duration(1000)
//         .attr("r", function(d) {
//           return d.r;
//         });
//     }
//     render(getRoot(data));
//     d3.select("#git").on("click", () => {
//       d3.selectAll("svg > *").remove();
//       const getRoot = data => {
//         debugger;
//         return d3
//           .hierarchy(data)
//           .sum(d => d.instances)
//           .sort((a, b) => b.value - a.value);
//       };
//       engage("data/2017_github.json");
//     });
//
//     d3.select("#s").on("click", () => {
//       console.log("hi");
//       d3.selectAll("svg > *").remove();
//       const getRoot = data => {
//         return d3
//           .hierarchy(data)
//           .sum(d => d.instances)
//           .sort((a, b) => b.value - a.value);
//       };
//       engage("data/by_year.json");
//     });
//   });
// }
//
// engage();
