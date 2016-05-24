'use strict;'

var TET = TET || {};

TET.BlockModule = (function(MainModule){

  var _board;

  // TODO: fill in for other shapes
  var _rotationCenters = {
    square: {x: 5, y: 0}
  };

  function init(){
    _board = MainModule.getBoard();
  }

  function _randomShape(){
    // TODO: pick a random shape

    return 'square1'
  }

  function _initialLocations(shape){
    var locations;

    // TODO: set up multiple shapes
    if ( shape === 'square1' ){
      locations = [
        {x: 5, y: 0}
      ];
    }

    return locations;
  }

  // Constructor for new block
  function Block(){
    this.init();
  }

  Block.prototype.init = function(){
    var shape = _randomShape();
    this.locations = _initialLocations(shape);
    this.rotationCenter = _rotationCenters[shape];
  };

  Block.prototype.moveDown = function(){
    if (this.checkOpenBelow() === true){
      this.locations.forEach(function(e){
        e.y += 1;
      });
    } else {
      _board.freezeBlock(this.locations);
      MainModule.addNewBlock();
    }
  };

  Block.prototype.checkOpenBelow = function(){
    var empty = true;

    for (var i = 0; i < this.locations.length; i++){
      var e = this.locations[i];
      // Make sure the square below is empty or that we are not at the bottom
      if ( _board.state[e.x][e.y + 1] !== 0 || e.y >= _board.state[0].length ){
        empty = false;
        break
      }
    }

    return empty;
  }

  return {
    Block: Block,
    init: init
  }

})(TET.MainModule);