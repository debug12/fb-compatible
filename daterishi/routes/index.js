
/*
 * GET home page.
 */

//8328jm whenisgoodcode
//xe9rxg whenisgoodcode 2

 /*These are the modules required for this application*/
 var config = require('../scripts/info');
 var passport = require('passport');
 //var rishi = require('../scripts/rishi');
 var algo = require('../scripts/algo');
 var FacebookStrategy = require('passport-facebook').Strategy;
 var graph = require('fbgraph');
 var fs = require('fs');

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

exports.fbauth = passport.authenticate('facebook', {scope: config.permissions});

exports.fbcallback = passport.authenticate('facebook', { successRedirect: '/algorithm',
														 failureRedirect: '/failure'});

exports.loggedin = function(req, res){
	res.render('index', {title: "Logged in "});
}

exports.algorithm = function(req, res){
	graph.get('/'+req.user+config.query, function(e, resp){
		graph.get('/rishizaveri1994'+config.query, function(e, rish){
			if(e){
				res.send("You are not friends with rishi.");
			} else {
				graph.get('/'+req.user+'/mutualfriends?user=rishizaveri1994&fields=id', function(e, friends){
					resp.mutualfriends = friends.data.length;
					var response = algo.algo(resp, rish);
					console.log(response);
					res.send(resp);
				})
			}
		})
	});
}