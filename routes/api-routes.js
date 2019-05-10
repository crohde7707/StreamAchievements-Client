const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const mongoose = require('mongoose');

let channelRoutes = require('./channel-routes');
let achievementRoutes = require('./achievement-routes');
const isAuthorized = require('../utils/auth-utils').isAuthorized;

router.use('/channel', channelRoutes);
router.use('/achievement', achievementRoutes);

router.get("/token", passport.authenticate('twitch'), (req, res) => {
    return res.json({ success: true, data: req.user.id });
  });

let timeout = false

router.get("/user", isAuthorized, (req, res) => {
	
	setTimeout(() => {
		if(timeout) {
			console.log('timeout');
			res.status(500);
			res.json({
				message: 'Internal Server Issue'
			})
		}
	}, 10000)

	//let timeout = true;
	let patreonInfo;
	
	if(req.user.integration.patreon) {

		let patron = req.user.integration.patreon;

		patreonInfo = {
			vanity: patron.vanity,
			thumb_url: patron.thumb_url,
			follower: patron.is_follower,
			status: patron.status,
			gold: patron.is_gold
		}
	} else {
		patreonInfo = false;
	}

	Channel.findOne({twitchID: req.user.integration.twitch.etid}).then((existingChannel) => {
		timeout = false;
		if(existingChannel) {
			console.log(patreonInfo);
			res.json({
				username: req.user.name,
				logo: req.user.logo,
				patreon: patreonInfo,
				owner: true
			});
		} else {
			res.json({
				username: req.user.name,
				logo: req.user.logo,
				patreon: patreonInfo,
				owner: false
			});
		}
	});

});

router.get("/profile", isAuthorized, (req, res) => {
	let channelArray = req.user.channels.map(channel => new mongoose.Types.ObjectId(channel.channelID));

	Channel.find({'_id': { $in: channelArray}}).then((channels) => {

	     responseData = channels.map((channel) => {

	     	let percentage = 0;

	     	//get percentage of achievements
	     	let earnedAchievements = req.user.channels.filter((userChannel) => (userChannel.channelID === channel.id));

	     	if(channel.achievements.length !== 0) {
	     		percentage = Math.round((earnedAchievements[0].achievements.length / channel.achievements.length) * 100);
	     	}

	     	return {
	     		logo: channel.logo,
	     		owner: channel.owner,
	     		percentage: percentage
	     	};
	     });

	     res.json(responseData);
	});
})

module.exports = router;