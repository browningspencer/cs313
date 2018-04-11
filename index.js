//Resources
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pg = require("pg"); // This is the postgres database connection module.

var urlEncodedParser = bodyParser.urlencoded({ extended: false});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/views'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index')
});


app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});