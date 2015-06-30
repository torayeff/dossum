Template.tabs.helpers({
	newMessage: function () {
		return Messages.find({to: Meteor.userId(), state: 'new-msg'}).count();
	}
});