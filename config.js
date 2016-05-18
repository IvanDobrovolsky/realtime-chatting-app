const lessMiddleware = require('less-middleware');
const parserMiddleware = require('body-parser');

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

        //Parse application/x-www-form-urlencoded
        app.use(parserMiddleware.urlencoded({ extended: false }));

        //Setting public directory for the client
        app.use(express.static(publicDirectory));
    }
};