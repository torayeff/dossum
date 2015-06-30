//Helper functions that work on server and client
createRoom = function(id1, id2) {
	return id1 < id2 ? id1 + '-' + id2 : id2 + '-' +id1;
};

roomToUsers = function(room, userId1) {
	//return users[0] = userId1
	//return users[1] = userId2
	var users = [];

	var ids = room.split('-');
	
	if (ids[0] === userId1) {
		users[0] = ids[0];
		users[1] = ids[1];
	} else {
		users[0] = ids[1];
		users[1] = ids[0];
	}	
	
	return users;
};

randomString = function(len) {
	var length = len || 10;
	var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
		return result;
};

dataURItoBlob = function(dataURI) {
	var byteString; 
	var mimestring ;

	if(dataURI.split(',')[0].indexOf('base64') !== -1 ) {
		byteString = atob(dataURI.split(',')[1]);
	} else {
		byteString = decodeURI(dataURI.split(',')[1]);
	}

	mimestring = dataURI.split(',')[0].split(':')[1].split(';')[0];

	var content = [];
	for (var i = 0; i < byteString.length; i++) {
		content[i] = byteString.charCodeAt(i);
	}

	return new Blob([new Uint8Array(content)], {type: mimestring});
};

isValidUploadURL = function(username, uplaodURL) {
	var validURL = Meteor.settings.public.gsBucketURL + '/users/' + username;
	return uplaodURL.lastIndexOf(validURL, 0) === 0; //starts with validURL
};