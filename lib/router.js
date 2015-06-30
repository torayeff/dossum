Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
	waitOn: function () {
		if (Meteor.user()) {
			
			var userIds = _.map(Meteor.user().profile.friends, function (f) {
				return f._id;
			});
			
			var subscriptions = _.map(userIds, function(fId) {
				return Meteor.subscribe('recentChats', fId);
			});

			subscriptions.push(Meteor.subscribe('friends', userIds));

			return subscriptions;
		}
	}
});

Router.route('/', function() {
	if (Meteor.user()) {
		this.redirect('contacts');
	} else {
		this.render('welcome');
	}
}, {name: 'home'});

Router.route('/contacts', function() {
	this.render('myContacts');
});

Router.route('/account', function() {
	this.render('myAccount');
});

Router.route('/changepwd', function() {
	this.render('changePwd');
});

Router.route('/change-avatar', function() {
	this.render('changeAvatar');
});

Router.route('/send-file/:friendId', function() { 
	this.render('sendFile');
});

Router.route('/logout', function(){
	if (Meteor.user()) {
		this.render('loading');
	} else {
		this.render('welcome');
	}
});

Router.route('/recent-chats', {
	name: 'recentChats',
	template: 'recentChats',
	data: function() {
		if (Meteor.user()) {
			var friends = _.map(Meteor.user().profile.friends, function (f) {
				return f._id;
			});

			var recentChats = [];

			for (var i = 0; i < friends.length; i++) {
				var room = createRoom(Meteor.userId(), friends[i]);
				var message = Messages.findOne({room: room}, {sort: {time: -1}});
				
				if (message)
					recentChats.push({room: room, message:message});
			}

			//newest first
			recentChats = _.sortBy(recentChats, function(chat){
				return -1 * chat.message.time;
			});

			return {recentChats: recentChats};
		}
	},

	action: function() {
		this.render('recentChats');
	}
});

Router.route('/profile/:username',{
	name: 'profileView',
	template: 'profileView',

	data: function() {
		var username = this.params.username;
		return {user: Meteor.users.findOne({username: username})};
	},

	action: function() {
		if (this.data().user) {
			this.render('profileView');
		} else {
			this.redirect('home');
		}
	}
});

Router.route('/chat/:friend/:limit?', {
	name: 'chat',
	controller: 'ChatController',
	template: 'chat'
});

ChatController = RouteController.extend({
	template: 'chat',
	increment: 15,
	chatLimit: function() {
		return parseInt(this.params.limit) || this.increment;
	},
	findOptions: function() {
		return {sort: {time: 1}};
	},
	room: function() {
		return createRoom(Meteor.userId(), this.params.friend);
	},
	subscriptions: function() {
		this.chatSub = Meteor.subscribe('chat', this.params.friend, this.chatLimit());
	},
	messages: function() {
		return Messages.find({room: this.room()}, this.findOptions());
	},
	data: function() {
		var hasMore = this.messages().count() === this.chatLimit();
		var olderChats = this.route.path({friend: this.params.friend, limit: this.chatLimit() + this.increment});
		return {
			room: this.room(),
			messages: this.messages(),
			ready: this.chatSub.ready(),
			olderChats: hasMore ? olderChats : null	
		};
	}
});

Router.route('/radius', function(){
	this.render('radius');
});

var requireLogin = function() {
	if (!Meteor.user()) {
		if (Meteor.loggingIn()) {
			this.render('loading');
		} else {
			this.render('welcome');
		}
	} else {
		this.next();
	}
};

Router.onBeforeAction(requireLogin, {except: ['account']});
