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


var width = window.innerWidth;
var height = window.innerHeight;
var svg = d3.select("svg").attr("width", width).attr("height", height);

var simulation = d3.forceSimulation().force("charge", d3.forceManyBody().strength(-350)).force("link", d3.forceLink().distance(100)).force("x", d3.forceX(width / 2)).force("y", d3.forceY(height / 2)).force("collide", d3.forceCollide(20)).on("tick", ticked);
var link = svg.selectAll(".link");
var node = svg.selectAll(".node");

function render() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "data/github_by_year_flattened.json";

  d3.json(data, function (data) {
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);

    link = link.data(data.links).enter().append("line").attr("class", "link").style("stroke", "#999").style("stroke-width", "1.5px");

    var images = __webpack_require__(1);

    node = node.data(data.nodes).enter().append("svg:image").attr("xlink:href", function (d) {
      return images[d.name];
    }).attr("width", 40).attr("height", 40).attr("class", function (d) {
      return d.index !== 0 ? d.children ? "node parent" : "node leaf" : "node root";
    });

    node.exit().remove();
    link.exit().remove();
    node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var images = {
  JavaScript: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Badge_js-strict.svg/2000px-Badge_js-strict.svg.png",
  Java: "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
  HTML: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2000px-HTML5_logo_and_wordmark.svg.png",
  CSS: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/CSS.3.svg/2000px-CSS.3.svg.png",
  Shell: "https://glot.io/static/img/bash.svg.png?etag=5cwCNl16",
  Python: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2000px-Python-logo-notext.svg.png",
  Ruby: "https://www.bigbinary.com/assets/services/ror/rubygem-73b83c79780e7e71d4a159177f2cbdb95b07466141beab0380842122d27f4f93.svg",
  PHP: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PHP_Logo%2C_text_only.svg/640px-PHP_Logo%2C_text_only.svg.png",
  C: "https://domboscoonline.com.br/upload/store/281220171514476609linguagem-c.png",
  "C++": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/2000px-ISO_C%2B%2B_Logo.svg.png",
  Go: "https://seeklogo.com/images/G/go-logo-046185B647-seeklogo.com.png",
  Swift: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/2000px-Swift_logo.svg.png"
};

module.exports = images;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map