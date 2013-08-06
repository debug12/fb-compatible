
/*
 * GET home page.
 */
 var config = require('../scripts/info');
 var graph = require('fbgraph');

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.fbauth = function(req, res){
	if(!req.query.code){
		var authUrl = graph.getOauthUrl({
			"client_id": 	config.ID 
			,"redirect_uri": config.redirect
			,"scope:"      : config.scope
		});
		if(!req.query.error){
			res.redirect(authUrl);
		} else{
			res.send('access denied.');
		}
		return;
	}
	graph.authorize({
		"client_id": config.ID,
		"redirect_uri": config.redirect,
		"client_secret": config.secret,
		"code": req.query.code
	}, function(e, facebookRes){
		res.redirect('/loggedin');
	})
}

exports.loggedin = function(req, res){
	res.render('index', {title: "Logged in "});
}