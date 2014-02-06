var mongoose = require('mongoose'),
    utils = require('../utils.js'),
    AES = require('../public/javascripts/crypt/aes.js');

var keySecuritySchema = mongoose.Schema({
    challenge: String,
    key: String,
    hash: String,
    timestamp: { type: Date, default: Date.now }
});

var keySecurity = mongoose.model('keySecurity', keySecuritySchema);

exports.addKey = function(challenge){
    var entity = new keySecurity();
    entity.challenge = challenge;
    entity.key = utils.guid();
    entity.hash = AES.enc(entity.key, entity.challenge);
    entity.save();

    return entity.hash;
}

exports.validate = function(package, callback){
    keySecurity.findOne({hash: package.hashc}, function(err, entity){
        if (err) callback(err);
        else {
            var userInfo = {
                login: AES.dec(package.login, entity.key),
                password: AES.dec(package.passw, entity.key)
            };

            callback(null, userInfo);
        }

        entity.remove();
    });
}