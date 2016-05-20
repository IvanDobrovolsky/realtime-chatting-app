const parserMiddleware = require('body-parser');
const path = require('path');
const publicDirectory = path.resolve(__dirname, '../client/build');

module.exports = {
    port: 4444,
    init(app, express){

        //Setting template engine
        app.set('view engine', 'jade');

        //Setting a directory for views
        app.set('views', path.resolve(__dirname, '../views'));

        //Parse application/x-www-form-urlencoded
        app.use(parserMiddleware.urlencoded({ extended: false }));

        //Setting public directory for the client
        app.use(express.static(publicDirectory));
    }
};