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
    console.log('about to make cookie');
    console.log('user: ' + req.user);
    res.cookie('id_token', req.user.id, { maxAge: 24 * 60 * 60 * 60, httpOnly: true });
    console.log('cookie created successfully');
  } 
  else
  {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  } 
  next(); // <-- important!
};

//callback for twitch to redirect to
router.get('/twitch/redirect', passport.authenticate('twitch'), (req, res) => {
	console.log(req.user);
	//res.send("you reached the callback URI");
	//create this page
	//console.log(req);

	//Set Cookie
	var cookie = req.cookies['id_token'];
	if (cookie === undefined && req.user)
	{
		// no: set a new cookie
		console.log('about to make cookie');
		console.log('user: ' + req.user);
		res.cookie('id_token', req.user.id, { maxAge: 24 * 60 * 60 * 60, httpOnly: true });
		console.log('cookie created successfully');
	} else {
		// yes, cookie was already present 
		console.log('cookie exists', cookie);
	} 

	res.send('you reached the callback URI');


	//res.redirect('/home');
});

module.exports = router;

//TODO: move react code to be on server side instead of client, simple express served application using EJS for templates