'use strict;'

var TET = TET || {};

TET.BlockModule = (function(MainModule){

  var _board;

  function init(){
    _board = MainModule.getBoard();
  }

  function _randomShape(){
    var shapes = ['square', 'bar', 'lRight', 'lLeft', 'sRight', 'sLeft'];
    var randomIndex = Math.floor(Math.random() * 6);
    return shapes[randomIndex];
  }

  function _initialLocations(shape){
    var randStart;

    if (shape === 'bar') {
      randStart = Math.floor(Math.random() * 10);
    } else {
      randStart = Math.floor(Math.random() * 9);
    }

    var locationReference = {
      square: [
        {x: randStart, y: 2},
        {x: randStart + 1, y: 2},
        {x: randStart, y: 3},
        {x: randStart + 1, y: 3}
      ],
      bar: [
        {x: randStart, y: 0},
        {x: randStart, y: 1},
        {x: randStart, y: 2},
        {x: randStart, y: 3}
      ],
      lRight: [
        {x: randStart, y: 1},
        {x: randStart, y: 2},
        {x: randStart, y: 3},
        {x: randStart + 1, y: 3}
      ],
      lLeft: [
        {x: randStart + 1, y: 1},
        {x: randStart + 1, y: 2},
        {x: randStart + 1, y: 3},
        {x: randStart, y: 3}
      ],
      sRight: [
        {x: randStart, y: 2},
        {x: randStart, y: 1},
        {x: randStart + 1, y: 1},
        {x: randStart + 1, y: 0}
      ],
      sLeft: [
        {x: randStart + 1, y: 2},
        {x: randStart + 1, y: 1},
        {x: randStart, y: 1},
        {x: randStart, y: 0}
      ]
    };

    return locationReference[shape];
  }

  function _checkEmpty(newLocs){
    var empty = true;

    for (var i = 0; i < newLocs.length; i++){
      // Check if off the board
      if (newLocs[i].x > 9 || newLocs[i].x < 0 || newLocs[i].y > 24){
        empty = false;
        break
      // Check if block already there
      } else if (_board.state[newLocs[i].y][newLocs[i].y] === 1) {
        empty = false;
        break
      }
    }

    return empty;
  }

  // Constructor for new block
  function Block(){
    this.init();
  }

  Block.prototype.init = function(){
    var shape = _randomShape();
    this.shape = shape;
    this.rotation = 0;
    console.log('adding new ' + shape + ' block');
    this.locations = _initialLocations(shape);
  };

  Block.prototype.move = function(direction){
    var canMoveDown = this.openDown();
    var dirDown = direction === 'down'

    if ( direction === 'down' && !canMoveDown ){
      _board.freezeBlock(this.locations);
      MainModule.addNewBlock();
      return false;
    } else if ((!dirDown && this.openRightLeft(direction)) ||
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

  Block.prototype.openRightLeft = function(dir){
    var empty = true;

    for (var i = 0; i < this.locations.length; i++){
      var e = this.locations[i];
      // Make sure the square isn't already at walls
      if ( (dir === 'right' && e.x >= 9) ||
           (dir === 'left' && e.x <= 0) ){
        empty = false;
        console.log('hit wall');
        break
      } else if (
        (dir === 'right') && (_board.state[e.y][e.x + 1] !== 0) ||
        (dir === 'left') && (_board.state[e.y][e.x - 1] !== 0) ){
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
      if ( e.y >= 23 ){
        empty = false;
        break
      } else if (_board.state[e.y + 1][e.x] !== 0) {
        empty = false;
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

  Block.prototype.rotate = function(){
    // Don't use computer to process a square
    if (this.shape !== 'square'){
      console.log('Trying to rotate...')
      var newLocations;

      if (this.shape === 'sRight' || this.shape === 'sLeft'){
        if (this.rotation === 0 || this.rotation === 180){
          newLocations = [
            {x: this.locations[0].x - 1, y: this.locations[0].y - 1},
            this.locations[1],
            {x: this.locations[2].x - 1, y: this.locations[2].y + 1},
            {x: this.locations[3].x, y: this.locations[3].y + 2}
          ];
        } else {
          newLocations = [
            {x: this.locations[0].x + 1, y: this.locations[0].y + 1},
            this.locations[1],
            {x: this.locations[2].x + 1, y: this.locations[2].y - 1},
            {x: this.locations[3].x, y: this.locations[3].y - 2}
          ];
        }
      } else if (this.shape === 'bar'){
        if (this.rotation === 0 || this.rotation === 180){
          newLocations = [
            {x: this.locations[0].x + 1, y: this.locations[0].y + 2},
            {x: this.locations[1].x, y: this.locations[1].y + 1},
            {x: this.locations[2].x - 1, y: this.locations[2].y},
            {x: this.locations[3].x - 2, y: this.locations[3].y - 1}
          ];
        } else {
          newLocations = [
            {x: this.locations[0].x - 1, y: this.locations[0].y - 2},
            {x: this.locations[1].x, y: this.locations[1].y - 1},
            {x: this.locations[2].x + 1, y: this.locations[2].y},
            {x: this.locations[3].x + 2, y: this.locations[3].y + 1}
          ];
        }
      } else if (this.shape === 'lLeft'){
        if (this.rotation === 0) {
          newLocations = [
            {x: this.locations[0].x + 1, y: this.locations[0].y + 2},
            {x: this.locations[1].x, y: this.locations[1].y + 1},
            {x: this.locations[2].x - 1, y: this.locations[2].y},
            {x: this.locations[3].x, y: this.locations[3].y - 1}
          ];
        } else if (this.rotation === 90){
          newLocations = [
            {x: this.locations[0].x - 2, y: this.locations[0].y + 1},
            {x: this.locations[1].x - 1, y: this.locations[1].y},
            {x: this.locations[2].x, y: this.locations[2].y - 1},
            {x: this.locations[3].x + 1, y: this.locations[3].y}
          ];
        } else if (this.rotation === 180){
          newLocations = [
            {x: this.locations[0].x - 1, y: this.locations[0].y - 2},
            {x: this.locations[1].x, y: this.locations[1].y - 1},
            {x: this.locations[2].x + 1, y: this.locations[2].y},
            {x: this.locations[3].x, y: this.locations[3].y + 1}
          ];
        } else {
          newLocations = [
            {x: this.locations[0].x + 2, y: this.locations[0].y - 1},
            {x: this.locations[1].x + 1, y: this.locations[1].y},
            {x: this.locations[2].x, y: this.locations[2].y + 1},
            {x: this.locations[3].x - 1, y: this.locations[3].y}
          ];
        }
      } else if (this.shape === 'lRight'){
        if (this.rotation === 0) {
          newLocations = [
            {x: this.locations[0].x + 2, y: this.locations[0].y + 1},
            {x: this.locations[1].x + 1, y: this.locations[1].y},
            {x: this.locations[2].x, y: this.locations[2].y - 1},
            {x: this.locations[3].x - 1, y: this.locations[3].y}
          ];
        } else if (this.rotation === 90){
          newLocations = [
            {x: this.locations[0].x - 1, y: this.locations[0].y + 2},
            {x: this.locations[1].x, y: this.locations[1].y + 1},
            {x: this.locations[2].x + 1, y: this.locations[2].y},
            {x: this.locations[3].x, y: this.locations[3].y - 1}
          ];
        } else if (this.rotation === 180){
          newLocations = [
            {x: this.locations[0].x - 2, y: this.locations[0].y - 1},
            {x: this.locations[1].x - 1, y: this.locations[1].y},
            {x: this.locations[2].x, y: this.locations[2].y + 1},
            {x: this.locations[3].x + 1, y: this.locations[3].y}
          ];
        } else {
          newLocations = [
            {x: this.locations[0].x + 1, y: this.locations[0].y - 2},
            {x: this.locations[1].x, y: this.locations[1].y - 1},
            {x: this.locations[2].x - 1, y: this.locations[2].y},
            {x: this.locations[3].x, y: this.locations[3].y + 1}
          ];
        }
      }


      // Check empty future location
      if (_checkEmpty(newLocations)) {
        console.log('...successfully rotating.')
        this.locations = newLocations;
        this.rotation = (this.rotation + 90) % 360;
      }
    }
  };

  return {
    Block: Block,
    init: init
  };

})(TET.MainModule);