const TwitchJS = require('twitch-js').default;
const keys = require('./configs/keys');
const axios = require('axios');

const token = keys.phirebot.token;
const username = keys.phirebot.username;
const client_id = keys.twitch.clientID;

const { chat, chatConstants } = new TwitchJS({ token, username });

const channels = ['phirehero','Sakume','flip_switch'];

let joinedChannels = [];

let subListeners = {};
let resubListeners = {};
let giftSubListeners = {};
let raidListeners = {};

let requestQueue = [];

chat.connect().then(clientState => {
	//console.log(clientState);
});

chat.on('*', (msg) => {
	//console.log("(" + msg.channel + ")" + msg.username + ": " + msg.message);
});

chat.on('USERNOTICE/SUBSCRIPTION', (msg) => {
	console.log('------- SUB -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/RESUBSCRIPTION', (msg) => {

	let channel = msg.channel.substr(1);

	console.log(resubListeners[channel]);
	console.log('------- SUB -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/SUBSCRIPTION_GIFT', (msg) => {
	console.log('------- SUB GIFT -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/SUBSCRIPTION_GIFT_COMMUNITY', (msg) => {
	console.log('------- SUB GIFT COMMUNITY -------');
	console.log(msg);
	console.log('-------------------');
});

chat.on('USERNOTICE/RAID', (msg) => {
	console.log('------- RAID -------');
	console.log(msg);
	console.log('-------------------');
});

let retrieveChannelListeners = () => {
	let channelsAdded = {};

	if(joinedChannels.length > 0) {
		axios({
			method: 'get',
			url: 'http://localhost:5000/api/channel/listeners',
			params: {
				channel: joinedChannels
			}
		}).then(response => {
			//decompose listeners
			let listeners = response.data;
			listeners.forEach(listener => {
				let query;
				let channel = listener.channel;

				if(channels.includes(channel) && !channelsAdded[channel]) {
					channels.push(channel);
					channelsAdded[channel] = true;
				}

				switch(listener.code) {
					case 0:
						//Sub
						subListeners[channel] = listener;
						break;

					case 1:
						//Resub
						query = listener.query;
						resubListeners[channel] = resubListeners[channel] || {};
						resubListeners[channel][query] = listener;
						console.log('resub listener added for ' + channel);
						break;

					case 2:
						//Gifted Sub
						query = listener.query;
						giftSubListeners[channel] = giftSubListeners[channel] || {};
						giftSubListeners[channel] = listener;
						break;

					case 3:
						//Raid
						raidListeners[channel] = listener;
						break;

					case 4:
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
					let channelName = channel.channel.display_name;
					if(!joinedChannels.includes(channelName)) {
						chat.connect().then(clientState => {
							chat.join(channelName).then(state => {
								console.log('>>> joined ' + channelName);
								joinedChannels.push(channelName.toLowerCase());

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
		//We have achievements to send
		let achievements = requestQueue.slice(0); //Make copy to only process up to this point
		requestQueue.splice(0,requestQueue.length); //clear out queue

		axios({
			method: 'post',
			url: 'http://localhost:5000/api/channel/listeners',
			data: requestQueue
		})
		.then(response => {
			console.log('achievements processed');
		});
	} else {
		console.log('no achievements yet...');
	}
}


channelLiveWatcher().then(() => {
	console.log('retrieve...');
	console.log(joinedChannels);
	retrieveChannelListeners();	
});


//setInterval(channelLiveWatcher, 120000); // Update list of live channels every 2 minutes
//setInterval(retrieveChannelListeners, 900000) // Gather all channel listeners every 15 minutes
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