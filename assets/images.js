var images = {
  JavaScript:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Badge_js-strict.svg/2000px-Badge_js-strict.svg.png",
  Java:
    "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Java_programming_language_logo.svg/1200px-Java_programming_language_logo.svg.png",
  HTML:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/2000px-HTML5_logo_and_wordmark.svg.png",
  CSS:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/CSS.3.svg/2000px-CSS.3.svg.png",
  Shell: "https://glot.io/static/img/bash.svg.png?etag=5cwCNl16",
  Python:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/2000px-Python-logo-notext.svg.png",
  Ruby:
    "https://www.bigbinary.com/assets/services/ror/rubygem-73b83c79780e7e71d4a159177f2cbdb95b07466141beab0380842122d27f4f93.svg",
  PHP:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/PHP_Logo%2C_text_only.svg/640px-PHP_Logo%2C_text_only.svg.png",
  C:
    "https://domboscoonline.com.br/upload/store/281220171514476609linguagem-c.png",
  "C++":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/ISO_C%2B%2B_Logo.svg/2000px-ISO_C%2B%2B_Logo.svg.png",
  Go: "https://seeklogo.com/images/G/go-logo-046185B647-seeklogo.com.png",
  Swift:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Swift_logo.svg/2000px-Swift_logo.svg.png",
  Makefile: "https://www.gnu.org/graphics/empowered-by-gnu.svg",
  TypeScript:
    "https://seeklogo.com/images/T/typescript-logo-B29A3F462D-seeklogo.com.png",
  SQL: "https://image.flaticon.com/icons/svg/29/29165.svg",
  "C#": "http://www.codekul.com/images/logo_chash.png",
  "F#":
    "https://codeopinion.com/wp-content/uploads/2015/03/FSharp.Azure_.Logo_.png",
  Clojure: "http://clojurebridge.lispnyc.org/static/images/clojure-logo.png",
  Kotlin:
    "http://logos-download.com/wp-content/uploads/2016/10/Kotlin_logo_wordmark.png",
  Rust:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/2000px-Rust_programming_language_black_logo.svg.png",
  "Visual Basic": "http://www.gandgtech.com/images/visualbasic.png",
  Cobol:
    "https://s3.amazonaws.com/s3.timetoast.com/public/uploads/photos/8574151/logos-004__2_.png?1478594312",
  CoffeeScript: "http://www.jeremyschultz.com/img/logos/coffeescript.svg",
  Matlab: "https://pennwic.files.wordpress.com/2014/02/matlablogo.png",
  Assembly:
    "data:image/png;base64,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",
  Perl: "http://www.acornsoftware.net/images/perl-logo.png",
  "Objective-C":
    "https://static-s.aa-cdn.net/img/ios/486204866/6e383749be137a9b09bccbefcfc3665d?v=1",
  Lua:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Lua-logo-nolabel.svg/2000px-Lua-logo-nolabel.svg.png",
  Groovy:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Groovy-logo.svg/1200px-Groovy-logo.svg.png",
  "Delphi/ObjectPascal":
    "https://user-images.githubusercontent.com/6978003/28999656-cb0677aa-7a1c-11e7-975d-25ed65555cc8.png",
  Erlang:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/Erlang_logo.svg/2000px-Erlang_logo.svg.png",
  Scala:
    "http://www.unixstickers.com/image/data/stickers/scala/Scala-logoText.sh.png",
  OCaml:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/OCaml_Logo.svg/800px-OCaml_Logo.svg.png",
  Hack:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Webysther_20160330_-_Hack_%28language%29.svg/2200px-Webysther_20160330_-_Hack_%28language%29.svg.png",
  "Node.js":
    "https://cdn.iconscout.com/public/images/icon/free/png-512/nodejs-logo-36559ec903b263f5-512x512.png",
  Angular:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Angular_full_color_logo.svg/1000px-Angular_full_color_logo.svg.png",
  React:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1280px-React-icon.svg.png",
  ".NET Core":
    "https://cdn0.froala.com/assets/editor/docs/server/meta-social/dotnet-core-12b6094aae01e933196c60b4e87181bf.png",
  Spring:
    "http://www.softcodelondon.co.uk/assets/images/expert-logo-set/spring-framework.png",
  Django: "https://cdn.worldvectorlogo.com/logos/django.svg",
  Cordova: "https://cdn.worldvectorlogo.com/logos/cordova.svg",
  TensorFlow:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/2000px-Tensorflow_logo.svg.png",
  Xamarin:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Xamarin-logo.svg/2000px-Xamarin-logo.svg.png",
  Spark:
    "https://camo.githubusercontent.com/7357732177d2f78c60b492621c14c28e69c6088f/68747470733a2f2f63646e2e7261776769742e636f6d2f617765736f6d652d737061726b2f617765736f6d652d737061726b2f66373861313664622f737061726b2d6c6f676f2d74726164656d61726b2e737667",
  Hadoop:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Hadoop_logo.svg/2000px-Hadoop_logo.svg.png",
  "Most Loved on Stack Overflow": ""
};

module.exports = images;
