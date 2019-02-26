const router = require('express').Router();
const passport = require('passport');

router.get('/twitch', passport.authenticate('twitch', {
	scope: ["user_read"]
}));

//callback for twitch to redirect to
router.get('/twitch/redirect', passport.authenticate('twitch'), (req, res) => {
	// res.send("you reached the callback URI");
	//create this page
	res.redirect('/achievements');
});

module.exports = router;

//TODO: move react code to be on server side instead of client, simple express served application using EJS for templates