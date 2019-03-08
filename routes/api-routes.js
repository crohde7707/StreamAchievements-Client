const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');

router.get("/token", passport.authenticate('twitch'), (req, res) => {
    return res.json({ success: true, data: req.user.id });
  });

router.get("/user", (req, res) => {
	console.log(req.cookies);
	User.findById(req.cookies.id_token).then((foundUser) => {
		res.json({
			username: foundUser.name,
			logo: foundUser.logo
		});
	});
});

router.get("/channel/create", (req, res) => {
	User.findById(req.cookies.id_token).then((foundUser) => {
		Channel.findOne({twitchID: foundUser.id}).then((existingChannel) => {
			if(existingChannel) {
				res.json({
					error: 'Channel already exists!',
					channel: existingChannel
				});
			} else {
				new Channel({
					name: foundUser.name,
					twitchID: foundUser.twitchID,
					logo: foundUser.logo,
					achievements: [],
					theme: ''
				}).save().then((newChannel) => {
					foundUser.channelID = newChannel.id;
					foundUser.save().then((savedUser) => {
						res.json({
							channel: newChannel
						});
					});
					
				});		
			}
		})
	});
});

router.get("/achievement/create", (req, res) => {
	new Achievement({
		title: "Taco Hoarder",
		description: "Gained a total of 500,000 tacos",
		icon: "foobar",
		percent: "0%"
	}).save().then((newAchievement) => {
		res.json({
			achievement: newAchievement
		});
	});
});

router.get("/achievements/retrieve", (req, res) => {
	let channel = req.query.id;

	Achievement.find({channel: channel}).then((achievements) => { 
		res.json(achievements);
	});
});

router.get('/channels/get', (req, res) => {
	Channel.find({}, (err, channels) => {
		// let channelMap = {};

		// channels.forEach((channel) => {
		// 	channelMap[channel.id] = channel
		// });

		res.json(channels);
	})
});

router.get("/channels/user", (req, res) => {

	let testData = [
		{logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/694825d9-0ab8-460f-ab9c-8886e26b6563-profile_image-300x300.png", name: "phirehero", percentage: "100%"},
		{logo: "https://static-cdn.jtvnw.net/jtv_user_pictures/thorlar-profile_image-4bd4d7b82e71afc3-300x300.jpeg", name: "Thorlar", percentage: "57%"},
		{logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSkCz4staWr-jVGJL7YYcQueuaI_p3biFBEnlqc_S-aOaXCxEIQ", name: "hollieBB", percentage: "0%"}
	];

	res.json(testData);
});

router.get('/channel/retrieve', (req, res) => {
	let channel = req.query.id;

	Channel.findOne({name: channel}).then((foundChannel) => {
		if(foundChannel) {
			
			Achievement.find({channel: channel}).then((foundAchievements) => { 
				res.json({
					channel: foundChannel,
					achievements: foundAchievements
				});
			});
			
		} else {
			res.json({
				error: "No channel found for the name: " + channel
			});
		}
	})
})

module.exports = router;