var ld = require('lodash');
var fs = require('fs');
var dataFile = '../data/config.json';

exports.activePlayers = function(){
  var people = require(dataFile);
  var active = people.filter(function(person){
    return person.status == "active";
  });
  
  return active;

};

_updateConfigJson = function(status, phone, field){
	
	console.log('updatePlayerStatus: setting ' + phone + ' ' + status);
	var people = require(dataFile);
	var updatingPhone = (phone.indexOf('+') == -1 ) ? '+1' + phone : phone,
			updatedSubscribers = [],
			updateRecord = ld.filter(people, person => person.phone == updatingPhone);

  switch (field){
    case 'status':
      updateRecord[0].status = status;
      break;
    case 'going':
      updateRecord[0].going = status;
      break;
  }

	people.forEach(function(person){
		(person.phone != updatingPhone)
			? updatedSubscribers.push(person)
			: updatedSubscribers.push(updateRecord[0]);
	});
	
	fs.writeFileSync('data/config.json', JSON.stringify(updatedSubscribers, null, 2));

  return "success";

};


exports.updatePlayerStatus = function(status, phone){	
	_updateConfigJson(status, phone, 'status');
};


exports.updateGoingStatus = function(status, phone){
  _updateConfigJson(status, phone, 'going');
}

exports.listActivePlayers = function(){
  var people = require(dataFile);
  var output = "",
      i = 1;

  activePeople = people.filter(function(person){
    return person.status == "active";
  });

  activePeople.forEach(function(person){
    output += i + ': ' + person.name + ', ' + person.phone + '\n';
    i++;
  });

  return output;
}
