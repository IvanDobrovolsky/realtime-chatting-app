const path = require('path');
const publicDirectory = path.resolve(__dirname, '../client/build');

module.exports = {
    port: 4444,
    init(app, express){

        //Setting template engine
        app.set('view engine', 'jade');

        //Setting a directory for views
        app.set('views', path.resolve(__dirname, '../views'));

        //Setting public directory for the client
        app.use(express.static(publicDirectory));
    }
};