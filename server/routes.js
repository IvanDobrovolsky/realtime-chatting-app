const users = [];

const gravatar = require('gravatar');

module.exports = (app, io) => {

    app.get('/', (request, response) => {
        response.render('home', {title: 'Node.js + Socket.io realtime webchat'});
    });

    app.get('/invite', (request, response) => {
        //TODO Link is hardcoded for now(Add a real one!)
        response.render('invitation', {link: 'localhost:4444'})
    });

    app.get('/chat', (request, response) => {
        response.render('chat', {avatar: "img/unnamed.jpg"});
    });

    //Handling 404 request
    app.get('*', (request, response) => {
        response.status(404);
        response.render('404', {title: "The page you requested cannot be found!"});
    });


    //Working with websockets
    io.on('connection', socket =>{

        let user = {};


        //TODO remove user after disconnecting
        //Disconnecting
        socket.on('disconnect', () => {
            //Notifying that a user was disconnected
            console.log(`A user '${user.username}' was disconnected!`);

            //Removing a user object from the store
            users.splice(users.findIndex(u => u.id === user.id), 1);

            //Broadcasting an event and notifying other users about it
            socket.broadcast.emit('userLeftChat', {user, other: users});
        });

        //Login
        socket.on('login', newUser => {
            console.log(`A user '${newUser.username}' is connected and logged in!`);

            user = newUser;

            //Adding static id property to the user's object
            Object.defineProperty(user, 'id', {
                enumerable: true,
                configurable: false,
                writable: false,
                value: user.username + Date.now()
            });

            user.avatar =  gravatar.url(user.username, {s: '140', r: 'x', d: 'retro'});

            socket.emit('youJoinedChat', {user, other: users});

            //Adding new user to the store
            users.push(user);

            //Notifying all users (except the one who just logged in) from the chat the a new user joined
            socket.broadcast.emit('newUserJoinedChat', {user, other: users});
        });


        //Message
        socket.on('message', message => {

            socket.broadcast.emit('messageToAll', message);
        });


    });
};