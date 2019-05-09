const router = require('express').Router();
const passport = require('passport');
const isAuthorized = require('../utils/auth-utils').isAuthorized;
const mongoose = require('mongoose');

const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');
const Listener = require('../models/listener-model');
const Image = require('../models/image-model');
const destroyImage = require('../utils/image-utils').destroyImage;

router.get("/create", isAuthorized, (req, res) => {
	Channel.findOne({twitchID: req.foundUser.twitchID}).then((existingChannel) => {
		if(existingChannel) {
			res.json({
				error: 'Channel already exists!',
				channel: existingChannel
			});
		} else {
			new Channel({
				owner: req.foundUser.name,
				twitchID: req.foundUser.twitchID,
				theme: '',
				logo: req.foundUser.logo,
				achievements: [],
				members: []
			}).save().then((newChannel) => {
				req.foundUser.channelID = newChannel.id;
				req.foundUser.save().then((savedUser) => {
					res.json({
						channel: newChannel,
						user: req.foundUser
					});
				});
				
			});		
		}
	});
});

router.post('/leave', isAuthorized, (req, res) => {
	Channel.findOne({owner: req.body.channel}).then((existingChannel) => {
		if(existingChannel) {

			let members = existingChannel.members;
			let i;

			if(members.length > 0 && members.includes(req.foundUser.id)) {

				i = members.findIndex((member) => {
					member === req.foundUser.id
				});

				members.splice(i, 1);

				existingChannel.save().then((savedChannel) => {
					//Remove channel from user
					i = 0;

					i = req.foundUser.channels.findIndex((channel) => {
						return channel.channelID === savedChannel.id
					});
						
					req.foundUser.channels.splice(i, 1);

					req.foundUser.save().then((savedUser) => {
						res.json({
							leave: true
						});
					});
				});
			} else {
				res.send("User isn't a part of this channel");
			}
		} else {
			res.send("Channel doesn't exist");
		}
	});
});

router.post('/join', (req, res) => {

	Channel.findOne({owner: req.body.channel}).then((existingChannel) => {
		if(existingChannel) {
			let joinedChannels = req.foundUser.channels;

			let alreadyJoined = joinedChannels.some((channel) => (channel.channelID === existingChannel.id));
			let memberAlready = existingChannel.members.includes(req.foundUser.id);

			if(alreadyJoined) {
				//This channel already joined by user
				if(!memberAlready) {
					existingChannel.members.push(req.foundUser.id);
					existingChannel.save().then((savedChannel) => {
						res.json({
							user: req.foundUser,
							channel: savedChannel
						});
					})
				} else {
					res.json({
						user: req.foundUser,
						channel: existingChannel
					});
				}
			} else if(memberAlready) {			
				if(!alreadyJoined) {
					req.foundUser.channels.push({
						channelID: existingChannel.id,
						achievements: []
					});
					req.foundUser.save().then((savedUser) => {
						res.json({
							user: savedUser,
							channel: existingChannel
						});
					});
				} else {
					res.json({
						user: req.foundUser,
						channel: existingChannel
					});
				}
			} else {
				req.foundUser.channels.push({
					channelID: existingChannel.id,
					achievements: []
				});
				req.foundUser.save().then((savedUser) => {

					existingChannel.members.push(savedUser.id);
					existingChannel.save().then((savedChannel) => {
						res.json({
							user: savedUser,
							channel: savedChannel
						});
					});
				});
			}
		} else {
			res.status(405);
			res.send('Channel requested to join does not exist!');
		}
	});
});

router.get('/list', (req, res) => {
	Channel.find({}, (err, channels) => {
		res.json(channels);
	});
});

router.get('/retrieve', isAuthorized, (req, res) => {
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
		Channel.findOne({owner: channel}).then((foundChannel) => {
				if(foundChannel) {
					
					Achievement.find({channel: channel}).then((foundAchievements) => {

						let joined = foundChannel.members.includes(req.foundUser.id);
						let earned;

						if(joined) {
							earned = req.foundUser.channels.filter((channel) => (channel.channelID === foundChannel.id))[0].achievements;	
						} else {
							earned = [];
						}

						res.json({
							channel: foundChannel,
							achievements: {
								all: foundAchievements,
								earned: earned
							},
							joined: joined
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
		Channel.findOne({twitchID: req.foundUser.integration.twitch.etid}).then((existingChannel) => {
			if(existingChannel) {

				let achievementsPromise = new Promise((resolve, reject) => {
					Achievement.find({channel: existingChannel.owner}).then((achievements) => { 

						if(achievements) {
							let listenerIds = achievements.map(achievement => {
								return achievement.listener
							});

							Listener.find({'_id': { $in: listenerIds}}).then((listeners) => {

								let mergedAchievements = achievements.map(achievement => {
									
									let listenerData = listeners.find(listener => {
										return listener.id === achievement.listener;
									});
									
									if(listenerData) {

										let merge = {
											"_id": achievement['_id'],
											uid: achievement.uid,
											channel: achievement.owner,
											title: achievement.title,
											description: achievement.description,
											icon: achievement.icon,
											earnable: achievement.earnable,
											limited: achievement.limited,
											secret: achievement.secret,
											listener: achievement.listener,
											code: listenerData.code
										}
										
										if(listenerData.resubType) {
											merge.resubType = listenerData.resubType;
										}
										if(listenerData.query) {
											merge.query = listenerData.query;
										}
										
										return merge;
									} else {
										return achievement;
									}
								});

								resolve(mergedAchievements);
							});
						} else {
							resolve(achievements);
						}
					});	
				});

				let imagesPromise = new Promise((resolve, reject) => {
					//Get Images
					Image.find({channel: existingChannel.owner}).then(foundImages => {
						if(foundImages) {
							resolve({
								gallery: foundImages,
								default: ""
							});
						} else {
							resolve({
								gallery: [],
								default: ""
							});
						}
					});
				});

				let membersPromise = new Promise((resolve, reject) => {
					User.find({'_id': { $in: existingChannel.members}}).then((members) => {
						console.log(members)
						resolve(members);
					});
				});

				Promise.all([achievementsPromise, imagesPromise, membersPromise]).then(values => {
					res.json({
						channel: existingChannel,
						achievements: values[0],
						images: values[1],
						members: values[2]
					})
				});
				
			} else {
				res.json({
					error: 'User doesn\'t manage a channel'
				});
			}	
		});
	}
});

router.post('/image', isAuthorized, (req, res) => {
	console.log(req.body);
	//delete image from Cloudinary
	destroyImage(req.body.image.cloudID).then(result => {
		console.log(result);
		//if image part of achievement, delete off achievement
		let achievementPromise = new Promise((resolve, reject) => {
			if(req.body.image.achievementID !== '') {
				Achievement.findOne({['_id']: req.body.image.achievementID}).then(foundAchievement => {
					if(foundAchievement) {
						foundAchievement.icon = '';
						foundAchievement.save().then(() => {
							Achievement.find({channel: req.foundUser.name}).then((achievements) => {
								resolve(achievements);
							}); 
						});
					} else {
						resolve();
					}
				});
			} else {
				resolve();
			}
		});

		//delete image from image table
		let imagePromise = new Promise((resolve, reject) => {
			Image.deleteOne({['_id']: req.body.image['_id']}).then(err => {
				//Get Images				
				Image.find({channel: req.foundUser.name}).then(foundImages => {
					console.log("\nGetting all images after delete");
					if(foundImages) {
						resolve({
							gallery: foundImages,
							default: ""
						});
					} else {
						resolve({
							gallery: [],
							default: ""
						});
					}
				});
			});
		});

		Promise.all([achievementPromise, imagePromise]).then(values => {
			console.log(values);
			let responseObj = {
				images: values[1]
			};

			if(values[0]) {
				responseObj.achievements = values[0];
			}

			res.json(responseObj);
		});
	});
});

router.get("/user", isAuthorized, (req, res) => {

	let channelArray = req.foundUser.channels.map(channel => new mongoose.Types.ObjectId(channel.channelID));

	Channel.find({'_id': { $in: channelArray}}).then((channels) => {

		let channelResponse = [];

		let promises = channels.map(channel => {
			let earnedAchievements = req.foundUser.channels.filter(userChannel => (userChannel.channelID === channel.id));
			let percentage = 0;

			return new Promise((resolve, reject) => {
				Achievement.countDocuments({channel: channel.owner}).then(count => {
					console.log(count);
					if(count > 0) {
						percentage = Math.round((earnedAchievements[0].achievements.length / count) * 100);
					}

					resolve({
			     		logo: channel.logo,
			     		owner: channel.owner,
			     		percentage: percentage
			     	});
			    });
			});
		});

		Promise.all(promises).then(responseData => {
			res.json(responseData);
		});
	});
});

module.exports = router;