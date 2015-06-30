Template.myAccount.rendered = function () {
	$('.popup-image').magnificPopup({type:'image'});
};

Template.myAccount.helpers({
	selected: function (value1, value2) {
		return value1 === value2 ? 'selected' : '';
	},
	checked: function (value) {
		return value === true ? 'checked' : '';
	}
});

Template.myAccount.events({
	'click [data-action=edit-displayName]': function () {
		var oldName = $('#display-name').text();
		oldName = $('<i>' + oldName + '</i>').text();
		
		IonPopup.prompt({
			title: 'Display name',
			template: 'Maximum 40 characters',
			okText: 'Update',
			inputType: 'text',
			inputPlaceholder: oldName,
			onOk: function(evt, displayName) {
				Meteor.call('setDisplayName', displayName);
			}
		});
	},

	'click [data-action=compose-status]': function () {
		var oldStatus = $('#status').text();
		oldStatus = $('<i>' + oldStatus + '</i>').text();
		
		IonPopup.prompt({
			title: 'Compose status',
			template: 'Maximum 80 characters',
			okText: 'Update',
			inputType: 'text',
			inputPlaceholder: oldStatus,
			onOk: function(evt, status) {
				Meteor.call('setStatus', status);
			}
		});
	},

	'change #gender': function() {
		var gender = $('#gender').val();
		Meteor.call('setGender', gender);
	},

	'change #notif': function() {
		Meteor.call('setNotification', $('#notif').is(':checked'));
	},

	'click [data-action=changepwd]': function () {
		Router.go('changepwd');
	},

	'click [data-action=logout]': function () {
		AccountsTemplates.logout();
		Router.go('/logout');
	}
});