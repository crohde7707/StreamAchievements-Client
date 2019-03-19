const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');
const mongoose = require('mongoose');

router.get("/token", passport.authenticate('twitch'), (req, res) => {
    return res.json({ success: true, data: req.user.id });
  });

router.get("/user", (req, res) => {
	User.findById(req.cookies.id_token).then((foundUser) => {
		Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
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
	});
});

router.get("/channel/create", (req, res) => {
	User.findById(req.cookies.id_token).then((foundUser) => {
		Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
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
		if(foundUser) {
			Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
				//Check if achievement of same name exists

				let query = {};

				if(req.body.id) {
					query['_id'] = req.body.id
				} else {
					query.title = req.body.title
				}

				Achievement.findOne(query).then((existingAchievement) => {
					if(existingAchievement && !req.body.edit) {
						res.json({
							error: "An achievement with this name already exists!",
							channel: existingChannel,
							achievement: existingAchievement
						});
					} else {
						let achData = {
							channel: existingChannel.owner,
							title: req.body.title,
							description: req.body.description,
							icon: req.body.icon,
							earnable: req.body.earnable,
							limited: req.body.limited,
							secret: req.body.secret
						};

						if(req.body.edit) {
							let updates = req.body;
							delete updates.edit;

							Achievement.findOneAndUpdate({ _id: existingAchievement._id }, { $set: updates }, {new:true}).then((updatedAchievement) => {
								res.json({
									achievement: updatedAchievement
								});
							});
						} else {
							new Achievement(achData).save().then((newAchievement) => {
								res.json({
									channel: existingChannel,
									achievement: newAchievement
								});
							});	
						}
					}
				});		
			});	
		} else {
			//respond back with error
		}
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

	User.findById(req.cookies.id_token).then((foundUser) => {

		//format channel ids
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

	});

});

router.get('/channel/retrieve', (req, res) => {
	let channel = req.query.id;

	if(channel) {
		Channel.findOne({owner: channel}).then((foundChannel) => {
			if(foundChannel) {
				
				Achievement.find({channel: channel}).then((foundAchievements) => {

					//grab achievements earned from user
					User.findById(req.cookies.id_token).then((foundUser) => {

						let earned = foundUser.channels.filter((channel) => (channel.channelID === foundChannel.id));

						if(earned.length > 0) {
							earned = earned[0].achievements
						} else {
							earned = false;
						}

						res.json({
							channel: foundChannel,
							achievements: {
								all: foundAchievements,
								earned: earned
							}
						});
					});
				});
				
			} else {
				res.json({
					error: "No channel found for the name: " + channel
				});
			}
		});
	} else {
		//use current logged in person's channel
		User.findById(req.cookies.id_token).then((foundUser) => {
			Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
				if(existingChannel) {
					Achievement.find({channel: existingChannel.owner}).then((achievements) => { 
						res.json({
							channel: existingChannel,
							achievements: achievements
						});
					});	
				} else {
					res.json({
						error: 'User doesn\'t manage a channel'
					});
				}
				
			});
		});
	}
	
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