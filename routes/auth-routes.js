const router = require('express').Router();
const passport = require('passport');
const keys = require('../configs/keys');
const Cryptr = require('cryptr');
const axios = require('axios');
const cryptr = new Cryptr(keys.session.cookieKey);
const User = require('../models/user-model');

//patreon
let url = require('url');
let patreon = require('patreon');
let patreonAPI = patreon.patreon;
let patreonOAuth = patreon.oauth;

let patreonOauthClient = patreonOAuth(keys.patreon2.clientID, keys.patreon2.clientSecret);

const CALLBACK_URL = 'http://localhost:5000/auth/patreon/redirect';

router.get('/twitch', passport.authenticate('twitch', {
	scope: ["user_read"]
}));

//callback for twitch to redirect to
router.get('/twitch/redirect', passport.authenticate('twitch'), (req, res) => {

	//Set Cookie
	var cookie = req.cookies['etid'];
	if (cookie === undefined)
	{
		// no: set a new cookie
		console.log('about to make cookie');
		res.cookie('etid', req.user.integration.twitch.etid, { maxAge: 24 * 60 * 60 * 60, httpOnly: false });
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
	patreonURL += 'client_id=' + keys.patreon2.clientID + '&';
	patreonURL += 'redirect_uri=' + CALLBACK_URL;
	patreonURL += '&scope=campaigns%20identity%20identity%5Bemail%5D%20identity.memberships%20campaigns.members'

	res.redirect(patreonURL);
});

router.get('/patreon/redirect', (req, res) => {
	let oauthGrantCode = req.query.code;

	return patreonOauthClient.getTokens(oauthGrantCode, CALLBACK_URL).then(tokenResponse => {
		let patreonAPIClient = patreonAPI(tokenResponse.access_token)
		let etid = (req.cookies.etid);

		return new Promise((resolve, reject) => {
							
			let at = cryptr.encrypt(tokenResponse.access_token);
			let rt = cryptr.encrypt(tokenResponse.refresh_token);

			//axios.get('https://www.patreon.com/api/oauth2/v2/identity?include=memberships', {
			axios.get('https://www.patreon.com/api/oauth2/v2/identity?include=memberships&fields%5Buser%5D=thumb_url,vanity&fields%5Bmember%5D=patron_status', {
				headers: {
					Authorization: `Bearer ${tokenResponse.access_token}`
				}
			}).then(res => {
				console.log(res.data.data);
				console.log(res.data.included);
				// resolve({
				// 	thumb_url: res.data.data.attributes.thumb_url,
				// 	vanity: res.data.data.attributes.vanity,
				// 	patreonID: res.data.data.id,
				// 	at,
				// 	rt,
				// 	etid
				// });

				// axios.get('https://www.patreon.com/api/oauth2/v2/campaigns/2604384/members#include=currently_entitled_tiers', {
				// 	headers: {
				// 		Authorization: `Bearer ${tokenResponse.access_token}`
				// 	}	
				// }).then(res => {
				// 	console.log(res.data);
				// });
			});
		});
	}).then(({thumb_url, vanity, patreonID, at, rt, etid}) => {
		console.log(thumb_url);
		console.log(vanity);

		User.findOne({'integration.twitch.etid': etid}).then(foundUser => {
			if(foundUser) {

				let integration = Object.assign({}, foundUser.integration);

				integration.patreon = {thumb_url, vanity, id: patreonID, at, rt};

				foundUser.integration = integration;

				foundUser.save().then(savedUser => {
					//2604384
					res.redirect('http://localhost:3000/profile');
				});
			}
		});

	});
})

router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('http://localhost:3000/');
});

module.exports = router;
