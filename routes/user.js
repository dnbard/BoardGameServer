var keySecurity = require('../models/keys-security.js'),
    users = require('../models/users.js');

exports.register = function(req, res){
    if (!req.body || !req.body.hashc || !req.body.passw || !req.body.login){
        res.status(400).send('Bad Request');
    }

    keySecurity.validate(req.body, function(err, userInfo){
        if (err){
            res.status(500).send('Internal Server Error');
        }

        var userToken = users.add(userInfo);
        res.cookie('uid', userToken, { maxAge: 2678400000, httpOnly: true })
        res.status(200).send();
    });
}
