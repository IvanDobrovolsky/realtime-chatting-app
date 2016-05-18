const config = require('./config');

const express = require('express');

//Initializing the app
const app = express();
config.init(app, express);

app.get('/', (request, response) => {
   response.render('home', {title: 'Node.js + Socket.io realtime webchat'});
});

app.get('/login', (request, response) => {
   response.render('login', {avatar: "images/unnamed.jpg"});
});

app.post('/submit', (request, response) => {

   const body = JSON.stringify(request.body);

   response.end(body);

});

console.log(`The app is running on port ${config.port}`);
app.listen(config.port);


