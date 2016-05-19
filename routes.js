const users = new Set();

//TODO Make a SPA client
module.exports = (app, io) => {

    let isLogined = false;
    let arePeopleInChat = false;

    app.get('/', (request, response) => {
        response.render('home', {title: 'Node.js + Socket.io realtime webchat'});
    });

    app.get('/login', (request, response) => {
        response.render('login', {avatar: "images/unnamed.jpg"});
    });

    app.get('/invite', (request, response) => {
        //TODO Link is hardcoded for now(Add a real one!)
        response.render('invitation', {link: 'localhost:4444'})
    });

    app.get('/chat', (request, response) => {
        if(isLogined){
            //response.render('chat');
        } else {
            response.redirect('/login');
        }
    });

    //Handling 404 request
    app.get('*', (request, response) => {
        response.status(404);
        response.render('404', {title: "The page you requested cannot be found!"});
    });

    //Connection
    io.on('connection', socket => {
        console.log("A user connected!");

        //Disconnecting
        socket.on('disconnect', () => console.log("A user is disconnected!"));


        //Login
        socket.on('login', (data) => {
            console.log('login', data);

            const id = data.username + Date.now();
            if(users.size >= 1){
                socket.emit('authorized', {token: id, id});
            } else {
                socket.emit("noUsersInChat", {});
            }
        })

    });

};