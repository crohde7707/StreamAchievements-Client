const TwitchJS = require('twitch-js').default;
const keys = require('./configs/keys');
const axios = require('axios');

const token = keys.phirebot.token;
const username = keys.phirebot.username;
const client_id = keys.twitch.clientID;

const { chat, chatConstants } = new TwitchJS({ token, username });

const channels = ['phirehero', 'holliebb', 'simarchy', 'flip_switch', 'jazzyrosee', 'janejoe18'];

let joinedChannels = [];

chat.connect().then(clientState => {
	//console.log(clientState);
});

chat.on('*', (msg) => {
	//console.log(msg);
});

let channelLiveWatcher = () => {
	
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
			streams.forEach(channel => {
				let channelName = channel.channel.display_name;
				if(!joinedChannels.includes(channelName)) {
					chat.connect().then(clientState => {
						chat.join(channelName).then(state => {
							console.log('>>> joined ' + channelName);
							joinedChannels.push(channelName);
						});
					});
				}
			});
		} else {
			console.log("No streams online")
		}
	});
}

channelLiveWatcher();

setInterval(channelLiveWatcher, 120000);