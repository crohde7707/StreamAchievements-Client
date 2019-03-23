const cp = require('child_process');

let child = cp.fork('../twitchbot/app.js');

child.on('message', (data) => {
	console.log(data);
});

child.on('close', (code) => {
	console.log('child went bye-bye');
});