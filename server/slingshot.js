//server
Slingshot.GoogleCloud.directiveDefault.GoogleSecretKey = Assets.getText('google-cloud-service-key.pem');

//avatarUploader
Slingshot.createDirective('avatarUploader', Slingshot.GoogleCloud, {
	bucket: Meteor.settings.gsBucket,
	GoogleAccessId: Meteor.settings.GoogleAccessId,
	acl: 'public-read',
	authorize: function() {
		if (!this.userId) {
			var message = 'Please login before posting file';
			throw new Meteor.Error('Login Required', message);
		}

		return true;
	},
	key: function(file) {
		var user = Meteor.users.findOne(this.userId);
		var ext = file.type.split('/')[1];
		return 'users/' + user.username + '/avatar/' + randomString(20) + '.' + ext;
	},
	cacheControl: 'public, max-age=315360000'
});

//imageUploader
Slingshot.createDirective('fileUploader', Slingshot.GoogleCloud, {
	bucket: Meteor.settings.gsBucket,
	GoogleAccessId: Meteor.settings.GoogleAccessId,
	acl: 'public-read',
	authorize: function() {
		if (!this.userId) {
			var message = 'Please login before posting file';
			throw new Meteor.Error('Login Required', message);
		}

		return true;
	},
	key: function(file) {
		var user = Meteor.users.findOne(this.userId);
		var ext = file.type.split('/')[1];
		return 'users/' + user.username + '/sent/' + randomString(20) + '.' + ext;
	},
	cacheControl: 'public, max-age=315360000'
});