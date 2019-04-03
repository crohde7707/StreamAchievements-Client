const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user-model');
const Channel = require('../models/channel-model');
const Achievement = require('../models/achievement-model');
const Listener = require('../models/listener-model');
const uploadImage = require('../utils/image-utils').uploadImage;
const mongoose = require('mongoose');

let combineAchievementAndListeners = (achievement, listener) => {
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
		code: listener.code
	}
	
	if(listener.resubType) {
		merge.resubType = listener.resubType;
	}
	if(listener.query) {
		merge.query = listener.query;
	}

	return merge;
}

router.post("/create", (req, res) => {
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

					query.channel = existingChannel.owner

					Achievement.findOne(query).then((existingAchievement) => {
						if(existingAchievement && !req.body.edit) {
							console.log('achievement exists');
							res.json({
								created: false,
								message: "An achievement with this name already exists!",
								achievement: existingAchievement
							});
						} else {

							if(req.body.edit) {
								console.log('editing existing achievement');
								let updates = req.body;
								delete updates.edit;

								let {code, resubType, query} = updates;

								let listenerUpdates = {};

								if(updates.code) {
									listenerUpdates.code = updates.code;
									delete updates.code;
								}
								if(updates.resubType) {
									listenerUpdates.resubType = updates.resubType;
									delete updates.resubType;
								}
								if(updates.query) {
									listenerUpdates.query = updates.query;
									delete updates.query;
								}

								Achievement.findOneAndUpdate({ _id: existingAchievement._id }, { $set: updates }, {new:true}).then((updatedAchievement) => {

									if(Object.keys(listenerUpdates).length > 0) {
										Listener.findOneAndUpdate({ _id: updatedAchievement.listener }, { $set: listenerUpdates }, { new: true }).then((updatedListener) => {

											let merge = combineAchievementAndListeners(updatedAchievement, updatedListener);

											res.json({
												update: true,
												achievement: merge
											});
										});
									} else {
										Listener.findOne({ _id: updatedAchievement.listener }).then(foundListener => {
											let merge = combineAchievementAndListeners(updatedAchievement, foundListener);

											res.json({
												update: true,
												achievement: merge
											});
										});
									}
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

								let listenerData = {
									channel: existingChannel.owner,
									code: parseInt(req.body.code)
								};

								if(listenerData.code > 0) {
									listenerData.query = req.body.query;

									if(listenerData.code === 1) {
										listenerData.resubType = parseInt(req.body.resubType);
									}
								}

								console.log('creating new achievement');
								//Upload Image to Cloud
								console.log(req.body);
								

								Listener.findOne(listenerData).then(foundListener => {
									if(foundListener) {
										Achievement.findOne({listener: foundListener._id}).then(foundAchievement => {
											res.json({
												created: false,
												message: "The conditions you selected are already taken by the \"" + foundAchievement.title + "\" achievement!"
											});
										});
									} else {
										uploadImage(req.body.icon, req.body.iconName, existingChannel.owner).then((result) => {
											achData.icon = result.image.url;
											new Achievement(achData).save().then((newAchievement) => {
												console.log('new achievement in DB');
												listenerData.achievement = newAchievement.id;
												//create listener for achievement
												new Listener(listenerData).save().then(newListener => {
													console.log("new listener in DB");

													newAchievement.listener = newListener.id;
													newAchievement.save().then(updatedAchievement => {
														res.json({
															created: true,
															achievement: newAchievement
														});	
													});
												});
											});
										});
									}
								});		
							}
						}
					});	
				} else {
					res.json({
						created: false,
						message: "This channel you are creating for doesn't exist!"
					});
				}	
			});	
		} else {
			res.json({
				created: false,
				message: "You are not authorized to create achievements!"
			});
		}
	});
});

router.post("/delete", (req, res) => {
	console.log(req.body);

	User.findById(req.cookies.id_token).then((foundUser) => {
		if(foundUser) {
			console.log('user found: ' + foundUser.name);
			Channel.findOne({twitchID: foundUser.twitchID}).then((existingChannel) => {
				if(existingChannel) {
					console.log('channel found: ' + existingChannel.owner);
					//Check if achievement of same name exists

					let query = {};
					query['_id'] = req.body.achievementID;
					query.channel = existingChannel.owner;

					Achievement.findOne(query).then((existingAchievement) => {
						if(existingAchievement) {
							//time to delete
							let listenerID = existingAchievement.listener;

							Achievement.deleteOne(query).then(err => {
								let listenerQuery = {
									"_id": listenerID,
									channel: existingAchievement.channel
								};

								Listener.findOne(listenerQuery).then(existingListener => {
									if(existingListener) {
										Listener.deleteOne(listenerQuery).then(err => {
											res.json({
												deleted:true
											});
										});
									} else {
										res.json({
											deleted:true
										});
									}
								});
							});

						} else {
							res.json({
								deleted: false,
								message: "The achievement you requested to delete doesn't exist!"
							})
						}
					});
				} else {
					res.json({
						delete: false,
						message: "This channel you are deleting for doesn't exist!"
					});
				}
			});
		} else {
			res.json({
				deleted: false,
				message: "You are not authorized to deleted achievements!"
			});
		}
	});
});

router.get("/retrieve", (req, res) => {
	let channel = req.query.id;

	Achievement.find({channel: channel}).then((achievements) => { 
		if(achievements) {
			let listenerIds = achievements.map(achievement => {
				return achievement.listener
			});

			Listener.find({'_id': { $in: listenerIds}}).then((listeners) => {
				achievements.forEach(achievement => {
					let listenerData = listeners.find(listener => listener._id = achievement.listener);

					delete listenerData._id;

					return Object.assign(achievement, listenerData);
				});

				res.json(achievements);
			});
		} else {
			res.json(achievements);	
		}
	});
});

router.get('/listeners', (req, res) => {
	console.log('/achievement/listeners');
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

router.post('/listeners', (req, res) => {
	//Process achievements
	console.log('achievements to process...');
	console.log(req.body);

	//Spawn child process to do it?
});

module.exports = router;