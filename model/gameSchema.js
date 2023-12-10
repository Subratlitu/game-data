const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  playerName: { type: String, required: true },
  result: { type: String, required: true },
  playerStatistics:{type:String }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
