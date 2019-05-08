const User = require('../models/user-model');

const authCheck = (req, res, next) => {
	if(!req.user) {
		res.redirect('/auth/twitch');
	} else {
		next();
	}
}

const isAuthorized = async (req, res, next) => {
	let foundUser = await User.findOne({'integration.twitch.etid': req.cookies.etid})
			
	if(foundUser) {
		req.foundUser = foundUser;
		next();
	} else {
		res.status(401);
		res.json({
			message: "You are not authorized to make this request."
		});
		next();
	}
}

module.exports = {
	authCheck: authCheck,
	isAuthorized
}