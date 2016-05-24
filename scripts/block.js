'use strict;'

var TET = TET || {};

TET.BlockModule = (function(MainModule){

  var _board;

  function init(){
    _board = MainModule.getBoard();
  }

  function _randomShape(){
    // TODO: pick a random shape

    return 'square1'
  }

  function _initialLocations(shape){
    var randStart = Math.floor(Math.random() * 10);

    // TODO: set up multiple shapes.
    var locationReference = {
      square1: [
        {x: randStart, y: 0}
      ]
    };

    return locationReference[shape];
  }

  // Constructor for new block
  function Block(){
    this.init();
  }

  Block.prototype.init = function(){
    var shape = _randomShape();
    this.locations = _initialLocations(shape);
    this.setRotationCenter(shape);
  };

  Block.prototype.move = function(direction){
    var directionReference = {
      down: {x: 0, y: 1},
      right: {x: 1, y: 0},
      left: {x: -1, y: 0}
    }

    var newLocation = directionReference[direction];

    if (this.checkOpenNext(newLocation) === true){
      this.locations.forEach(function(e){
        e.x += newLocation.x;
        e.y += newLocation.y;
      });
      return true;
    } else {
      _board.freezeBlock(this.locations);
      MainModule.addNewBlock();
      return false;
    }
  };

  Block.prototype.checkOpenNext = function(newLocation){
    var empty = true;

    for (var i = 0; i < this.locations.length; i++){
      var e = this.locations[i];
      var hitOccupied = _board.state[e.x + newLocation.x][e.y + newLocation.y] !== 0;
      var hitBottom = e.y >= _board.state[0].length;
      var hitRight = e.x >= _board.state.length;
      var hitLeft = e.x < 0;
      // Make sure the square below is empty or that we are not at the bottom
      if ( hitOccupied || hitBottom || hitRight || hitLeft ){
        empty = false;
        break
      }
    }

    return empty;
  };

  Block.prototype.moveDownFast = function(){
    while (this.move('down') === true) {
      this.move('down');
    }
  };

  // TODO: fill in for other shapes. Increment rotation center with each move
  Block.prototype.setRotationCenter = function(shape) {
    var centerReference = {
      square1: this.locations[0]
    };

    this.rotationCenter = centerReference[shape];
  };

  return {
    Block: Block,
    init: init
  }

})(TET.MainModule);