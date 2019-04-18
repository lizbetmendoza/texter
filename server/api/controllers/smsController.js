'use strict';
var tw = require('./twilio.js');
var dataService = require('../services/dataService.js');

// localhost:3000/smsTo/7576857417/testing 123
exports.smsTo = function(req, res){
	res.json({ message: 'smsTo result: ' + tw.sms.to(req.params.phone, req.params.message)});
};

// localhost:3000/smsAll/testing 123
exports.smsAll = function(req, res){
	res.json({ message: 'smsToAll result: ' + tw.sms.all(req.params.message)});
};

// created to test dataService calls from postman
// http://localhost:3000/optout/7576857417/
exports.smsOptOut = function(req, res){
	return dataService.updatePlayerStatus("inactive", req.params.phone);
};

// created to test dataService calls from postman
// http://localhost:3000/optin/7576857417/
exports.smsOptIn = function(req, res){
	return dataService.updatePlayerStatus("active", req.params.phone);
};

// created to test dataService calls from postman
// http://localhost:3000/list
exports.smsActivePlayers = function(req, res){
	return dataService.listActivePlayers();
}

// checks the reply from the cell phones
exports.smsInputAnalizer = function(req, res){
	var message = req.body.Body,
			from = req.body.From,
			isBroadcast = false,
			output = '';
	message = message.toLowerCase();
	switch (message){
			// TODO: make update nick option
			case 'update nick':
				break;
			case 'next event':
				// https://www.laserquest.com/public/locations/VA-Richmond-Midlothian.cfm#events_tab
				output = "Zombie Quest Latenighter - Fri. Oct. 20th";
				break;
			case 'optout':
				dataService.updatePlayerStatus("inactive", from);
				output = 'Your request was successfully processed, you have output!';
				break;
			case 'optin':
				dataService.updatePlayerStatus("active", from);
				output = 'Welcome to Hallsley LQ club';
				break;
			case 'list':
				output = dataService.listActivePlayers();
				break;
			case '?':
				output = 'Reply\nNEXT EVENT, to know the date for the next fun event.\n\nLIST, to get list of active players.\n\nOPTOUT, to stop Hallsley LQ messages.\n\nOPTIN, to enable or register to the group.\n\nYES, NO, MAYBE, will set your assistance status.\n\n?, To see the list of available options.\n\nAll options are not case sensitive'
				break;
			case 'yes':
			case 'no':
			case 'maybe':
				dataService.updateGoingStatus(message, from);
				output = 'Your going status was updated successfully!';
				break;
			// if it is not any command, might be a message to all the players
			default:
				tw.sms.broadcast(from, message);
				output = '';
				isBroadcast = true;
				break;
	}
	
	res.send('<Response><Message>' + output + '</Message></Response>');
	return;

	/*
	if (!isBroadcast) {
		res.send('<Response><Message>' + output + '</Message></Response>');
		//output = tw.sms.to(from, output);
		return;
	} else {
		res.send('<Response><Message></Message></Response>');
	};
	
	return;
 	//res.send('<Response><Message>' + output + '</Message></Response>');
	*/
}

exports.smsBroadcast = function(req, res){
	var msgFrom = req.body.From;
 	var msgBody = req.body.Body;
   tw.sms.broadcast(msgFrom, msgBody);
	//return;
	
 	res.send('<Response><Message></Message></Response>');
	return;
	
};
