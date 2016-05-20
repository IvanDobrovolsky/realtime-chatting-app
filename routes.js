const users = new Set();

module.exports = (app, io) => {

    app.get('/', (request, response) => {
        response.render('home', {title: 'Node.js + Socket.io realtime webchat'});
    });

    app.get('/invite', (request, response) => {
        //TODO Link is hardcoded for now(Add a real one!)
        response.render('invitation', {link: 'localhost:4444'})
    });

    app.get('/chat', (request, response) => {
        response.render('chat', {avatar: "images/unnamed.jpg"});
    });

    //Handling 404 request
    app.get('*', (request, response) => {
        response.status(404);
        response.render('404', {title: "The page you requested cannot be found!"});
    });


    //Working with websockets
    io.on('connection', socket =>{

        let newUser = {};

        //Disconnecting
        socket.on('disconnect', () => console.log(`A user '${newUser.username}' was disconnected!`));

        //Login
        socket.on('login', user => {
            console.log(`A user '${user.username}' is connected and logged in!`);
            newUser = user;

            //Adding static id property to the user's object
            Object.defineProperty(newUser, 'id', {
                enumerable: true,
                configurable: false,
                writable: false,
                value: user.username + Date.now()
            });

            users.add(newUser);

            //Notifying all users (except the one who just logged in) from the chat the a new user joined
            socket.broadcast.emit('newUser', newUser);
        })

    });
};