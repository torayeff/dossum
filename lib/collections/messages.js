Messages = new Meteor.Collection('messages');
Ground.Collection(Messages);

Meteor.methods({
	sendMessage: function(to, msg, type, fileURL) {
		check(msg, String);
		check(to, String);
		check(type, String);
		check(fileURL, String);
		check(this.userId, String);

		var from = this.userId;

		if (from === to) {
			return 'You can not send message to yourself';
		}

		var friend = _.filter(Meteor.user().profile.friends, function(friend) {
			return friend._id === to;
		});

		if (friend) {
			var state = friend[0].state;

			if (state === 'active') {
				var room = createRoom(from, to);
				var time = Date.now();
				
				var message = {
					room: room,
					from: from,
					to: to,
					users: [to, from],
					msg: msg,
					type: type,
					state: 'new-msg',
					time: time
				};

				if (type === 'image') {
					var username = Meteor.users.findOne({_id: this.userId}, {fields: {username: 1}}).username;
					if (!isValidUploadURL(username, fileURL)) {
						return 'Forbidden!';
					}
					message.fileURL = fileURL;
					message.msg = 'Image message';
				}

				Messages.insert(message, function(err, msgId){
					if (msgId) {
						if (Meteor.isServer) {
							var senderName = Meteor.user().profile.displayName;
							var title = senderName;
							var text = message.msg;
							var query = {userId: to};
							var payload = {msgId: msgId, sender: senderName};
							Meteor.call('sendNotification', title, text, query, payload);
						}
					}
				});
			} else if (state === 'pending') {
				return 'User have not accepted your friendship yet!';
			} else if (state === 'was-blocked') {
				return 'You was blocked by this user';
			} else if (state === 'new-request') {
				return 'Please accept friendship first!';
			} else if (state === 'blocked') {
				return 'You have blocked this user!';
			}
		} else {
			return 'Youd do not have such kind of friend!';
		}
	},

	readMessage: function(msgId) {
		check(msgId, String);

		Messages.update({_id: msgId}, {$set: {state: 'read'}});
	},

	deleteMessage: function(msgId) {
		check(msgId, String);
		Messages.update({_id: msgId, users: this.userId}, {$pull: {'users': this.userId}});
	},

	deleteAllMessages: function(room) {
		check(room, String);
		Messages.update({room: room, users: this.userId}, {$pull: {'users': this.userId}}, {multi: true});
	},
});