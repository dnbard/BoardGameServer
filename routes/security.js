var AES = require('../crypt/aes.js');

exports.getIdKey = function(req, res){
    var id = req.query.id;

    res.send({
        id: id,
        encrypted: AES.enc(id, 'pass'),
        decrypted: AES.dec(AES.enc(id, 'pass'), 'pass')
    });
};