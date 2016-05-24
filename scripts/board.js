'use strict;'

var TET = TET || {};

TET.BoardModule = (function(){

  // Constructor for new board
  function Board(){
    this.state = [];
    this.init();
  }

  Board.prototype.init = function(){
    for (var i = 0; i < 20; i++ ){
      var row = [];
      for (var j = 0; j < 10; j++ ){
        row.push(0);
      }
      this.state.push(row);
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
    rows.forEach(function(row){
      _highlightRow();
      // Delete row
      // Add a new empty row
    });
  };

  return {
    Board: Board
  }
})();