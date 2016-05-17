const lessMiddleware = require('less-middleware');

const publicDirectory = __dirname + '/public';

module.exports = {
    port: 4444,
    init(app, express){

        //Setting template engine
        app.set('view engine', 'jade');

        //Setting a directory for views
        app.set('views', __dirname + '/views');

        //Configuring less middleware
        app.use(lessMiddleware(publicDirectory), []);

        //Setting public directory for the client
        app.use(express.static(publicDirectory));
    }
};