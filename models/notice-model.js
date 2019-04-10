const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noticeSchema = new Schema({
	twitchID: String,
	channelID: String,
	achievement: String
});

const Notice = mongoose.model("notice", noticeSchema);

module.exports = Notice;