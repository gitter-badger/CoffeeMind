(function(){var e;e="undefined"!=typeof exports&&null!==exports?exports:window,e.coffeeMind=e.coffeeMind||{},e.coffeeMind.screens=e.coffeeMind.screens||{},e.coffeeMind.screens["main-menu"]=function(){var n,t,r,o;return o={},n={},r=function(t){return o=t,n=e.coffeeMind.game,o("#main-menu ul.menu").bind("click",function(e){var t;return"button"===e.target.nodeName.toLowerCase()?(t=e.target.getAttribute("name"),n.showScreen(t)):void 0}),null},t=function(e){return r(e),null},{run:t}}()}).call(this);