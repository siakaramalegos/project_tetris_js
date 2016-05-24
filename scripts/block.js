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
    var canMoveDown = this.openDown();
    var dirDown = direction === 'down'

    if ( direction === 'down' && !canMoveDown ){
      _board.freezeBlock(this.locations);
      MainModule.addNewBlock();
      return false;
    } else if ((!dirDown && this.openRightLeft()) ||
      (dirDown && canMoveDown)) {
      this.moveBlock(direction);
      return true;
    }
  };

  Block.prototype.moveBlock = function(direction){
    var newLocation = {
      down: {x: 0, y: 1},
      right: {x: 1, y: 0},
      left: {x: -1, y: 0}
    }[direction];

    this.locations.forEach(function(e){
      e.x += newLocation.x;
      e.y += newLocation.y;
    });
  }

  Block.prototype.openRightLeft = function(){
    var empty = true;

    for (var i = 0; i < this.locations.length; i++){
      var e = this.locations[i];
      var hitRight = e.x >= 9;
      var hitLeft = e.x <= 0;
      // Make sure the square isn't already at walls
      if ( hitRight || hitLeft ){
        empty = false;
        console.log('hit wall');
        break
      }
    };

    return empty;
  };

  Block.prototype.openDown = function(){
    var empty = true;

    for (var i = 0; i < this.locations.length; i++){
      var e = this.locations[i];
      // Make sure that we are not at the bottom or that square below is empty
      if ( e.y >= 19 ){
        empty = false;
        console.log('hit something');
        break
      } else if (_board.state[e.y + 1][e.x] !== 0) {
        empty = false;
        console.log('hit something');
        break
      }
    };

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