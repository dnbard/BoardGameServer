var mongoose = require('mongoose'),
    utils = require('../utils.js');

var usersSchema = mongoose.Schema({
    login: String,
    password: String,
    token: String
});

var Users = mongoose.model('Users', usersSchema);

var findByToken = function(token, success, failure){
    if (token) {
        Users.find({ token: token },
            function(err, user){
                if (err) {
                    failure();
                } else {
                    success(user);
                }
            });
    } else {
        failure();
    }
}

var find = function(name, pass, success, failure){
    if (name && pass){
        Users.find({ login: name, password: pass },
            function(err, users){
                if (!err && users && users.length == 1){
                    var user = users[0];
                    user.token = utils.guid();
                    user.save();

                    success(user);
                } else {
                    failure();
                }
            });
    } else {
        failure();
    }
};

var getAll = function(success, failure){
    Users.find({}, function(err, users){
        if (err) failure(err);
        else {
            success(users);
        }
    });
}

exports.add = function(userInfo){
    var user = new Users();
    user.login = userInfo.login;
    user.password = userInfo.password;
    user.token = utils.guid();

    user.save();
    return user.token;
}

exports.Users = Users;
exports.Find = find;
exports.FindByToken = findByToken;
exports.GetAll = getAll;