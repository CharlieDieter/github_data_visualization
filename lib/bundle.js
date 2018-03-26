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

var label = d3.select("#label").attr("class", "tooltip").style("opacity", 0);

var svg = d3.select("svg").attr("width", width).attr("height", height);

var simulation = d3.forceSimulation().force("charge", d3.forceManyBody().strength(-550)).force("link", d3.forceLink().distance(110)).force("x", d3.forceX(width / 2)).force("y", d3.forceY(height / 2)).force("collide", d3.forceCollide(25)).on("tick", ticked);

var link = svg.selectAll(".link");
var node = svg.selectAll(".node");

function render() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "data/so_data.json";

  d3.json(data, function (data) {
    simulation.nodes(data.nodes);
    simulation.force("link").links(data.links);

    link = link.data(data.links).enter().append("line").filter(function (d) {
      return !d.invis;
    }).attr("class", "link").style("stroke", "#999").style("stroke-width", "0.3");

    var images = __webpack_require__(1);

    node = node.data(data.nodes).enter().append("g").attr("class", function (d) {
      return d.index !== 0 ? d.parent ? "node parent" : "node leaf" : "node root";
    });

    var img = node.filter(".leaf").append("image").attr("xlink:href", function (d) {
      return images[d.name];
    }).attr("width", 50).attr("height", 50).on("mouseover", function (d) {
      d3.select(this).transition().duration(1000).attr("height", 120).attr("width", 120).on("end", function (d) {
        return showTip(d);
      });
    }).on("mouseleave", function (d) {
      d3.select(this).transition().duration(1000).attr("height", 40).attr("width", 40);
      hideTip();
    });

    var rootHeader = node.filter(".root");

    rootHeader.append("text").text("The Best (and Worst)").style("text-anchor", "middle");

    rootHeader.append("text").attr("dy", "1.4em").text("Programming Languages").style("text-anchor", "middle");

    rootHeader.append("text").attr("dy", "2.8em").text("of 2017").style("text-anchor", "middle");

    rootHeader.attr("transform", "translate(100, 100)");

    var parentText = d3.selectAll(".parent").append("text").attr("width", 40).attr("height", 40).text(function (d) {
      return d.name;
    }).style("text-anchor", "middle");

    var circle = d3.selectAll(".parent").append("circle").attr("r", Math.floor(Math.random() * (60 - 80 + 1) + 80)).attr("opacity", 0.4).on("dblclick", function (d) {
      return toggleZoom(d);
    }).on("mouseenter", function () {
      d3.select(this).transition().duration(1000).attr("r", 120);
    }).on("mouseleave", function (d) {
      d3.select(this).transition().duration(1000).attr("r", Math.floor(Math.random() * (60 - 80 + 1) + 80));
    });

    node.exit().remove();
    link.exit().remove();
    node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
  });
}

function showTip(node) {
  label.style("opacity", 1).html(node.name).style("top", node.y + 35 + "px").style("left", node.x + "px");
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
  Swift: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/2000px-Swift_logo.svg.png",
  Makefile: "https://www.gnu.org/graphics/empowered-by-gnu.svg",
  TypeScript: "https://seeklogo.com/images/T/typescript-logo-B29A3F462D-seeklogo.com.png",
  SQL: "https://image.flaticon.com/icons/svg/29/29165.svg",
  "C#": "http://www.codekul.com/images/logo_chash.png",
  "F#": "https://codeopinion.com/wp-content/uploads/2015/03/FSharp.Azure_.Logo_.png",
  Clojure: "http://clojurebridge.lispnyc.org/static/images/clojure-logo.png",
  Kotlin: "http://logos-download.com/wp-content/uploads/2016/10/Kotlin_logo_wordmark.png",
  Rust: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/2000px-Rust_programming_language_black_logo.svg.png",
  "Visual Basic": "http://www.gandgtech.com/images/visualbasic.png",
  Cobol: "https://hackr.io/tutorials/learn-cobol/logo/cobol_logo",
  CoffeeScript: "http://www.jeremyschultz.com/img/logos/coffeescript.svg",
  Matlab: "https://pennwic.files.wordpress.com/2014/02/matlablogo.png",
  Assembly: "https://hackr.io/tutorials/learn-assembly-language/logo/assembly-language_logo",
  Perl: "http://www.acornsoftware.net/images/perl-logo.png",
  "Objective-C": "https://static-s.aa-cdn.net/img/ios/486204866/6e383749be137a9b09bccbefcfc3665d?v=1",
  Lua: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lua-logo-nolabel.svg/2000px-Lua-logo-nolabel.svg.png",
  Groovy: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Groovy-logo.svg/1200px-Groovy-logo.svg.png",
  "Delphi/ObjectPascal": "https://user-images.githubusercontent.com/6978003/28999656-cb0677aa-7a1c-11e7-975d-25ed65555cc8.png",
  Erlang: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Erlang_logo.svg/2000px-Erlang_logo.svg.png",
  Scala: "http://www.unixstickers.com/image/data/stickers/scala/Scala-logoText.sh.png",
  OCaml: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/OCaml_Logo.svg/800px-OCaml_Logo.svg.png",
  Hack: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Webysther_20160330_-_Hack_%28language%29.svg/2200px-Webysther_20160330_-_Hack_%28language%29.svg.png",
  "Node.js": "https://cdn.iconscout.com/public/images/icon/free/png-512/nodejs-logo-36559ec903b263f5-512x512.png",
  Angular: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1000px-Angular_full_color_logo.svg.png",
  React: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
  ".NET Core": "https://cdn0.froala.com/assets/editor/docs/server/meta-social/dotnet-core-12b6094aae01e933196c60b4e87181bf.png",
  Spring: "http://www.softcodelondon.co.uk/assets/images/expert-logo-set/spring-framework.png",
  Django: "https://cdn.worldvectorlogo.com/logos/django.svg",
  Cordova: "https://cdn.worldvectorlogo.com/logos/cordova.svg",
  TensorFlow: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/2000px-Tensorflow_logo.svg.png",
  Xamarin: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Xamarin-logo.svg/2000px-Xamarin-logo.svg.png",
  Spark: "https://camo.githubusercontent.com/7357732177d2f78c60b492621c14c28e69c6088f/68747470733a2f2f63646e2e7261776769742e636f6d2f617765736f6d652d737061726b2f617765736f6d652d737061726b2f66373861313664622f737061726b2d6c6f676f2d74726164656d61726b2e737667",
  Hadoop: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hadoop_logo.svg/2000px-Hadoop_logo.svg.png",
  "Most Loved on Stack Overflow": ""
};

module.exports = images;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map