'use strict;'

// Namespace the game
var TET = TET || {};

TET.MainModule = (function(){

  // Stub for returned object (public methods)
  var stub = {};

  var _rows = 20;
  var _columns = 10;
  var _board = [];
  var _gameLoop;

  stub.init = function(){
    // Initialize game objects
    _initBoard();
    _renderBoard();

    // Set listeners

    // Start game loop
    _gameLoop = window.setInterval(_tic, 2000);
  };

  var _initBoard = function(){
    for (var i = 0; i < _columns; i++ ){
      var row = [];
      for (var j = 0; j < _rows; j++ ){
        row.push(0);
      }
      _board.push(row);
    }
  };

  var _tic = function(){
    // Render objects
    _renderBoard();

    // Check game over
  };

  var _renderBoard = function(){
    $('#game-board').html('');

    for (var row = 0; row < _rows; row++) {
      for (var col = 0; col < _columns; col++) {
        var $square = $('<div></div>')
          .attr('class', 'grid-box');

        $('#game-board').append($square);
      }
      $('#game-board').append('<br>');
    }
  };

  // Return public methods
  return stub;
})();