// Generated by CoffeeScript 1.8.0
(function() {
  var App, animationFramePath;

  console.log("loading plugins.coffee");

  console.log(Modernizr);

  App = typeof exports !== "undefined" && exports !== null ? exports : window;

  App.srcPath = "";

  animationFramePath = App.srcPath + "scripts/requestAnimationFrame.js";

  Modernizr.load({
    load: animationFramePath
  });

}).call(this);

//# sourceMappingURL=plugins.js.map
