var routes = require('./routes'),
    login = require('./routes/login.js'),
    auth = require('./auth.js'),
    security = require('./routes/security.js'),
    user = require('./routes/user.js');


var init = function(app){
    app.get('/', auth.restrict, routes.index);

    app.get('/login', login.index);
    app.post('/api/user/register', user.register);

    app.get('/api/security/getkey', security.getIdKey);
};

exports.init = init;
