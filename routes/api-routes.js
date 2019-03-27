const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');
const Listener = require('../models/listener-model');
const uploadImage = require('../utils/image-utils').uploadImage;
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
	console.log(req.body);
	User.findById(req.cookies.id_token).then((foundUser) => {
		if(foundUser) {
			console.log('user found: ' + foundUser.name);
			Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
				if(existingChannel) {
					console.log('channel found: ' + existingChannel.owner);
					//Check if achievement of same name exists

					let query = {};

					if(req.body.id) {
						query['_id'] = req.body.id
					} else {
						query.title = req.body.title
					}

					Achievement.findOne(query).then((existingAchievement) => {
						if(existingAchievement && !req.body.edit) {
							console.log('achievement exists');
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
								secret: req.body.secret,
								listener: req.body.listener
							};

							if(req.body.edit) {
								console.log('editing existing achievement');
								let updates = req.body;
								delete updates.edit;

								Achievement.findOneAndUpdate({ _id: existingAchievement._id }, { $set: updates }, {new:true}).then((updatedAchievement) => {
									res.json({
										achievement: updatedAchievement
									});
								});
							} else {
								console.log('creating new achievement');
								//Upload Image to Cloud
								console.log(req.body);
								uploadImage(req.body.icon, req.body.iconName, existingChannel.owner).then((result) => {
									achData.icon = result.image.url;

									new Achievement(achData).save().then((newAchievement) => {
										console.log('new achievement in DB')
										res.json({
											achievement: newAchievement
										});
									});

								}).catch((error) => {
									res.json({
										error: error
									});
								});

								
							}
						}
					});	
				}
					
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

router.get('/channel/listeners/create', (req, res) => {
	Listener({
		channel: 'phirehero',
		code: 5,
		query: '',
		achievement: '5c92a656f0472c1fa846187e'
	}).save().then(savedListener => {
		console.log(savedListener);

		res.json(savedListener);
	});
});


router.get('/channel/listeners', (req, res) => {
	console.log('/api/channel/listeners');
	let channelArray = req.query.channel;

	if(!Array.isArray(channelArray)) {
		channelArray = channelArray.split(',');
	}

	console.log(channelArray);

	Listener.find({'channel': { $in: channelArray}})
		.then((listeners) => {
			if(listeners.length > 0) {
				res.json(listeners);
			} else {
				res.json([]);
			}
		});
});

router.post('/channel/listeners', (req, res) => {
	//Process achievements
	console.log('achievements to process...');
	console.log(req.body);

	//Spawn child process to do it?
});


router.get('/channel/retrieve', (req, res) => {
	console.log(req.user);
	let channel = req.query.id;
	let bb = req.query.bb;

	if(bb) {
		//gather channels to be watched
		Channel.find({watcher: true}).then(foundChannels => {
			let channelObj = {};

			foundChannels.map((channel) => {
				return {
					name: channel.owner,
					listeners: channel.listeners
				}
			});
		})
	}

	if(channel) {
		User.findById(req.cookies.id_token).then((foundUser) => {
			if(foundUser) {
				Channel.findOne({owner: channel}).then((foundChannel) => {
					if(foundChannel) {
						
						Achievement.find({channel: channel}).then((foundAchievements) => {

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
						
					} else {
						res.json({
							error: "No channel found for the name: " + channel
						});
					}
				});
			} else {
				//Not a valid user
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