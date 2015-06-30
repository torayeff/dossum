Template.profileView.rendered = function () {
	$('.popup-image').magnificPopup({type:'image'});
};

Template.profileView.helpers({
	'isNewRequest': function(friendId) {
		var user = _.find(Meteor.user().profile.friends, function(u) {
				return u._id === friendId;
			});

		if (user) {
			return user.state === 'new-request';
		} else {
			return false;
		}
	},

	'isActive': function(friendId) {
		var user = _.find(Meteor.user().profile.friends, function(u) {
				return u._id === friendId;
			});

		if (user) {
			return user.state === 'active';
		} else {
			return false;
		}
	},

	'isBlocked': function(friendId) {
		var user = _.find(Meteor.user().profile.friends, function(u) {
				return u._id === friendId;
			});

		if (user) {
			return user.state === 'blocked';
		} else {
			return false;
		}
	}
});

Template.profileView.events({
	'click [data-action=accept-friendship]': function(evt) {
		var friendId = $(evt.target).closest('a').attr('id');
		Meteor.call('acceptFriendship', friendId);
	},

	'click [data-action=reject-friendship]': function(evt) {
		var friendId = $(evt.target).closest('a').attr('id');
		Meteor.call('cancelFriendship', friendId);
		Router.go('/home');
	},

	'click [data-action=block-friend]': function(evt) {
		var friendId = $(evt.target).closest('a').attr('id');
		Meteor.call('blockFriend', friendId);
	},

	'click [data-action=unblock-friend]': function(evt) {
		var friendId = $(evt.target).closest('a').attr('id');
		Meteor.call('unblockFriend', friendId);
	},

	'click [data-action=delete-friend]': function(evt) {
		var friendId = $(evt.target).closest('a').attr('id');
		Meteor.call('cancelFriendship', friendId);
		Router.go('/home');
	}
});