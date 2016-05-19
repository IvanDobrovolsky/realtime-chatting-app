const users = new Set();


module.exports = (app, io) => {

    let isLogined = false;
    let arePeopleInChat = false;

    app.get('/', (request, response) => {
        response.render('home', {title: 'Node.js + Socket.io realtime webchat'});
    });


    app.get('/invite', (request, response) => {
        //TODO Link is hardcoded for now(Add a real one!)
        response.render('invitation', {link: 'localhost:4444'})
    });

    app.get('/chat', (request, response) => {
        response.render('chat', {avatar: "images/unnamed.jpg"});

        //Connection
        io.on('connection', socket => {
            console.log("A user connected!");

            //Disconnecting
            socket.on('disconnect', () => console.log("A user is disconnected!"));

            //Login
            socket.on('login', user => {
                console.log("A user logged id!");

                //Adding static id property to the user's object
                Object.defineProperty(user, 'id', {
                    enumerable: true,
                    configurable: false,
                    writable: false,
                    value: user.username + Date.now()
                });

                users.add(user);

                //Notifying all users (except the one who just logged in) from the chat the a new user joined
                socket.broadcast.emit('newUser', user);
            })

        });
    });

    //Handling 404 request
    app.get('*', (request, response) => {
        response.status(404);
        response.render('404', {title: "The page you requested cannot be found!"});
    });
};