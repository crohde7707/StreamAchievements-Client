const router = require('express').Router();
const passport = require('passport');
const authCheck = require('../utils/auth-utils').authCheck;
const mongoose = require('mongoose');

const Channel = require('../models/channel-model');
const User = require('../models/user-model');

router.post('/join', (req, res) => {

	Channel.findOne({owner: req.body.channel}).then((existingChannel) => {
		if(existingChannel) {
			User.findById(req.cookies.id_token).then((foundUser) => {
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

module.exports = router;