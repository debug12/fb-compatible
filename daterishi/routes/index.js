
/*
 * GET home page.
 */

 /*These are the modules required for this application*/
 var config = require('../scripts/info');
 var passport = require('passport');
 //var rishiData = require('../scripts/rishi');
 var FacebookStrategy = require('passport-facebook').Strategy;
 var graph = require('fbgraph');

 passport.serializeUser(function(user, done){
 	done(null, user.id);
 })

 passport.deserializeUser(function(user, done){
 	done(null, user);
 })

 passport.use(new FacebookStrategy({
 	clientID: config.ID,
 	clientSecret: config.secret,
 	callbackURL: config.redirect
 },
 	function(accessToken, refreshToken, profile, done){
 		graph.setAccessToken(accessToken);
 		var user = {
 			id: profile._json.id
 		}
 	 	done(null, user);
	}
 ));

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.fbauth = passport.authenticate('facebook', {scope: ['email', 'read_stream', 'publish_actions']});

exports.fbcallback = passport.authenticate('facebook', { successRedirect: '/loggedin',
														 failureRedirect: '/'});

exports.loggedin = function(req, res){
	res.render('index', {title: "Logged in "});
}

exports.algorithm = function(req, res){
	graph.get('')
}