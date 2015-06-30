Meteor.startup(function() {
	//ensure indexes
	
	//Messages.find({room: room, users: this.userId}, {sort: {time: -1}, limit: 1})
	Messages._ensureIndex({"room": 1, "users": 1, "time": -1});
});