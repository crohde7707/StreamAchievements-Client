const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
	name: String,
	channel: String,
	cloudID: String,
	url: String,
	active: Boolean
});

const Image = mongoose.model("image", imageSchema);

module.exports = Image;