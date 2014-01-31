var routes = require('./routes'),
    login = require('./routes/login.js'),
    auth = require('./auth.js');


var init = function(app){
    app.get('/', auth.restrict, routes.index);

    app.get('/login', login.index);
};

exports.init = init;
