'use strict;'

var TET = TET || {};

TET.BoardModule = (function(){

  function _highlightRow(row){
    $('div[data-y="' + row + '"]')
      .addClass('cleared');
  }

  function _newRow(){
    var row = [];

    for (var j = 0; j < 10; j++ ){
      row.push(0);
    }

    return row;
  }

  // Constructor for new board
  function Board(){
    this.state = [];
    this.init();
  }

  Board.prototype.init = function(){
    for (var i = 0; i < 20; i++ ){
      this.state.push(_newRow());
    }
  };

  Board.prototype.freezeBlock = function(squares){
    var board = this;
    console.log('freezing block');
    squares.forEach(function(e){
      board.state[e.y][e.x] = 1;
    });
  };

  Board.prototype.clearRows = function(rows){
    var board = this;

    rows.forEach(function(row){
      // Highlight the completed row
      _highlightRow(row);
      // Delete row
      board.state.splice(row, 1);
      // Add a new empty row to top
      board.state.unshift(_newRow());
    });
  };

  return {
    Board: Board
  }
})();