const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	twitchID: String,
	logo: String,
	email: String,
	type: String,
	channels: Array,
	integration: Object
});

const User = mongoose.model("user", userSchema);

module.exports = User;