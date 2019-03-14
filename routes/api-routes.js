const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');

router.get("/token", passport.authenticate('twitch'), (req, res) => {
    return res.json({ success: true, data: req.user.id });
  });

router.get("/user", (req, res) => {
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
					owner: foundUser.name,
					twitchID: foundUser.twitchID,
					theme: '',
					logo: foundUser.logo,
					achievements: [],
					members: []
				}).save().then((newChannel) => {
					foundUser.channelID = newChannel.id;
					foundUser.save().then((savedUser) => {
						res.json({
							channel: newChannel,
							user: foundUser
						});
					});
					
				});		
			}
		})
	});
});

router.post("/achievement/create", (req, res) => {
	User.findById(req.cookies.id_token).then((foundUser) => {
		Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
			//Check if achievement of same name exists
			let achievementTitle = req.data.title;
			if(existingChannel.achievements[achievementTitle]) {
				req.json({
					error: "An achievement with this name already exists!",
					channel: existingChannel,
					achievement: existingChannel.achievements[achievementTitle]
				});
			} else {
				let achData = {
					channel: existingChannel.owner,
					title: req.data.title,
					description: req.data.description,
					icon: req.data.icon,
					earnable: req.data.earnable,
					limited: req.data.limited,
					secret: false
				};
				new Achievement(achData).save().then((newAchievement) => {
					existingChannel.achievements[newAchievement.title] = newAchievement;
					existingChannel.save().then((existingChannel) => {
						req.json({
							channel: existingChannel,
							achievement: newAchievement
						});
					});
				});
			}
		});
	})
	new Achievement({
		title: "Taco Hoarder",
		description: "Gained a total of 500,000 tacos",
		icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/694825d9-0ab8-460f-ab9c-8886e26b6563-profile_image-300x300.png",
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

	Channel.findOne({owner: channel}).then((foundChannel) => {
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
});

// TEST ROUTES

router.get('/channel/test', (req, res) => {
	let channel = req.query.id;

	Channel.findOne({'owner.name': channel}).then((foundChannel) => {
		res.json({
			channel: foundChannel
		});
	});
});

module.exports = router;