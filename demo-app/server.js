var app = require('express')();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
	console.log('Request:', req.method, req.url);
	next();
});

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/index.html', next);
});

var gameData = [{
	name: 'Avalon',
	players: [5,10]
}, {
	name: 'Pandemic',
	players: [3,6]
}, {
	name: 'Basketball',
	players: [1,34]
}];

app.get('/games', function (req, res, next) {
	res.json(gameData);
});

app.use(function (err, req, res, next) {
	console.error(err);
	res.status(err.status || 500).end();
});

var port = 3000;
app.listen(port, function () {
	console.log('Reluctantly listening on port', port);
});