const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const channelSchema = new Schema({
	owner: String,
	twitchID: String,
	theme: String,
	logo: String,
	achievements: Array,
	members: Array
});

const Channel = mongoose.model("channel", channelSchema);

module.exports = Channel;