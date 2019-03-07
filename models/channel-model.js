const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
	name: String,
	twitchID: String,
	theme: String,
	logo: String,
	achievements: Array
});

const Channel = mongoose.model("channel", channelSchema);

module.exports = Channel;