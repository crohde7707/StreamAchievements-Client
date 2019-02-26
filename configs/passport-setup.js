const passport = require('passport');
const TwitchStrategy = require('passport-twitch').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

const SESSION_SECRET = process.env.SESSION_SECRET;
const CALLBACK_URL = 'http://localhost:5000/auth/twitch/redirect';

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then((foundUser) => {
		done(null, user);
	});
});

passport.use(
	new TwitchStrategy({
		//options for strategy
		clientID: keys.twitch.clientID,
		clientSecret: keys.twitch.clientSecret,
		callbackURL: CALLBACK_URL
	}, (accessToken, refreshToken, profile, done) => {
		
		User.findOne({twitchID: profile.id}).then((existingUser) => {
			if(existingUser) {

				done(null, existingUser);
			} else {
				new User({
					name: profile.displayName,
					twitchID: profile.id,
					logo: profile['_json'].logo
				}).save().then((newUser) => {
					
					done(null, newUser);
				});		
			}
		})

		
	})
)