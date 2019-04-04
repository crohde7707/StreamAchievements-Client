const router = require('express').Router();
const passport = require('passport');
const authCheck = require('../utils/auth-utils').authCheck;
const mongoose = require('mongoose');

const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');
const Listener = require('../models/listener-model');

router.get("/create", (req, res) => {
	User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
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

router.post('/leave', (req, res) => {
	User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
		if(foundUser) {
			Channel.findOne({owner: req.body.channel}).then((existingChannel) => {
				if(existingChannel) {

					let members = existingChannel.members;
					let i;

					if(members.length > 0 && members.includes(foundUser.id)) {

						i = members.findIndex((member) => {
							member === foundUser.id
						});

						members.splice(i, 1);

						existingChannel.save().then((savedChannel) => {
							//Remove channel from user
							i = 0;

							i = foundUser.channels.findIndex((channel) => {
								return channel.channelID === savedChannel.id
							});
								
							foundUser.channels.splice(i, 1);

							foundUser.save().then((savedUser) => {
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
		} else {
			res.status(401);
			res.send("User not authorized");
		}
	});
});

router.post('/join', (req, res) => {

	Channel.findOne({owner: req.body.channel}).then((existingChannel) => {
		if(existingChannel) {
			User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
				if(foundUser) {
					let joinedChannels = foundUser.channels;

					let alreadyJoined = joinedChannels.some((channel) => (channel.channelID === existingChannel.id));
					let memberAlready = existingChannel.members.includes(foundUser.id);

					if(alreadyJoined) {
						//This channel already joined by user
						if(!memberAlready) {
							existingChannel.members.push(foundUser.id);
							existingChannel.save().then((savedChannel) => {
								res.json({
									user: foundUser,
									channel: savedChannel
								});
							})
						} else {
							res.json({
								user: foundUser,
								channel: existingChannel
							});
						}
					} else if(memberAlready) {
						
						if(!alreadyJoined) {
							foundUser.channels.push({
								channelID: existingChannel.id,
								achievements: []
							});
							foundUser.save().then((savedUser) => {
								res.json({
									user: savedUser,
									channel: existingChannel
								});
							});
						} else {
							res.json({
								user: foundUser,
								channel: existingChannel
							});
						}

					} else {
						foundUser.channels.push({
							channelID: existingChannel.id,
							achievements: []
						});
						foundUser.save().then((savedUser) => {

							existingChannel.members.push(savedUser.id);
							existingChannel.save().then((savedChannel) => {
								res.json({
									user: savedUser,
									channel: savedChannel
								});
							});
						});
					}
				}
			});
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

router.get('/retrieve', (req, res) => {
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
		User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
			if(foundUser) {
				Channel.findOne({owner: channel}).then((foundChannel) => {
					if(foundChannel) {
						
						Achievement.find({channel: channel}).then((foundAchievements) => {

							let joined = foundChannel.members.includes(foundUser.id);
							let earned;

							if(joined) {
								earned = foundUser.channels.filter((channel) => (channel.channelID === foundChannel.id))[0].achievements;	
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
				//Not a valid user
			}
		});
	} else {
		//use current logged in person's channel
		User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {
			Channel.findOne({twitchID: foundUser.integration.twitch.etid}).then((existingChannel) => {
				if(existingChannel) {
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
										console.log(listenerData);
										let merge = {
											"_id": achievement['_id'],
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

								res.json({
									channel: existingChannel,
									achievements: mergedAchievements
								});
							});
						} else {
							res.json({
								channel: existingChannel,
								achievements: achievements
							});
						}
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

router.get("/user", (req, res) => {

	User.findOne({'integration.twitch.etid': req.cookies.etid}).then((foundUser) => {

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

module.exports = router;