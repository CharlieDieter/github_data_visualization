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


var data = __webpack_require__(1);
var images = __webpack_require__(2);
var width = window.innerWidth;
var height = window.innerHeight - 200;

var svg = d3.select("svg").attr("width", width).attr("height", height);

var simulation = d3.forceSimulation().force("charge", d3.forceManyBody().strength(-350)).force("link", d3.forceLink().distance(120)).force("x", d3.forceX(width / 2 + 100)).force("y", d3.forceY(height / 2)).force("collide", d3.forceCollide(25)).on("tick", ticked);

var label = d3.select("#label").attr("class", "tooltip").style("opacity", 0);

var link = svg.selectAll(".link");
var node = svg.selectAll(".node");

function render(data) {
  simulation.nodes(data.nodes);
  simulation.force("link").links(data.links);

  link = link.data(data.links).enter().append("line").filter(function (d) {
    return !d.invis;
  }).attr("class", "link").style("stroke", "#999").style("stroke-width", "0.3");

  node = node.data(data.nodes).enter().append("g").attr("height", 100).attr("width", 100).attr("class", function (d) {
    return d.index !== 0 ? d.parent ? "node parent" : "node leaf" : "node root";
  });

  // For varying widths depending on data
  // .attr("width", d => {
  //   let w;
  //   if (typeof d.instances === "string") {
  //     if (d.instances[0] === "$") {
  //       w =
  //         parseInt(
  //           d.instances
  //             .split("$")
  //             .join("")
  //             .split(",")
  //             .join("")
  //         ) / 10000;
  //     } else {
  //       w = parseInt(d.instances.split(",").join("")) / 10000;
  //     }
  //   } else {
  //     w = 40;
  //   }
  //   return w;
  // })

  var img = node.filter(".leaf").append("image").attr("xlink:href", function (d) {
    return images[d.name];
  }).attr("width", 40).attr("height", 40).attr("opacity", 0.9).on("mouseover", function (d) {
    d3.select(this).transition().duration(1000).attr("height", 100).attr("width", 100).attr("opacity", 1).on("end", function (d) {
      return tip(d);
    });
    this.parentElement.parentElement.append(this.parentElement);
  }).on("mouseleave", function (d) {
    d3.select(this).transition().duration(1000).attr("height", 50).attr("width", 50).attr("opacity", 0.9);
    hideTip();
  });

  var parentText = d3.selectAll(".parent").append("text").attr("width", 40).attr("height", 40).text(function (d) {
    return d.name;
  }).style("text-anchor", "middle");

  var circle = d3.selectAll(".parent").append("circle").attr("r", 80).attr("opacity", 0.4).on("mouseenter", function () {
    d3.select(this).transition().duration(1000).attr("r", 120);
    d3.select(this.parentElement.children[0]).transition().duration(1000).attr("font-size", "30px");
  }).on("mouseleave", function (d) {
    d3.select(this.parentElement.children[0]).transition().duration(1000).attr("font-size", "15px");
    d3.select(this).transition().duration(1000).attr("r", 80);
  });
  // removal on exit for data updates in the future
  // node.exit().remove();
  // link.exit().remove();
  node.call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));
}

function tip(node) {
  label.style("opacity", 1).html(node.name).style("top", node.y + 60 + "px").style("left", node.x + "px");

  var percent = node.instances < 100 ? "%" : "";
  label.append("div").html(node.instances + percent).attr("class", "blurb-number");
  label.append("div").html(node.blurb).attr("class", "blurb-body");
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
  }).attr("cx", function (d) {
    return d.x = Math.max(10, Math.min(width - 10, d.x));
  }).attr("cy", function (d) {
    return d.y = Math.max(10, Math.min(height - 10, d.y));
  });
}

render(data);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var data = {
  nodes: [{
    name: "centerNode"
  }, {
    name: "Most GitHub Repos",
    parent: true
  }, {
    name: "JavaScript",
    instances: "414,453",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "HTML",
    instances: "347,998",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "CSS",
    instances: "309,993",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "Shell",
    instances: "262,879",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "Python",
    instances: "231,975",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "Java",
    instances: "137,410",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "Ruby",
    instances: "123,708",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "PHP",
    instances: "118,696",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "Makefile",
    instances: "116,151",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "C",
    instances: "112,881",
    blurb: "GitHub repos using this language were created in 2017"
  }, {
    name: "Most Loved",
    parent: true
  }, {
    name: "JavaScript",
    instances: 61.9,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "TypeScript",
    instances: 67,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "SQL",
    instances: 57.5,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Java",
    instances: 50.7,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Shell",
    instances: 59.1,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Python",
    instances: 68.0,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "C#",
    instances: 60.4,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "F#",
    instances: 59.6,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Clojure",
    instances: 59.6,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Ruby",
    instances: 47.4,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Go",
    instances: 65.6,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Swift",
    instances: 65.1,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Kotlin",
    instances: 75.1,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Rust",
    instances: 78.9,
    blurb: "of developers on Stack Overflow love this language"
  }, {
    name: "Most Dreaded",
    parent: true
  }, {
    name: "Visual Basic",
    instances: 89.9,
    blurb: "of developers on Stack Overflow dread using this language"
  }, {
    name: "Cobol",
    instances: 84.1,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "CoffeeScript",
    instances: 82.7,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Matlab",
    instances: 77.4,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Assembly",
    instances: 71.4,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Perl",
    instances: 71.3,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Objective-C",
    instances: 70.3,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Lua",
    instances: 68.2,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Ruby",
    instances: 52.6,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Groovy",
    instances: 66.4,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Delphi/ObjectPascal",
    instances: 65.1,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "C",
    instances: 62.6,
    blurb: "of developers on Stack Overflow say they dread using this language"
  }, {
    name: "Top Paying Technologies",
    parent: true
  }, {
    name: "Erlang",
    instances: "$115,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Scala",
    instances: "$115,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "OCaml",
    instances: "$114,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Groovy",
    instances: "$110,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Python",
    instances: "$98,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Hack",
    instances: "$108,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "F#",
    instances: "$108,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Clojure",
    instances: "$110,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Ruby",
    instances: "$100,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Go",
    instances: "$110,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Perl",
    instances: "$106,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Kotlin",
    instances: "$105,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Rust",
    instances: "$105,000",
    blurb: "median salary of Stack Overflow survey respondents who use this language"
  }, {
    name: "Most Popular Frameworks",
    parent: true
  }, {
    name: "Node.js",
    instances: 49.9,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Angular",
    instances: 37.6,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "React",
    instances: 28.3,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: ".NET Core",
    instances: 27.2,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Spring",
    instances: 17.8,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Django",
    instances: 12.8,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Cordova",
    instances: 8.6,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "TensorFlow",
    instances: 7.6,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Xamarin",
    instances: 7.4,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Spark",
    instances: 4.8,
    blurb: "of Stack Overflow survey respondents use this technology"
  }, {
    name: "Hadoop",
    instances: 4.7,
    blurb: "of Stack Overflow survey respondents use this technology"
  }],
  links: [{ source: 0, target: 1, invis: true }, { source: 1, target: 2 }, { source: 1, target: 3 }, { source: 1, target: 4 }, { source: 1, target: 5 }, { source: 1, target: 6 }, { source: 1, target: 7 }, { source: 1, target: 8 }, { source: 1, target: 9 }, { source: 1, target: 10 }, { source: 1, target: 11 }, { source: 0, target: 12, invis: true }, { source: 12, target: 13 }, { source: 12, target: 14 }, { source: 12, target: 15 }, { source: 12, target: 16 }, { source: 12, target: 17 }, { source: 12, target: 18 }, { source: 12, target: 19 }, { source: 12, target: 20 }, { source: 12, target: 21 }, { source: 12, target: 22 }, { source: 12, target: 23 }, { source: 12, target: 24 }, { source: 12, target: 25 }, { source: 12, target: 26 }, { source: 0, target: 27, invis: true }, { source: 27, target: 28 }, { source: 27, target: 29 }, { source: 27, target: 30 }, { source: 27, target: 31 }, { source: 27, target: 32 }, { source: 27, target: 33 }, { source: 27, target: 34 }, { source: 27, target: 35 }, { source: 27, target: 36 }, { source: 27, target: 37 }, { source: 27, target: 38 }, { source: 27, target: 39 }, { source: 0, target: 40, invis: true }, { source: 40, target: 41 }, { source: 40, target: 42 }, { source: 40, target: 43 }, { source: 40, target: 44 }, { source: 40, target: 45 }, { source: 40, target: 46 }, { source: 40, target: 47 }, { source: 40, target: 48 }, { source: 40, target: 49 }, { source: 40, target: 50 }, { source: 40, target: 51 }, { source: 40, target: 52 }, { source: 40, target: 53 }, { source: 0, target: 54, invis: true }, { source: 54, target: 55 }, { source: 54, target: 56 }, { source: 54, target: 57 }, { source: 54, target: 58 }, { source: 54, target: 59 }, { source: 54, target: 60 }, { source: 54, target: 61 }, { source: 54, target: 62 }, { source: 54, target: 63 }, { source: 54, target: 64 }, { source: 54, target: 65 }]
};

module.exports = data;

/***/ }),
/* 2 */
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