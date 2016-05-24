'use strict;'

var TET = TET || {};

TET.BlockModule = (function(MainModule){

  var _board;

  // TODO: fill in for other shapes
  var _rotationCenters = function(block) {
    var centerReference = {
      square: {x: block.locations[0].x, y: 0}
    };

    return centerReference[block.shape];
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
    var randStart = Math.floor(Math.random() * 10);

    // TODO: set up multiple shapes
    if ( shape === 'square1' ){
      locations = [
        {x: randStart, y: 0}
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
    this.rotationCenter = _rotationCenters(this);
  };

  Block.prototype.moveDown = function(){
    if (this.checkOpenBelow() === true){
      this.locations.forEach(function(e){
        e.y += 1;
      });
      return true;
    } else {
      _board.freezeBlock(this.locations);
      MainModule.addNewBlock();
      return false;
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
  };

  Block.prototype.moveDownFast = function(){
    while (this.moveDown() === true) {
      this.moveDown();
    }
  };

  return {
    Block: Block,
    init: init
  }

})(TET.MainModule);