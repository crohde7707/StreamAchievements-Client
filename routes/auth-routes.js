const router = require('express').Router();
const passport = require('passport');

router.get('/twitch', passport.authenticate('twitch', {
	scope: ["user_read"]
}));

const cookieSetter = (req, res, next) => {
  // check if client sent cookie
  var cookie = req.cookies['id_token'];
  if (cookie === undefined && req.user)
  {
    // no: set a new cookie
    res.cookie('id_token', req.user.id, { maxAge: 24 * 60 * 60 * 60, httpOnly: false });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next();
};

//callback for twitch to redirect to
router.get('/twitch/redirect', passport.authenticate('twitch'), (req, res) => {

	//Set Cookie
	var cookie = req.cookies['id_token'];
	if (cookie === undefined && req.user)
	{
		// no: set a new cookie
		console.log('about to make cookie');
		console.log('user: ' + req.user);
		res.cookie('id_token', req.user.id, { maxAge: 24 * 60 * 60 * 60, httpOnly: false });
		console.log('cookie created successfully');
	} else {
		// yes, cookie was already present 
		console.log('cookie exists', cookie);
	} 

	res.redirect('http://localhost:3000/home');

});

router.get('/logout', (req, res) => {
	req.logout();
});

module.exports = router;

//TODO: move react code to be on server side instead of client, simple express served application using EJS for templates