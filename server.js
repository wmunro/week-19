// Include Server Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongojs = require('mongojs');

// Create Instance of Express
var app = express();
var PORT = process.env.PORT || 3000; // Sets an initial port. We'll use this later in our listener

// Run Morgan for Logging
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

app.use(express.static('./public'));


var bodyParser = require('body-parser');
var request = require('request');

app.get('/', function(req, res){
  res.sendFile('./public/index.html');
});

app.post('/api/search', function(req, res){
	console.log("api: " + req.body.term);
	// api test
	request.get({
	  url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
	  qs: {
	    'api-key': "ff9aacf1cac746e2b39caaa6d4b21df1",
	    'q': req.body.term,
	    'begin_date': "20160710",
	    'end_date': "20161108"
	  },
	}, function(err, response, body) {
		console.log(JSON.parse(body.response.docs[0]));
	 	
	  res.json(body.response.docs[0]);
	});
});


// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});