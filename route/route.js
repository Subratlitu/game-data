const express = require('express')
const route = express.Router()
const userController = require('../controller/user')
const gameController = require('../controller/game')

route.post('/register',userController.userRegister)
route.get('/login',userController.userLogin)


//***************************************

route.post('/createGame', gameController.createGame);
route.get('/game/:userId', gameController.getGameData);
route.put('/game/:userId', gameController.updateGameData);
route.delete('/game/:userId', gameController.deleteGame);







module.exports = route