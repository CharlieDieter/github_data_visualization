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


var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");
var simulation = d3.forceSimulation().force("charge", d3.forceManyBody().strength(-2000)).force("link", d3.forceLink().distance(150)).force("x", d3.forceX(width / 2)).force("y", d3.forceY(height / 2)).on("tick", ticked);

var link = svg.selectAll(".link");
var node = svg.selectAll(".node");
function render() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "data/github_2017.json";

  d3.json(data, function (data) {
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);

    link = link.data(data.links).enter().append("line").attr("class", "link").style("stroke", "#999").style("stroke-width", "1.5px");

    node = node.data(data.nodes).enter().append("svg:image").attr("xlink:href", function (d) {
      return d.img;
    }).attr("width", 60).attr("height", 60).attr("class", "node");

    node.exit().remove();
    link.exit().remove();
    // node.call(
    //   d3
    //     .drag()
    //     .on("start", dragstarted)
    //     .on("drag", dragged)
    //     .on("end", dragended)
    // );
  });
}
// function dragstarted(d) {
//   if (!d3.event.active) simulation.alphaTarget(0.3).restart();
//   d.fx = d.x;
//   d.fy = d.y;
// }
//
// function dragged(d) {
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
  link.attr("x1", function (d) {
    return d.source.x;
  }).attr("y1", function (d) {
    return d.source.y;
  }).attr("x2", function (d) {
    return d.target.x;
  }).attr("y2", function (d) {
    return d.target.y;
  });

  node.attr("transform", function (d) {
    return "translate(" + (d.x - 25) + "," + (d.y - 25) + ")";
  });
}

d3.select("#git").on("click", function () {
  render("data/github_2017.json");
});

d3.select("#so-fav").on("click", function () {
  render("data/s_o_loved.json");
});

render();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map