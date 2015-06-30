Template.registerHelper('formatTime', function(timestamp) {
  return moment(timestamp).format('HH:mm DD/MM/YYYY');
});

Template.registerHelper('getTime', function(timestamp) {
  return moment(timestamp).format('HH:mm');
});

Template.registerHelper('getDate', function(timestamp) {
  return moment(timestamp).format('DD/MM/YYYY');
});

Template.registerHelper('isCordova', function(){
	return Meteor.isCordova;
});