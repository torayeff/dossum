Meteor.methods({
	sendRequest: function(friendId) {
		check(friendId, String);
		check(this.userId, String);

		var userId1 = this.userId;
		var userId2 = friendId;

		if (userId1 === userId2) {
			return 'You can not add yourself to your friends. Are you hacking :)';
		}

		//check whether users exists
		var userExists = Meteor.users.findOne({_id: userId2}, {fields: {_id: 1}});
		if (!userExists) {
			return 'There is no user with given ID!';
		}

		//check friendship state
		var user = Meteor.users.findOne({_id: userId1, 'profile.friends._id': userId2}, 
					{fields: {_id: 0, 'profile.friends':1} });
		if (user) {

			var state = _.find(user.profile.friends, function(u) {
				return u._id === userId2;
			}).state;

			if (state === 'new-request') {
				Meteor.users.update({_id: userId1, 'profile.friends._id': userId2}, 
							{$set: {'profile.friends.$.state': 'active'}});

				Meteor.users.update({_id: userId2, 'profile.friends._id': userId1}, 
									{$set: {'profile.friends.$.state': 'active'}});
				return 'You are now friends';
			} else if (state === 'pending') {
				return 'You have alrady sent friend request to this user!';
			} else if (state === 'was-blocked') {
				return 'You was blocked by this user';
			} else if (state === 'active') {
				return 'You are already friends!';
			}
		} else {
			//there was not any friend request from any side
			//add userId2 to userId1 as state=pending
			//add userId1 to userId2 as state=new-request
			Meteor.users.update({_id: userId1}, {$addToSet: {'profile.friends': {_id: userId2, 'state': 'pending'}}});
			Meteor.users.update({_id: userId2}, {$addToSet: {'profile.friends': {_id: userId1, 'state': 'new-request'}}});

			return 'Friend request has been sent!';
		}
	},

	acceptFriendship: function(friendId) {
		check(friendId, String);
		check(this.userId, String);

		var userId1 = this.userId;
		var userId2 = friendId;

		if (userId1 === userId2) {
			return false;
		}

		//check friendship state
		var user = Meteor.users.findOne({_id: userId1, 'profile.friends._id': userId2}, 
					{fields: {_id: 0, 'profile.friends':1} });

		if (user) {
			var state = _.find(user.profile.friends, function(u) {
				return u._id === userId2;
			}).state;

			//unblock only if was blocked
			if (state === 'new-request') {
				Meteor.users.update({_id: userId1, 'profile.friends._id': userId2}, 
							{$set: {'profile.friends.$.state': 'active'}});

				Meteor.users.update({_id: userId2, 'profile.friends._id': userId1}, 
									{$set: {'profile.friends.$.state': 'active'}});
			}
		}
	},

	cancelFriendship: function(friendId) {
		check(friendId, String);
		check(this.userId, String);

		var userId1 = this.userId;
		var userId2 = friendId;

		if (userId1 === userId2) {
			return false;
		}

		//remove _id s from friends array of both users
		Meteor.users.update({_id: userId1}, {$pull: {'profile.friends': {_id: userId2}}});
		Meteor.users.update({_id: userId2}, {$pull: {'profile.friends': {_id: userId1}}});
	},

	blockFriend: function(friendId) {
		check(friendId, String);
		check(this.userId, String);

		var userId1 = this.userId;
		var userId2 = friendId;

		if (userId1 === userId2) {
			return false;
		}

		//userId1 blocked userId2
		//userId2 was-blocked by userId1
		Meteor.users.update({_id: userId1, 'profile.friends._id': userId2}, 
							{$set: {'profile.friends.$.state': 'blocked'}});

		Meteor.users.update({_id: userId2, 'profile.friends._id': userId1}, 
							{$set: {'profile.friends.$.state': 'was-blocked'}});
	},

	unblockFriend: function(friendId) {
		check(friendId, String);
		check(this.userId, String);

		var userId1 = this.userId;
		var userId2 = friendId;

		if (userId1 === userId2) {
			return false;
		}

		//check friendship state
		var user = Meteor.users.findOne({_id: userId1, 'profile.friends._id': userId2}, 
					{fields: {_id: 0, 'profile.friends':1} });

		if (user) {
			var state = _.find(user.profile.friends, function(u) {
				return u._id === userId2;
			}).state;

			//unblock only if was blocked
			if (state === 'blocked') {
				Meteor.users.update({_id: userId1, 'profile.friends._id': userId2}, 
							{$set: {'profile.friends.$.state': 'active'}});

				Meteor.users.update({_id: userId2, 'profile.friends._id': userId1}, 
									{$set: {'profile.friends.$.state': 'active'}});
			}
		}
	},


});