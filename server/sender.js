//https://www.youtube.com/watch?v=NMFhtWm2Lno
//node sender.js //sms sender

// var accountSid = 'AC08fc2f89580fe009a7c698ff4be41138'; //process.env.ACCOUNT_SID
// var authToken = 'a7f873e82b3b73d05b7d24c66d2a1c60';  //process.env.AUTH_TOKEN





var twilio = {
	vars : {
		accountSid : 'AC08fc2f89580fe009a7c698ff4be41138', //process.env.ACCOUNT_SID
		authToken : 'a7f873e82b3b73d05b7d24c66d2a1c60'  //process.env.AUTH_TOKEN		
	},
	
	_getPhoneNumbers: function(){
		return require('./config.json');
		//var config = require('./config.json');
		//console.log(config[0].name);
		//console.dir(config);
	},
	
	_sms: function(to, message){
		var client = require('twilio')(this.vars.accountSid, this.vars.authToken);
		
		client.messages.create({
			to: to,
			from: '7573188659',
			body: message
		}, function(err, message){
			if (err){
				console.log(err);
			} else {
				console.log(message.sid);
			}	
		});
	},
	
	sendSMS: function(){
		people = this._getPhoneNumbers();
		
		people.forEach(function(person){
			console.log(person.name + "|" + person.phone);
		})
		
	},		
}

twilio.sendSMS();
//twilioSender.sms();
