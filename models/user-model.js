const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	twitchID: String,
	logo: String,
	email: String,
	channels: Array
});

const User = mongoose.model("user", userSchema);

module.exports = User;