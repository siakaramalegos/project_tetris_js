'use strict;'

var TET = TET || {};

TET.BoardModule = (function(){

  // Constructor for new board
  function Board(rows, columns){
    this.state = [];
    this.init(rows, columns);
  }

  Board.prototype.init = function(rows, columns){
    for (var i = 0; i < columns; i++ ){
      var row = [];
      for (var j = 0; j < rows; j++ ){
        row.push(0);
      }
      this.state.push(row);
    }
  };

  Board.prototype.freezeBlock = function(squares){
    var board = this;
    squares.forEach(function(e){
      board.state[e.x][e.y] = 1;
    });
  };

  return {
    Board: Board
  }
})();