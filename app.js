const config = require('./config');

const express = require('express');

//TODO implement for all users not a single one

//Initializing the app
const app = express();
config.init(app, express);


const io = require('socket.io').listen(app.listen(config.port));
console.log(`The app is running on port ${config.port}`);

//Handling requests
require('./routes')(app, io);

