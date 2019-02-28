const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const achievementSchema = new Schema({
	title: String,
	description: String,
	icon: String
});

const Achievement = mongoose.model("achievement", achievementSchema);

module.exports = Achievement;