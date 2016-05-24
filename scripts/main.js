'use strict;'

// Namespace the game
var TET = TET || {};

TET.MainModule = (function(){

  // Stub for returned object (public methods)
  var stub = {};

  var _rows = 20;
  var _columns = 10;
  var _gameLoop,
      currentBlock,
      board;

  stub.init = function(){
    console.log('Initializing main game module');

    // Initialize game objects
    board = new TET.BoardModule.Board(_rows, _columns);
    TET.BlockModule.init()
    stub.addNewBlock();

    // Show first rendering
    _renderBoard();
    _renderCurrentBlock();

    // Set listeners
    _listenKeyDown();

    // Start game loop
    _gameLoop = window.setInterval(_tic, 1000);
  };

  stub.getBoard = function(){
    return board;
  };

  stub.addNewBlock = function(){
    currentBlock = new TET.BlockModule.Block();
  }

  var _tic = function(){
    // Move block
    currentBlock.move('down');

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

        if ( board.state[col][row] === 1 ){
          $square.addClass('block');
        }

        $('#game-board').append($square);
      }
      $('#game-board').append('<br>');
    }
  };

  var _renderCurrentBlock = function(){
    currentBlock.locations.forEach(function(e){
      $('div[data-x="' + e.x + '"][data-y="' + e.y + '"]')
        .addClass('block');
    });
  };

  var _listenKeyDown = function(){
    $(document).keydown(_processAction);
  };

  var _processAction = function(event){
    event.preventDefault();

    if ( event.keyCode === 40 ) {
      // Down arrow = move piece all the way down
      currentBlock.moveDownFast();
    } else if ( event.keyCode === 39 ) {
      // Right arrow = move piece one spot to the right
      currentBlock.move('right');
    } else if ( event.keyCode === 37 ) {
      // Left arrow = move piece one spot to the left
      currentBlock.move('left');
    } else if ( event.keyCode === 32 ){
      // Space bar = Rotate 90 degrees
    }

  };

  // Return public methods
  return stub;
})();