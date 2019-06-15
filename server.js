const express = require('express');
const path = require('path');

const port = process.env.PORT || 8080;
const app = express();
const root = path.join(__dirname, 'build/');

app.use('/static', express.static(path.join(__dirname + 'static')));

// app.get('/static', express.static(path.join(__dirname, 'static')));

// app.use(function(req, res, next) {
// 	console.log(req.method);
// 	console.log(req.path);
//   if (req.method === 'GET' && req.accepts('html') && !req.is('json') && !req.path.includes('/static')) {
//   	console.log('hello');
//     res.sendFile('index.html', { root })
//   } else next()
// });

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);