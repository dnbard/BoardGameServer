exports.index = function(req, res){
    res.render('login');
};

exports.logout = function(req, res){
    res.cookie('uid', 'nil', { maxAge: 2678400000, httpOnly: true });
    res.status(200).send();
};
