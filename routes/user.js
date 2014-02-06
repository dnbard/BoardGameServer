var keySecurity = require('../models/keys-security.js');

exports.register = function(req, res){
    if (!req.body || !req.body.hashc || !req.body.passw || !req.body.login){
        res.status(400).send('Bad Request');
    }

    keySecurity.validate(req.body, function(err, userInfo){
        if (err){
            res.status(500).send('Internal Server Error');
        }

        res.status(200).send();
    });
}
