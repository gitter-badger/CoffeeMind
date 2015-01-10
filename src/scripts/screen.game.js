// Generated by CoffeeScript 1.8.0
(function() {
  var App;

  App = typeof exports !== "undefined" && exports !== null ? exports : window;

  App.coffeeMind = App.coffeeMind || {};

  App.coffeeMind.screens = App.coffeeMind.screens || {};

  App.coffeeMind.screens["game-screen"] = (function() {
    var addScore, advanceLevel, announce, bindButtons, board, checkColors, cols, cursor, display, game, gameOver, gameState, getSolution, input, moveCursor, moveLeft, moveRight, moveUp, nextColor, pauseTime, paused, previousColor, reset, resetCursor, rows, run, saveGameData, setCursor, setLevelTimer, setup, startGame, stopGame, storage, togglePause, unRenderCursor, updateGameInfo, _$, _options;
    _options = {};
    _$ = {};
    cursor = {};
    board = {};
    game = {};
    display = {};
    input = {};
    cols = 0;
    rows = 0;
    gameState = {
      level: 0,
      score: 0,
      timer: {}
    };
    paused = false;
    pauseTime = 0;
    storage = {};

    /*
     * @method setup
     * @param {jQuery} $
     */
    setup = function($) {
      _options = App.settings;
      _$ = $;
      board = App.coffeeMind.board;
      display = App.coffeeMind.display;
      input = App.coffeeMind.input;
      game = App.coffeeMind.game;
      storage = App.coffeeMind.storage;
      cols = _options.cols;
      rows = _options.rows;
      input.init(_$);
      input.bind("nextColor", nextColor);
      input.bind("previousColor", previousColor);
      input.bind("moveLeft", moveLeft);
      input.bind("moveRight", moveRight);
      input.bind("checkColors", checkColors);
      input.bind("resetBoard", reset);
      input.bind("getSolution", getSolution);
      bindButtons();
      _$("#game-screen button[name='exit']").bind('click', function() {
        var exitGame;
        togglePause(true);
        exitGame = App.confirm("Do you want to return to the main menu?");
        togglePause(false);
        if (exitGame === true) {
          saveGameData();
          stopGame();
          game.showScreen('main-menu');
        }
        return null;
      });
      return null;
    };

    /*
     * @method saveGameData
     */
    saveGameData = function() {
      storage.set("activeGameData", {
        level: gameState.level,
        score: gameState.score,
        time: Date.now() - gameState.startTime,
        solution: board.getSolution()
      });
      return null;
    };

    /*
     * @method togglePause
     * @param {Boolean} enable
     */
    togglePause = function(enable) {
      var displ, overlay;
      if (enable === paused) {
        return;
      }
      overlay = _$("#game-screen .pause-overlay")[0];
      paused = enable;
      displ = overlay.style.display;
      if (paused === true) {
        displ = "block";
        clearTimeout(gameState.timer);
        gameState.timer = 0;
        pauseTime = Date.now();
      } else {
        displ = "none";
        gameState.startTime += Date.now() - pauseTime;
        setLevelTimer(false);
      }
      return null;
    };

    /*
     * @method stopGame
     */
    stopGame = function() {
      clearTimeout(gameState.timer);
      return null;
    };

    /*
     * @method setLevelTimer
     * @param {function} reset
     */
    setLevelTimer = function(reset) {
      var $progress, delta, percent;
      if (gameState.timer) {
        clearTimeout(gameState.timer);
        gameState.Timer = 0;
      }
      if (reset) {
        gameState.startTime = Date.now();
        gameState.endTime = _options.baseLevelTimer * Math.pow(gameState.level, -0.05 * gameState.level);
      }
      delta = gameState.startTime + gameState.endTime - Date.now();
      percent = (delta / gameState.endTime) * 100;
      $progress = _$("#game-screen .time .indicator");
      if (delta < 0) {
        gameOver();
      } else {
        $progress.width(percent + "%");
        gameState.timer = setTimeout(setLevelTimer, 30);
      }
      return null;
    };

    /*
     * @method gameOver
     */
    gameOver = function() {
      return display.gameOver(function() {
        announce("Game over");
        return null;
      });
    };

    /*
     * @method addScore
     * @param {Int} points
     */
    addScore = function(points) {
      var nextLevelAt;
      nextLevelAt = Math.pow(_options.baseLevelScore, Math.pow(_options.baseLevelExp, gameState.level - 1));
      gameState.score += points;
      if (gameState.score >= nextLevelAt) {
        advanceLevel();
      }
      updateGameInfo();
      return null;
    };

    /*
     * @method announce
     * @param {String} str the message
     */
    announce = function(str) {
      var $element;
      $element = _$("#game-screen .announcement");
      $element.html(str);
      if (Modernizr.cssanimations) {
        $element.removeClass("zoomfade");
        setTimeout((function() {
          $element.addClass("zoomfade");
          return null;
        }), 1);
      } else {
        $element.addClass("active");
        setTimeout((function() {
          $element.removeClass("active");
          return null;
        }), 1000);
      }
      return null;
    };

    /*
     * @method startGame
     */
    startGame = function() {
      var activeGame, solution, useActiveGame;
      gameState = {
        level: 0,
        score: 0,
        timer: 0,
        startTime: 0,
        endTime: 0
      };
      updateGameInfo();
      setLevelTimer(true);
      board.init(function() {
        display.init(_$, function() {
          board.print();
          display.drawAvailableColours();
          advanceLevel();
          return null;
        });
        return null;
      });
      resetCursor();
      activeGame = storage.get("activeGameData");
      if (activeGame) {
        useActiveGame = App.confirm("Do you want to continue your previous game?");
      }
      if (useActiveGame === true) {
        gameState.level = activeGame.level;
        gameState.score = activeGame.score;
        solution = activeGame.solution;
      }

      /*board.initialize solution, () ->
        display.initialize () ->
      
          return null
        return null
       */
      return null;
    };

    /*
     * @method advanceLevel
     */
    advanceLevel = function() {
      gameState.level++;
      if (_options.availableColours < 8) {
        _options.availableColours++;
      }
      announce("Level " + gameState.level);
      updateGameInfo();
      gameState.startTime = Date.now();
      gameState.endTime = _options.baseLevelTimer * Math.pow(gameState.level, -0.05 * gameState.level);
      setLevelTimer(true);
      return null;
    };

    /*
     * @method updateGameInfo
     */
    updateGameInfo = function() {
      _$("#game-screen .score span").html(gameState.score);
      _$("#game-screen .level span").html(gameState.level);
      return null;
    };

    /*
     * @method resetCursor
     */
    resetCursor = function() {
      setCursor(0, rows - 1);
      return null;
    };

    /*
     * @method checkColors
     */
    checkColors = function() {
      var check, rightColor, rightPosition, rowNumber;
      check = board.checkColors();
      rightColor = check.rightColor;
      rightPosition = check.rightPosition;
      rowNumber = check.rowNumber;
      if (rightColor === -1) {
        announce("Not all cells have been selected");
      } else {
        display.drawCheckColors(check);
        moveUp();
        addScore(20 * rightPosition + 10 * rightColor);
      }
      if (check.rightPosition === settings.numColors) {
        display.drawSolution(board.getSolution());
      } else {
        if (rowNumber === 0) {
          gameOver();
        }
      }
      return null;
    };

    /*
     * @method getSolution
     */
    getSolution = function() {
      display.drawSolution(board.getSolution());
      return null;
    };

    /*
     * @method bindButton
     */
    bindButtons = function() {
      _$("#checkColors").bind('click', function() {
        checkColors();
        return null;
      });
      _$("#resetGame").bind('click', function() {
        reset();
        return null;
      });
      _$("#showSolution").bind('click', function() {
        getSolution();
        return null;
      });
      return null;
    };

    /*
     * @method reset
     */
    reset = function() {
      resetCursor();
      board.reset(function() {
        display.reset();
        return null;
      });
      return null;
    };

    /*
     * @method run
     * @param {jQuery} $
     */
    run = function($) {
      setup($);
      startGame();
      return null;
    };

    /*
     * @method nextColor
     * @param {Int} x
     * @param {Int} y
     */
    nextColor = function(x, y) {
      var color;
      if (isNaN(x) || isNaN(y)) {
        x = cursor.x;
        y = cursor.y;
      }
      color = board.nextColor(x, y);
      if (color < -1) {
        return null;
      }
      display.myDrawImage(x, y, color);
      unRenderCursor();
      setCursor(x, y);
      console.log("screen.game nextColor: Color increased at: Column: " + x + "Row: " + y + "New color: " + color);
      return null;
    };

    /*
     * @method unRenderCursor
     */
    unRenderCursor = function() {
      var x, y;
      x = cursor.x;
      y = cursor.y;
      return display.unRenderCursor(x, y, board.getColor(x, y));
    };

    /*
     * @method previousColor
     * @param {Int} x
     * @param {Int} y
     */
    previousColor = function(x, y) {
      var color;
      if (!x || !y) {
        x = cursor.x;
        y = cursor.y;
      } else {
        setCursor(x, y);
      }
      color = board.previousColor(x, y);
      display.myDrawImage(x, y, color);
      console.log("Screen.game previousColor: Color decreased at: Column: " + x + "Row: " + y + "New color: " + color);
      return null;
    };

    /*
     * @method moveRight
     */
    moveRight = function() {
      unRenderCursor();
      moveCursor(1, 0);
      return null;
    };

    /*
     * @method moveLeft
     */
    moveLeft = function() {
      unRenderCursor();
      moveCursor(-1, 0);
      return null;
    };

    /*
     * @method moveUp
     */
    moveUp = function() {
      unRenderCursor();
      setCursor(0, cursor.y - 1);
      return null;
    };

    /*
     * @method moveCursor
     * @param {Int} x
     * @param {Int} y
     */
    moveCursor = function(x, y) {
      x += cursor.x;
      y += cursor.y;
      setCursor(x, y);
      return null;
    };

    /*
     * @method setCursor sets the current cursor position.
     * @param {Int} x
     * @param {Int} y
     */
    setCursor = function(x, y) {
      if (!cursor) {
        cursor = {
          x: x,
          y: y
        };
      }
      if (x >= 0 && x < cols && y >= 0 && y < rows) {
        cursor.x = x;
        cursor.y = y;
      }
      display.renderCursor(x, y, 0.8);
      console.log("Cursor set: column: " + cursor.x + "Row: " + cursor.y);
      return null;
    };
    return {
      reset: reset,
      run: run
    };
  })();

}).call(this);

//# sourceMappingURL=screen.game.js.map
