const router = require('express').Router();
const passport = require('passport');
const keys = require('../configs/keys');
const Crypto = require('cryptr');
const axios = require('axios');
const cryptr = new Cryptr(keys.session.cookieKey);

const CALLBACK_URL = 'http://localhost:5000/auth/patreon/redirect';

router.get('/twitch', passport.authenticate('twitch', {
	scope: ["user_read"]
}));

const cookieSetter = (req, res, next) => {
  // check if client sent cookie
  var cookie = req.cookies['id_token'];
  if (cookie === undefined && req.user)
  {
    // no: set a new cookie
    res.cookie('id_token', req.user.id, { maxAge: 24 * 60 * 60 * 60, httpOnly: false });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next();
};

//callback for twitch to redirect to
router.get('/twitch/redirect', passport.authenticate('twitch'), (req, res) => {
	
	req.session.user = req.user;
	//Set Cookie
	var cookie = req.cookies['id_token'];
	if (cookie === undefined && req.user)
	{
		console.log(cookie);
		// no: set a new cookie
		console.log('about to make cookie');
		console.log('user: ' + req.user);
		res.cookie('id_token', req.user.id, { maxAge: 24 * 60 * 60 * 60, httpOnly: false });
		console.log('cookie created successfully');
	} else {
		// yes, cookie was already present 
		console.log('cookie exists', cookie);
	} 

	res.redirect('http://localhost:3000/home');

});

router.get('/patreon', (req, res) => {

	let patreonURL = 'https://www.patreon.com/oauth2/authorize?';
	patreonURL += 'response_type=code&';
	patreonURL += 'client_id=' + keys.patreon.clientID + '&';
	patreonURL += 'redirect_uri=' + CALLBACK_URL;

	res.redirect(patreonURL);
});

router.get('/patreon/redirect', (req, res) => {
	let otc = req.query.code;

	axios.post('https://www.patreon.com/oauth2/token', {
		code: otc,
		grant_type: [authorization_code],
		client_id: keys.patreon.clientID,
		client_secret: keys.patreon.clientSecret,
		redirect_uri: CALLBACK_URL
	}).then(response => {
		let token = response.access_token;
		//Get User Data
		axios.get('https://patreon.com/api/oauth2/api/current_user', { 
			headers: {"Authorization" : `Bearer ${token}`}
		}).then(response => {
			//vanity, thumb_url
			let {thumb_url, vanity} = response.data.attributes;
			//Loop and get Stream Achievements pledge
		});
		//Encrypt access token

		//store token in User table
	});
})

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('http://localhost:3000/');
});

module.exports = router;

//TODO: move react code to be on server side instead of client, simple express served application using EJS for templates