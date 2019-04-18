//https://www.youtube.com/watch?v=NMFhtWm2Lno
//node server.js //outbound traffic

var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.post('/sms', function(req, res){
	//var twilio = require('')
	var twiml = new twilio.TwimlResponse();
	twiml.message('outbound message');
	re.writeHead(200, {'content-Type' : 'text/xml'});
	res.end(twiml.toString());
});

http.createServer(app).listen(1337, function(){
	console.log('server it is up and running');
});