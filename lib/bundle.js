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

// const height = 950;
// const width = 950;
// debugger;
var canvas = d3.select("#canvas").attr("width", width).attr("height", height),
    margin = 20,
    diameter = width,
    g = canvas.append("g").attr("transform", "translate(" + 2 + "," + 2 + ")");

d3.json("data/by_year.json", function (root) {
  var pack = d3.pack().size([width, height]).padding(10);
  root = d3.hierarchy(root).sum(function (d) {
    return d.instances;
  }).sort(function (a, b) {
    return b.value - a.value;
  });

  var nodes = pack(root).descendants();

  var circle = g.selectAll("circle").data(nodes).enter().append("circle").attr("class", function (d) {
    return d.parent ? d.children ? "node year" : "node language leaf" : "node root";
  }).attr("transform", function (d) {
    return "translate(" + d.x + "," + d.y + ")";
  }).style("opacity", "0.5").style("fill", "blue").attr("r", function (d) {
    return d.r;
  }).on("click", function (d, i) {
    return clicked(d, i);
  });

  var node = g.selectAll("circle");
});
var clicked = function clicked(d, i) {
  if (d !== centered) {
    canvas
    // .selectAll("circle")
    .filter(function (d, idx) {
      return idx === i;
    }).transition().duration(2500).attr("transform", "translate(" + d.x / 2 + "," + d.y / 2 + ")");
  }
};

// FOR FIXED YEAR CIRCLE WIDTH calculate radius of leaves as % of year circle
// return d.parent
//   ? d.children ? d.parent.r / 3 : d.r / d.parent.r * 100
//   : d.r;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map