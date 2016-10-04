var express = require('express');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var compression = require('compression');
var app = express();
var apiRoutes = require('./routes/main');

app.disable('x-powered-by');

// Setting body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Setting helmet
app.use(helmet());

// Setting compression - G-Zip
app.use(compression());

// Setting routes
app.use('/', apiRoutes);

// Starting server
app.listen(3000, function() {
	console.log('Express started on port 3000.');
});
