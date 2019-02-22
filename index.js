const express = require('express');
const path = require('path');
const port = process.env.PORT || 5000;

const TWITCH_CLIENT_ID = 'zx83pxp0b4mkeu931upd21a6f9clv4';
const TWITCH_SECRET = 'qgv9qxs71zt3c1g4q1y571bl3ox0s8';
const SESSION_SECRET = process.env.SESSION_SECRET;
const CALLBACK_URL = 'http://localhost:3000/auth/twitch/callback';

let session = require('express-session');
let passport = require('passport');
let OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
let request = require('request');

let app = express();

app.use(session({secret: SESSION_SECRET, resave: false, saveUninitialized: false}))
app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

OAuth2Strategy.prototype.userProfile = function(accessToken, done) {
	let options = {
		url: 'https://api.twitch.tv/helix/users',
		method: 'GET',
		headers: {
			'Authorization': `Bearer ${accessToken}`
		}
	};

	console.log(options);

	request(options, (error, response, body) => {
		if (response && response.statusCode == 200) {
			done(null, JSON.parse(body));
		} else {
			done(JSON.parse(body));
		}
	});
}

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});

let oauthOptions = {
	authorizationURL: 'https://id.twitch.tv/oauth2/authorize',
	tokenURL: 'https://id.twitch.tv/oauth2/token',
	clientID: TWITCH_CLIENT_ID,
	clientSecret: TWITCH_SECRET,
	callbackURL: CALLBACK_URL,
	state: true
};

passport.use('twitch', new OAuth2Strategy(oauthOptions, (accessToken, refreshToken, profile, done) => {
	profile.accessToken = accessToken;
	profile.refreshToken = refreshToken;

	done(null, profile);
}));

app.get('/auth/twitch', passport.authenticate('twitch', { scope: 'user:read:email'}));
app.get('/auth/twitch/callback', passport.authenticate('twitch', { successRedirect: '/', failureRedirect: '/'}));

app.get('/api/authenticate', function(req, res, next) {
  
  passport.authenticate('twitch', function(err, user, info) {

    if (err) { 
    	return next(err);
    }

    if (!user) { 
    	return res.redirect('/auth/twitch')
    }

    req.logIn(user, function(err) {
      if (err) { return next(err); }

      return res.redirect('/?user=' + user.username);
    });
  })(req, res, next);
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
	console.log(req);
	console.log(req.session);
	if(req.session && req.session.passport && req.session.passport.user) {
		res.send(req.session.passport.user);
	} else {
		res.send('Twitch Auth Sample <a href="/auth/twitch"><img src="//discuss.dev.twitch.tv/uploads/default/original/2X/0/05c21e05a37ee1291c69a747959359dab90c0af3.png" width="170" height="32"></a>')
	}
});

app.get('/api/passwords', (req, res) => {
	res.json({"foo": "bar"});

	console.log("Sent a message");
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



app.listen(port);

console.log(`Express app listening on port ${port}`)