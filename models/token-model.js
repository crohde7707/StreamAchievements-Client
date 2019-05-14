const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
	uid: String,
	token: String
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;