exports.index = function(req, res){
  res.render('index',
      {
          user: res.locals.auth? res.locals.user: false
      });
};