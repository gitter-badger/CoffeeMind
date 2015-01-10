// Generated by CoffeeScript 1.8.0
(function() {
  var App;

  App = typeof exports !== "undefined" && exports !== null ? exports : window;

  App.coffeeMind = App.coffeeMind || {};


  /*
   * @method App.coffeeMind.storage
   * @return {Object} API objects
   */

  App.coffeeMind.storage = (function() {
    var db, get, set;
    db = App.localStorage;

    /*
     * @method set
     * @param {String} key
     * @param {Object} value
     */
    set = function(key, value) {
      value = JSON.stringify(value);
      db.setItem(key, value);
      return null;
    };

    /*
     * @method get
     * @param {String} key
     * @return {Object} the value for the key in the storage
     */
    get = function(key) {
      var error, value;
      value = db.getItem(key);
      try {
        return JSON.parse(value);
      } catch (_error) {
        error = _error;
        return;
      }
      return null;
    };
    return {
      set: set,
      get: get
    };
  })();

}).call(this);

//# sourceMappingURL=storage.js.map
