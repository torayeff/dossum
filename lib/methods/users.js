Ground.Collection(Meteor.users);

if (Meteor.isServer) {
	Accounts.onCreateUser(function(options, user) {
		if (options.profile) {
			options.profile.status = 'I am using Dossum!';
			options.profile.updatedAt = new Date();
			options.profile.avatarUrl = '/no_avatar.png';
			options.profile.gender = null;
			options.profile.country = null;
			options.profile.city = null;
			options.profile.friends = [];
			options.profile.notifications = true;
			options.profile.language = 'en';
			user.profile = options.profile;
		}
		return user;
	});
}

Meteor.methods({
	searchUser: function(searchId) {
		check(searchId, String);
		searchId = searchId.toLowerCase();
		return Meteor.users.findOne({username: searchId}, {fields: {profile: 1} });
	},

	setStatus: function(status) {
		check(status, String);
		check(this.userId, String);
		status = status.substring(0, 80);

		Meteor.users.update(this.userId, {$set: {'profile.status': status, 'profile.updatedAt': new Date()}});
	},

	setDisplayName: function(displayName) {
		check(displayName, String);
		check(this.userId, String);
		displayName = displayName.substring(0, 40);

		Meteor.users.update(this.userId, {$set: {'profile.displayName': displayName, 'profile.updatedAt': new Date()}});
	},

	changeAvatar: function(url) {
		check(url, String);

		if (!this.userId) {
			return false;
		}

		var username = Meteor.users.findOne({_id: this.userId}, {fields: {username: 1}}).username;

		//allow files only from bucket
		if (!isValidUploadURL(username, url)) {
			url = '/no_avatar.png';
		}

		Meteor.users.update(this.userId, {$set: {'profile.avatarUrl': url}});
	},

	setGender: function(gender) {
		check(gender, String);
		Meteor.users.update(this.userId, {$set: {'profile.gender': gender, 'profile.updatedAt': new Date()}});
	},

	setNotification: function(value) {
		check(value, Boolean);
		Meteor.users.update(this.userId, {$set: {'profile.notifications': value, 'profile.updatedAt': new Date()}});
	}
});