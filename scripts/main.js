'use strict;'

// Namespace the game
var TET = TET || {};

TET.MainModule = (function(){

  // Stub for returned object (public methods)
  var stub = {};

  var _rows = 20;
  var _columns = 10;
  var _board = [];
  var _gameLoop,
      _currentBlock;

  stub.init = function(){
    // Initialize game objects
    _initBoard();
    _currentBlock = new TET.BlockModule.Block();

    // Show first rendering
    _renderBoard();
    _renderCurrentBlock();

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
    // Move block
    _currentBlock.moveDown();

    // Render objects
    _renderBoard();
    _renderCurrentBlock();

    // Check game over
  };

  var _renderBoard = function(){
    $('#game-board').html('');

    for (var row = 0; row < _rows; row++) {
      for (var col = 0; col < _columns; col++) {
        var $square = $('<div></div>')
          .attr('class', 'grid-box')
          .attr('data-x', col)
          .attr('data-y', row);

        $('#game-board').append($square);
      }
      $('#game-board').append('<br>');
    }
  };

  var _renderCurrentBlock = function(){
    _currentBlock.locations.forEach(function(e){
      $('div[data-x="' + e.x + '"][data-y="' + e.y + '"]')
        .addClass('block');
    });
  };

  // Return public methods
  return stub;
})();