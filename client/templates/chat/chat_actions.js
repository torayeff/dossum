Template.chatActions.events({
	'click [data-action=delete-all]': function () {
		IonPopup.confirm({
			title: 'Are you sure?',
			template: 'Are you really sure to delete all messages?',
			okText: 'Yes!',
			okType: 'button-assertive',
			onOk: function() {
				var room = $('.room').val();
				Meteor.call('deleteAllMessages', room, function(err, res){
					if (err) {

					} else {
						Router.go('/recent-chats');
					}
				});
			},
			onCancel: function() {

			}
		});
	}
});