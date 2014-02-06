var keySecurity = require('../models/keys-security.js');

exports.getIdKey = function(req, res){
    var id = req.query.id;
    if (!id) {
        res.status(400).send('Bad Request');
    }

    var hash = keySecurity.addKey(id);

    res.send({
        key: hash
    });
};