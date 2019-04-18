
//https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
// npm run start
'use strict';
module.exports = function(app) {
  var sms = require('../controllers/smsController'),
      bodyParser = require('body-parser');

  // sms Routes
  // http://localhost:3000/smsTo/7576857417/test123
  app.post('/smsTo/:phone/:message', function(req, res) {
      var status = sms.smsTo(req, res);
      res.end(status);
  });

  app.post('/smsAll/:message', function(req, res) {
      var status = sms.smsAll(req, res);
      res.end(status);
  });

//TODO: I believe this can be deleted, test first
  app.use(bodyParser.urlencoded({ extended: false }));

// route that handles all incoming repplies
  app.post('/message', function(req, res){
     var status = sms.smsInputAnalizer(req, res);
    //res.end(status);
  });

// http://localhost:3000/optout/7576857417/
  app.post('/optout/:phone', function(req, res){
		console.log('optout from route reg');
    var status = sms.smsOptOut(req, res);
    res.end(status);
  });

// http://localhost:3000/optin/7576857417/
    app.post('/optin/:phone', function(req, res){
      var status = sms.smsOptIn(req, res);
      res.end(status);
    });

// list of active users localhost:3000/list
    app.get('/list', function(req, res){
      var status = sms.smsActivePlayers(req, res);
      res.end(status);
    });
	 
// http://localhost:3000/yes/7576857417/
  app.post('/yes/:phone', function(req, res){
    var status = sms.smsGoing(req, res);
    res.end(status);
  });
  

};
