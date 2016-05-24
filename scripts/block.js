'use strict;'

var TET = TET || {};

TET.BlockModule = (function(){

  // TODO: fill in for other shapes
  var _rotationCenters = {
    square: {x: 5, y: 0}
  };

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
    this.locations.forEach(function(e){
      // TODO: check board first
      e.y += 1;
    });
  };

  return {
    Block: Block
  }

})();