const config = require('./config');

const express = require('express');

//Initializing the app
const app = express();
config.init(app, express);

app.get('/', (request, response) => {
   response.render('home', {title: 'Node.js + Socket.io realtime webchat'});
});

console.log(`The app is running on port ${config.port}`);
app.listen(config.port);


