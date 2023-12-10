const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const route = require('./routes/route');

let mySqlConnection = require("./db/mySqlConnection")
const {mongoose,connectToMongo} = require('./db/mongoConnection')
const route = require('./route/route')
const subscribeToEvents = require('./eventSubscriber');

// Connect to RabbitMQ and start subscribing to events
subscribeToEvents();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
 
connectToMongo()
app.use('/',route)
 
app.listen( 3000, function () {
    console.log('Express app running on port ' + (  3000))
});