const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const mongoose = require('mongoose');

let channelRoutes = require('./channel-routes');
let achievementRoutes = require('./achievement-routes');

router.use('/channel', channelRoutes);
router.use('/achievement', achievementRoutes);

router.get("/token", passport.authenticate('twitch'), (req, res) => {
    return res.json({ success: true, data: req.user.id });
  });

let timeout = false

router.get("/user", (req, res) => {
	console.log(req.cookies.etid);


	setTimeout(() => {
		if(timeout) {
			console.log('timeout');
			res.status(500);
			res.json({
				message: 'Internal Server Issue'
			})
		}
	}, 10000)

	let timout = true;
	User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
		if(foundUser) {
			console.log('user found!');
			Channel.findOne({twitchID: foundUser.integration.twitch.etid}).then((existingChannel) => {
				timeout = false;
				if(existingChannel) {
					res.json({
						username: foundUser.name,
						logo: foundUser.logo,
						owner: true
					});
				} else {
					res.json({
						username: foundUser.name,
						logo: foundUser.logo,
						owner: false
					});
				}
			});
		} else {
			timeout = false;
			res.json({
				message: 'User was not found!'
			});
		}
		
	});
});

router.get("/profile", (req, res) => {
	User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
		if(foundUser) {
			let channelArray = foundUser.channels.map(channel => new mongoose.Types.ObjectId(channel.channelID));

			Channel.find({'_id': { $in: channelArray}}).then((channels) => {

			     responseData = channels.map((channel) => {

			     	let percentage = 0;

			     	//get percentage of achievements
			     	let earnedAchievements = foundUser.channels.filter((userChannel) => (userChannel.channelID === channel.id));

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
		} else {
			res.json({
				created: false,
				message: "You are not authorized to create achievements!"
			});
		}
	});
})

module.exports = router;