Template.chat.rendered = function () {
	
	//setting window focuses
	Session.set('window_focus', document.hasFocus());
	$(window).focus(function() {
		Session.set('window_focus', true);
	}).blur(function() {
		Session.set('window_focus', false);
	});

	//for cordova pause/resume
	if (Meteor.isCordova) {
		//app is paused
		document.addEventListener("pause", function(){
			Session.set('window_focus', false);
		}, false);

		//app is resumed
		document.addEventListener("resume", function(){
			Session.set('window_focus', true);
		}, false);

		//back button is pressed
		document.addEventListener("backbutton", function(){
			Router.go('recentChats');
		});
	}
	
	//scroll to bottom when page is rendered
	$('.discussion').scrollTop($('.discussion')[0].scrollHeight);
};

Template.chat.helpers({

	//Read last new-msg and set state=read
	readMessage: function(room) {

		var msg = Messages.findOne({room: room, to: Meteor.userId(), state: 'new-msg'});

		//read message only if window has focus
		if (msg && Session.get('window_focus')) {
			$('.discussion').scrollTop($('.discussion')[0].scrollHeight);
			Meteor.call('readMessage', msg._id);
		}
	},

	bubbleClass: function(from) {
		if (Meteor.userId() === from) {
			return 'self';
		} else {
			return 'other';
		}
	},

	username: function(from) {
		return Meteor.users.findOne({_id: from}).username;
	},

	avatarUrl: function(from){
		return Meteor.users.findOne({_id: from}).profile.avatarUrl;
	},

	friendId: function(room) {
		return roomToUsers(room, Meteor.userId())[1];
	},

	wasRead: function(from, state) {
		return Meteor.userId() === from && state === 'read';
	},

	imageMsg: function(type) {
		return type === 'image';
	}
});

Template.chat.events({
	'click [data-action=send-message]': function (evt) {
		evt.preventDefault();
		$('.discussion').scrollTop($('.discussion')[0].scrollHeight);

		var msg = $('#message-input').val();
		var friendId = $('input#friend-id').val();
		
		if (msg.length > 0) {
			$('#message-input').val('');
			Meteor.call('sendMessage', friendId, msg, 'text', '', function(err, res) {
				if (err) {
					IonPopup.alert({
						title: 'Message was not send',
						template: err,
						okText: 'OK',
						okType: 'button-assertive'
					});
				} else if (res) {
					IonPopup.alert({
						title: 'Sent error',
						template: res,
						okText: 'OK',
						okType: 'button-assertive'
					});
				}
			});
			
			//stay focused on input on mobiles
			$('#message-input').focus();
		}
	},

	'focus input#message-input': function (evt) {
		//for mobile devices
		setTimeout(function(){
			$('.discussion').scrollTop($('.discussion')[0].scrollHeight);
		}, 500);
	},

	'click a.popup-image': function(evt) {
		evt.preventDefault();
		var imageId = $(evt.target).closest('a').attr('id');
		$('#' + imageId).magnificPopup({type: 'image'});
		$('#' + imageId).trigger('click');
	},

	'keypress input': function(evt) {
		if (evt.keyCode ===  13) {
			$('[data-action=send-message]').click();
		}
	}
});