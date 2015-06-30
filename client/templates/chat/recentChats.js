Template.recentChats.helpers({
	totalRecentChats: function() {
		return Messages.find().count();
	},

	//find friend's id
	friendId: function(room) {
		return roomToUsers(room, Meteor.userId())[1]; 
	},

	//find friend's avatar
	friendAvatar: function(room) {
		var friendId = roomToUsers(room, Meteor.userId())[1]; 
		return Meteor.users.findOne({_id: friendId}).profile.avatarUrl;
	},

	//find firends's display name
	friendDisplayName: function(room) {
		var friendId = roomToUsers(room, Meteor.userId())[1];
		return Meteor.users.findOne({_id: friendId}).profile.displayName;
	},

	isNewMessage: function(from, state) {
		return state === 'new-msg' && from !== Meteor.userId();
	}
});