const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session');
const path = require('path');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors')
const db = require('./config/database')

// initial app-express
const app = express()

app.use(cors())

// connect to database
db.connect(function (err) {
	if (err) {
		console.log('Unable to connect to Mongo.')
		process.exit(1)
	} else {
		app.emit('ready');
	}
})

app.on('ready', function () {
	var sessionStore = new MongoStore({
		db: db.get(),
		autoReconnect: true,
		stringify: false,
		autoRemove: 'native', // Default 
		ttl: 7 * 24 * 60 * 60, // 7 days - time to live for session cookies stored. 14 days default
		touchAfter: 1 * 60 * 60 // save to database every hour.
	});

	// parse application/x-www-form-urlencoded
	app.use(bodyParser.urlencoded({ extended: false }))

	// parse application/json
	app.use(bodyParser.json())

	// setup views
	app.set('views', path.join(__dirname, './', 'views'));
	app.set('view engine', 'ejs');

	// static files
	app.use(express.static('public'))

	// routes
	var birds = require('./routes/index')
	app.use('/', birds)

	// app listen on port
	app.listen(8081)
	console.log('Sever is running on port 8081');
});
