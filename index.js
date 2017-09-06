'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
var path = require ('path');

let app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/', function(req, res) {
  res.sendFile(path.resolve('public/index.html'))
});


app.get('/search', function(req, res){
	
	var lat = req.query.lat;
	var lon = req.query.lon;
	var dist = req.query.dist;
	console.log(lat, lon, dist)

	var EventSearch = require("facebook-events-by-location-core");

	var es = new EventSearch();
	res.writeHead(200, {"Content-Type": "application/json"});


	es.search(
		{
	    "lat": lat,
	    "lng": lon,
	    "distance": dist,
	    "accessToken": "EAACEdEose0cBAJCBiUaDqaxaC7V8IUM6Iz2gpqHlMZCZBQha2t7tHHV5psZCgfZBYMILHXd34ZBqWc6SzZAgzRKTFWbRZAZAnCR6WfuTrQCdeV627NDwrlTBVVwWsmTxhNf2ON6xlhcol2r8K7S0FstYSV8zsig9tE4VJhCGsX7g5P5OO65IHqZApfETT0oYtUusZD"
		}
		).then(function (events) {
	    console.log(JSON.stringify(events));
	     res.end(JSON.stringify(events));
	     
	}).catch(function (error) {
	    console.error(JSON.stringify(error));
	    res.end(JSON.stringify(error));
	});
})


var server = app.listen(process.env.PORT || 3000, function () {
  console.log("Listening on port %s", server.address().port);
});