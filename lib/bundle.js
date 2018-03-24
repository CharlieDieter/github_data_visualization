/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var centered;

var width = 1280;
var height = 800;

var getLinks = function getLinks(data) {};

var svg = d3.select("#canvas").attr("width", width).attr("height", height),
    margin = 20,
    diameter = width;
var canvas = svg.attr("transform", "translate(" + 2 + "," + 2 + ")");

var getRoot = function getRoot(data) {
  return d3.hierarchy(data).sum(function (d) {
    return d.instances;
  }).sort(function (a, b) {
    return b.value - a.value;
  });
};

function render() {
  var jsonURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "data/github_2017.json";

  d3.json(jsonURL, function (data) {
    canvas.selectAll("text").remove();

    var pack = d3.pack().size([width, height]).padding(10);

    var root = getRoot(data);
    var simulation = d3.forceSimulation().force("link", d3.forceLink().links(data)).force("center", d3.forceCenter(width / 2, height / 2));

    var nodes = pack(root).descendants();

    var node = canvas.selectAll(".node").data(nodes);

    var circles = canvas.append("g").selectAll("circle").data(nodes);

    canvas.selectAll(".lang").exit().remove();

    var enteringCircles = circles.enter().append("g").attr("class", function (d) {
      return d.parent ? d.children ? "node lang" : "node language leaf" : "node root";
    }).attr("transform", function (d) {
      return "translate(" + d.x + "," + d.y + ")";
    }).append("circle").attr("opacity", 0.2);

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

    var icons = canvas.selectAll("svg").data(nodes).enter();

    var enteringIcons = canvas.selectAll(".lang").append("svg:image").attr("xlink:href", function (d) {
      return d.data.img;
    }).attr("width", 0).attr("height", 0).transition().duration(2500).attr("width", function (d) {
      return d.r;
    }).attr("height", function (d) {
      return d.r;
    }).attr("transform", function (d) {
      return "translate(" + -d.r / 2 + "," + -d.r / 2 + ")";
    });

    circles.merge(enteringCircles).transition().duration(2000).attr("x", function (d) {
      return d.x;
    }).attr("y", function (d) {
      return d.y;
    }).attr("r", function (d) {
      return d.r;
    });
  });
}

d3.select("#git").on("click", function () {
  d3.selectAll("circle").transition().duration(2000).attr("r", 0);

  render("data/github_2017.json");
});

d3.select("#so-pop").on("click", function () {
  d3.selectAll("circle").transition().duration(2000).attr("r", 0);

  render("data/s_o_popular.json");
});

d3.select("#so-fav").on("click", function () {
  d3.selectAll("circle").transition().duration(2000).attr("r", 0);

  render("data/s_o_loved.json");
});

d3.select("#so-hate").on("click", function () {
  d3.selectAll("circle").transition().duration(2000).attr("r", 0);

  render("data/s_o_hated.json");
});
d3.select("#so-sal-us").on("click", function () {
  d3.selectAll("circle").transition().duration(2000).attr("r", 0);

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map