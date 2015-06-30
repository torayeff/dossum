Meteor.publish('friends', function(userIds) {
	check(userIds, Array);
	return Meteor.users.find(
		{_id: {$in: userIds}}, 
		{fields: {username: 1, 'profile.displayName': 1, 'profile.status': 1, 
				 'profile.updatedAt': 1, 'profile.avatarUrl': 1}});
});

Meteor.publish('recentChats', function(friendId) {
	
	check(friendId, String);
	var room = createRoom(this.userId, friendId);

	return Messages.find({room: room, users: this.userId}, {sort: {time: -1}, limit: 1});
});

Meteor.publish('chat', function(friendId, limit) {
	check(friendId, String);
	check(limit, Number);
	var room = createRoom(this.userId, friendId);

	return Messages.find({room: room, users: this.userId}, {sort: {time: -1}, limit: limit});
});

Meteor.publish('profile', function(username) {
	check(username, String);
	return Meteor.users.find(
		{username: username}, 
		{fields: {username: 1, 'profile.displayName': 1, 'profile.status': 1, 
				 'profile.updatedAt': 1, 'profile.avatarUrl': 1}});
});