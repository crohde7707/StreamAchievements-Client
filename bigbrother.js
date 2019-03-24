const TwitchJS = require('twitch-js').default;
const keys = require('./configs/keys');

const token = keys.phirebot.token;
const username = keys.phirebot.username;
const client_id = keys.twitch.clientID;

const { api, chat, chatConstants } = new TwitchJS({ token, username });

chat.connect().then(clientState => {
	//console.log(clientState);
});

chat.on('*', (msg) => {
	//console.log(msg);
});

api.get('streams', { search: { channel: 'janejoe18', client_id: client_id }})
	.then(response => {
		console.log(response);
	})
	.catch(error => {
		console.log(error);
	});