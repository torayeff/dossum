Template.myContacts.helpers({

	//Active friends
	totalActiveFriends: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'active';
		});

		return friends.length;
	},
	
	activeFriends: function () {
		
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'active';
		});
		
		var ids = _.map(friends, function (f) {
			return f._id;
		});

		return Meteor.users.find({_id: {$in: ids}}, {sort: {'profile.updatedAt' : -1}});
	},

	//New requests
	totalRequests: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'new-request';
		});

		return friends.length;
	},

	requestedFriends: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'new-request';
		});
		
		var ids = _.map(friends, function (f) {
			return f._id;
		});

		return Meteor.users.find({_id: {$in: ids}}, {sort: {'profile.updatedAt' : -1}});
	},

	//Pending friends
	totalPendings: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'pending';
		});

		return friends.length;
	},

	pendingFriends: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'pending';
		});
		
		var ids = _.map(friends, function (f) {
			return f._id;
		});

		return Meteor.users.find({_id: {$in: ids}}, {sort: {'profile.updatedAt' : -1}});
	},

	//Blocked friends
	totalBlocked: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'blocked';
		});

		return friends.length;
	},

	blockedFriends: function() {
		var friends = _.filter(Meteor.user().profile.friends, function (f) {
			return f.state === 'blocked';
		});
		
		var ids = _.map(friends, function (f) {
			return f._id;
		});

		return Meteor.users.find({_id: {$in: ids}}, {sort: {'profile.updatedAt' : -1}});
	}

});

Template.myContacts.events({
});