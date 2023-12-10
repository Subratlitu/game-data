const Game = require('../model/gameSchema');

// Create a new game entry
const createGame = async (req, res) => {
  try {
    const { userId, playerName,result,playerStatistics } = req.body;
    if(!userId || !playerName || !result){
        res.status(400).send({status:false,message:"please enter required fields"})
        return
    }
    const newGame = new Game({ userId, playerName,result,playerStatistics });
    const savedGame = await newGame.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve game data for a specific user
const getGameData = async (req, res) => {
  try {
    const { userId } = req.params;
    const games = await Game.find({ userId });
    if(!games || games.length < 1){
        return res.status(404).send("data not found ")
    }
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update game data for a specific user
const updateGameData = async (req, res) => {
  try {
   
    const { userId } = req.params;
    const {result,playerName,playerStatistics} = req.body;
    const updatedGame = await Game.findOneAndUpdate({userId:userId},{result,playerName,playerStatistics})
    return res.status(200).json(updatedGame);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a game entry
const deleteGame = async (req, res) => {
  try {
    const { userId } = req.params;
    await Game.findOneAndDelete({userId:userId});
    return res.status(204).send("deleted successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createGame, getGameData, updateGameData, deleteGame };
