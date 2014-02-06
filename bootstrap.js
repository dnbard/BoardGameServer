var Users = require('./models/users.js'),
    config = require('./config.js');

var userAuth = function(req, res, next){
    var authFailure = function(){
        res.locals.auth = false;
        next();
    };

    var userToken = req.cookies.uid;
    Users.FindByToken(userToken, function(user){
        if (user.length > 0){
            res.locals.user = user[0];
            res.locals.auth = true;
            var name = user[0].login;
            next();
        } else authFailure();
    }, function(){
        authFailure()
    });
}

exports.userAuth = userAuth;
