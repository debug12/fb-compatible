var algorithm = function(userData, rishiData){
	var resultObj = {};
	var likes = 0;
	var events = 0;
	for(var i = 0; i < userData.likes.data.length; ++i){
		for(var j = 0; j < rishiData.likes.data.length; ++j){
			if(userData.likes.data[i].id == rishiData.likes.data[j].id){
				++likes;
			}
		}
	}
	console.log(likes);
	for(var i = 0; i < userData.events.data.length; ++i){
		for(var j = 0; j < rishiData.events.data.length; ++j){
			if(userData.events.data[i].id == rishiData.events.data[j].id){
				++events;
			}
		}
	}
	console.log(events);
	resultObj.percent = 0;
	if(userData.gender == "male"){
		resultObj.genderException = "You are a male. If rishi ever changes his mind, we'll be in touch.";
		resultObj.percent = 0;
		return resultObj;
	}
	if(userData.name == "Alisha Vora"){
		resultObj.loveInterest = "YEA ALISHA";
		resultObj.percent = 100;
		return resultObj;
	}
	if(parseBday(userData.birthday) == "1228"){
		resultObj.soulmateMessage = "OMG SOULMATEZ";
		resultObj.percent = 100;
		return resultObj;
	}
	if(userData.mutualfriends >= 150 && userData.mutualfriends <= 300){
		resultObj.percent += 15
	} else if(userData.mutualfriends > 300){
		resultObj.percent += 5;
	} else{
		resultObj.percent += 10;
	}
	if(parseHometown(userData.hometown.name) == "farmington hills michigan"){
		resultObj.hometownMessage = "Gotta be the hillz.";
		resultObj.percent += 5;
	}
	if(parseHometown(userData.location.name) == "ann arbor michigan" || parseHometown(userData.location.name) == "ann arbor"){
		resultObj.locMessage = "Gotta be the arb";
		resultObj.percent += 5;
	}
	if(userData.age_range.min <= 16 || userData.age_range.max > 21){
		resultObj.ageMessage = "You're too not in the right age range.";
	} else{
		resultObj.percent += 5;
	}
	userData.education.forEach(function(school){
		console.log(school.name);
		if(school.name == 'Harrison High School' && school.type == 'High School'){
			resultObj.percent += 5;
		} else{
			resultObj.highSchoolMessage = "You did not go to the same high school as rishi.";
		}
		if(school.name == 'University of Michigan' && school.type == 'College'){
			resultObj.percent += 10;
		} else{
			resultObj.collegeMessage = "You did not go to the same college as rishi.";
		}
	});
}

var parseHometown = function(hometown){
	var str = hometown.toLowerCase();
	str = str.replace(/,/g, '');
	return str;
}

var parseBday = function(bday){
	var str = bday.replace(/\//g, '');
	return str.substr(0, 4);
}

exports.algo = algorithm;