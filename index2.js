const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./configs/keys');
const passportSetup = require('./configs/passport-setup');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

let io = module.exports.io = require('socket.io');
let SocketManager = require('./SocketManager');

let authRoutes = require('./routes/auth-routes');
let apiRoutes = require('./routes/api-routes');

const port = process.env.PORT || 5000;

let app = express();

// set up view engine
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser({limit: '50mb', extended: true}));

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
app.use('/api', apiRoutes);

app.use(express.static(path.join(__dirname, 'client/build')));

let server = app.listen(port);

let connectedSockets = {};

let WebSockets = io.listen(server);

let foo = (obj => {
	obj.foo = "bar";
	console.log(obj);
});

WebSockets.sockets.on('connection', (socket) => {
	if(connectedSockets[socket.id]) {

	} else {
		connectedSockets[socket.id] = socket.id
		console.log(connectedSockets);
		foo(connectedSockets);
		console.log(connectedSockets);

	}
	//SocketManager(conn);
});




console.log(`Express app listening on port ${port}`)