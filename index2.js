const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./configs/keys');
const passportSetup = require('./configs/passport-setup');
const cookieParser = require('cookie-parser');
let request = require('request');

let authRoutes = require('./routes/auth-routes');
let channelRoutes = require('./routes/channel-routes');
let apiRoutes = require('./routes/api-routes');

const port = process.env.PORT || 5000;

let app = express();

// set up view engine
app.set('view engine', 'ejs');
app.use(cookieParser());

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
	console.log('connected to mongodb');
});

app.use(cookieSession({
	maxAge: 24 * 60 * 60 * 1000,
	keys: keys.session.cookieKey
}));


//initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/auth', authRoutes);
app.use('/channel', channelRoutes);
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

app.listen(port);

console.log(`Express app listening on port ${port}`)