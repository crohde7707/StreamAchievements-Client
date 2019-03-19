const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
	channel: String,
	title: String,
	description: String,
	icon: String,
	earnable: Boolean,
	limited: Boolean,
	secret: Boolean
});

const Achievement = mongoose.model("achievement", achievementSchema);

module.exports = Achievement;