const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/passwords', (req, res) => {
	res.json({"foo": "bar"});

	console.log("Sent a message");
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port);

console.log(`Express app listening on port ${port}`)