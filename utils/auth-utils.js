const authCheck = (req, res, next) => {
	if(!req.user) {
		res.redirect('/auth/twitch');
	} else {
		next();
	}
}

module.exports = {
	authCheck: authCheck
}