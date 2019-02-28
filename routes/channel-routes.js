const router = require('express').Router();
const passport = require('passport');
const authCheck = require('../utils/auth-utils').authCheck;
const mongoose = require('mongoose');

router.get('/:channelID', /*authCheck, */(req, res) => {
	console.log(req.params.channelID);
	//Pull achievements from database associated with :channelID
	res.send("welcome to " + req.params.channelID + "'s channel!");
});

module.exports = router;