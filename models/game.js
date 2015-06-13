var mongoose = require('mongoose');

var gameSchema = new mongoose.Schema({
  /* 4 player models */
});

var gameModel = mongoose.model('Game', gameSchema);

module.exports = gameModel;