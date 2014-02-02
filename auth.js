var config = require('./config.js');

exports.restrict = function(req, res, next){
    if (config.options.redirectUri && (!res.locals.auth || !res.locals.user)){
        res.redirect(config.options.redirectUri);
    }
    next();
}
