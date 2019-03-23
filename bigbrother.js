const TwitchJS = require('twitch-js').default;
const keys = require('./configs/keys');

const token = keys.phirebot.token;
const username = keys.phirebot.username;

const { chat, chatConstants } = new TwitchJS({ token, username });

chat.connect();

chat.join('#phirehero');

chat.on('*', (msg) => {
	console.log(msg);
});