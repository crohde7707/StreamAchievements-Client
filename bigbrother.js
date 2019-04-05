const TwitchJS = require('twitch-js').default;
const keys = require('./configs/keys');
const axios = require('axios');

const token = keys.phirebot.token;
const username = keys.phirebot.username;
const client_id = keys.twitch.clientID;

const { chat, chatConstants } = new TwitchJS({ token, username });

const channels = ['phirehero'];

let joinedChannels = [];
let channelsToRetrieve = [];

let subListeners = {};
let resubListeners = {};
let giftSubListeners = {};
let raidListeners = {};
let requestQueue = [];

// Achievement Handlers
let newSubHandler = (channel, msg) => {
	let achievementRequest = {
		'channel': channel,
		'achievement': subListeners[channel],
		'tier': msg.parameters.subPlan,
		'userID': msg.tags.userId
	};

	requestQueue.push(achievementRequest);
};

let resubHandler = (channel, msg) => {
	let {cumulativeMonths, streakMonths, subPlan} = msg.parameters;
	
	// we dont know which achievement to award, if its total based, or streak based, so check whats available
	let achievements = resubListeners[channel].forEach((achievement) => {
		console.log(achievement);
		console.log('streakMonths: ' + streakMonths);
		console.log('cumulativeMonths: ' + cumulativeMonths);
		if(achievement.type === 0 && Number.parseInt(achievement.query) <= streakMonths) {
			console.log('  >>> Achievmenet earned: streak')
			//code matched streak && query for achievement matched streak
			let achievementRequest = {
				'channel': channel,
				'type': msg.tags.msgId,
				'tier': subPlan,
				'userID': msg.tags.userId,
				'achievement': achievement,
				'streak': streakMonths
			};

			requestQueue.push(achievementRequest);

		} else if(achievement.type === 1 && Number.parseInt(achievement.query) <= cumulativeMonths) {
			//code matched total && query for achievement matched cumulative
			console.log('  >>> Achievmenet earned: cumulativeMonths')
			let achievementRequest = {
				'channel': channel,
				'type': msg.tags.msgId,
				'tier': subPlan,
				'userID': msg.tags.userId,
				'achievement': achievement,
				'cumulative': cumulativeMonths
			};

			requestQueue.push(achievementRequest);
		}
	});
	
};

let giftSubHandler = (channel, msg, totalGifts) => {
	
	let achievementListener = giftSubListeners[channel][totalGifts];
	let {months, recepientID, subPlan} = msg.parameters;

	let achievementRequest = {
		'channel': channel,
		'achievement': achievementListener, //Stream Acheivements achievement
		'type': msg.tags.msgId, //type of event (sub, resub, subgift, resub)
		'gifterID': msg.tags.userId, //Person giving the sub
		'recepientID': recipientId, // Person receiving the sub
		'recepientTotalMonths': months, // Total number of months receiving user has subbed (NOT STREAK);
		'tier': subPlan, // (PRIME, 1000, 2000, 3000)
	}

	requestQueue.push(achievementRequest);
};

let raidHandler = (msg) => {
	let achievementListener = raidListeners[channel];

	let achievementRequest = {
		'channel': channel,
		'achievement': achievementListener,
		'type': msg.tags.msgId,
		'userID': msg.tags.userId
	}

	requestQueue.push(achievementRequest);
};

let customHandler = (msg) => {

};

chat.connect().then(clientState => {
	//console.log(clientState);
});

chat.on('*', (msg) => {
	//console.log("(" + msg.channel + ")" + msg.username + ": " + msg.message);
});

chat.on('USERNOTICE/SUBSCRIPTION', (msg) => {
	let channel = msg.channel.substr(1);

	if(subListeners[channel]) {
		newSubHandler(channel, msg);
	}
	console.log('------- SUB -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/RESUBSCRIPTION', (msg) => {

	let channel = msg.channel.substr(1);

	if(resubListeners[channel]) {
		resubHandler(channel, msg);
	}

	console.log(resubListeners[channel]);
	console.log('------- SUB -------');
	console.log(msg);
	console.log('-------------------');
	
});

chat.on('USERNOTICE/SUBSCRIPTION_GIFT', (msg) => {
	let channel = msg.channel.substr(1);
	totalGifts = msg.parameters.senderCount;

	if(giftSubListeners[channel] && giftSubListeners[channel][totalGifts]) {
		giftSubHandler(channel, msg, totalGifts);
	}

	console.log('------- SUB GIFT -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/SUBSCRIPTION_GIFT_COMMUNITY', (msg) => {
	let channel = msg.channel.substr(1);
	console.log('------- SUB GIFT COMMUNITY -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/RAID', (msg) => {
	let channel = msg.channel.substr(1);

	if(raidListeners[channel]) {
		raidHandler(channel, msg);
	}
	console.log('------- RAID -------');
	console.log(msg);
	console.log('-------------------');
});

let retrieveChannelListeners = () => {
	let channelsAdded = {};

	let channels = channelsToRetrieve.slice(0); //Make copy to only process up to this point
	channelsToRetrieve.splice(0,channelsToRetrieve.length); //clear out queue

	if(channels.length > 0) {
		axios({
			method: 'get',
			url: 'http://localhost:5000/api/achievement/listeners',
			params: {
				channel: channels
			}
		}).then(response => {
			//decompose listeners
			let listeners = response.data;
			listeners.forEach(listener => {
				let query, key;
				let channel = listener.channel;

				if(channels.includes(channel) && !channelsAdded[channel]) {
					channels.push(channel);
					channelsAdded[channel] = true;
				}

				switch(listener.code) {
					case "0":
						//Sub
						subListeners[channel] = listener;
						console.log('new sub listener added for ' + channel);
						break;

					case "1":
						//Resub
						type = listener.type;
						query = listener.query;
						resubListeners[channel] = resubListeners[channel] || [];
						resubListeners[channel].push(listener);
						console.log('resub listener added for ' + channel);
						break;

					case "2":
						//Gifted Sub
						query = listener.query;
						giftSubListeners[channel] = giftSubListeners[channel] || [];
						giftSubListeners[channel].push(listener);
						console.log('gift sub listener addef for ' + channel);
						break;

					case "3":
						//Raid
						raidListeners[channel] = listener;
						break;

					case "4":
						//Custom
						chatListeners[channel] = chatListeners[channel] || {};
						chatListeners[channel][query] = listener;
						break;

					default:
						break;
				}
			});
		});
	}
}

let channelLiveWatcher = () => {

	return new Promise((resolve, reject) => {
		console.log(channels.join());
		axios({
			method: 'get',
			url: 'https://api.twitch.tv/kraken/streams/',
			params: {
				client_id: client_id,
				channel: channels.join()
			}
		})
		.then(response => {
			let streams = response.data.streams;

			if(streams.length > 0) {
				streams.forEach((channel, idx, arr) => {
					let channelName = channel.channel.display_name.toLowerCase();
					console.log("channel to add: " + channelName);
					if(!joinedChannels.includes(channelName)) {
						chat.connect().then(clientState => {
							chat.join(channelName).then(state => {
								console.log('*************************');
								console.log('>>> BIG BROTHER IS WATCHING ' + channelName);
								console.log('*************************');
								joinedChannels.push(channelName);
								channelsToRetrieve.push(channelName);
								if((idx + 1) === arr.length) {
									resolve();
								}
							});
						});
					}
				});
			} else {
				console.log("No streams online");
				resolve();
			}
		});
	});
}

let sendAchievements = () => {

	if(requestQueue.length > 0) {
		console.log(requestQueue);
		//We have achievements to send
		let achievements = requestQueue.slice(0); //Make copy to only process up to this point
		requestQueue.splice(0,requestQueue.length); //clear out queue
		
		console.log('Sending ' + achievements.length + ' achievements...');

		axios({
			method: 'post',
			url: 'http://localhost:5000/api/achievement/listeners',
			data: achievements
		})
		.then(response => {
			console.log('achievements processed');
		});
	} else {
		console.log('no achievements yet...');
	}
}

let pubsub = () => {
	axios({
		method: 'post',
		url: 'https://api.twitch.tv/helix/webhooks/hub',
		headers: {'client-ID': client_id},
		data: {
			'hub.callback': 'http://localhost:5000/api/achievement/listeners',
			'hub.mode': 'subscribe',
			'hub.topic': 'https://api.twitch.tv/helix/users/follows?first=1&to_id=56453119',
			'hub.lease_seconds': 6000
		}
	}).then(response => {
		console.log(response);
	}).catch(error => {
		console.log(error);
	});
}


channelLiveWatcher().then(() => {
	console.log(joinedChannels);
	retrieveChannelListeners();	
});

pubsub();

setInterval(channelLiveWatcher, 120000); // Update list of live channels every 2 minutes
setInterval(retrieveChannelListeners, 900000) // Gather all channel listeners every 15 minutes
setInterval(sendAchievements, 10000); // Send collected achievements every 10 seconds

/*
	Stream ends
	i HOSTTARGET/#jazzyrosee lostinsophie
	i NOTICE/HOST_ON/#jazzyrosee tmi.twitch.tv: Now hosting lostinsophie.
*/

/*
	Events:
	PRIVMSG: Message in chat
	USERNOTICE/RESUBSCRIPTION: Resub
	*/


/*

	{
		'thorlar': [
			{
				query: "successfully stole 100 Tacos!",
				achievement: 123456,
				channel: thorlar
			}	
		]

	}

*/