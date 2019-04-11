const io = require('./index2.js').io;

module.exports = (socket) => {
	console.log("Socket ID: " + socket.id);

	socket.on('USERNAME_UPDATED', (username) => {
		console.log(username);
	});
}