Template.searchContactModal.events({
	'click [data-action=search-contact]': function (evt) {

		$('#user-data').hide();
		$('#no-user-error').hide();
		//IonLoading.hide();

		var searchId = $('input#search-id').val();

		if (searchId.length >= 5) {
			
			IonLoading.show();

			Meteor.call('searchUser', searchId, function(err, result) {
				if (result) {
					$('#resultAvatarUrl').attr('src', result.profile.avatarUrl);
					$('#resultDisplayName').text(result.profile.displayName);
					$('#resultStatus').text(result.profile.status);
					$('#to-id').val(result._id);
					$('#user-data').show();
					IonLoading.hide();
				} else {
					$('#no-user-error').show();
					IonLoading.hide();
				}
			});
		}
	},

	'click [data-action=send-request]': function(evt) {
		var toId = $('#to-id').val();

		Meteor.call('sendRequest', toId, function(err, result) {
			if (err) {
				IonPopup.show({
			    	title: 'Result',
			      	template: err,
			      	buttons: [{
			        	text: 'OK',
			        	type: 'button-assertive',
			        	onTap: function() {
			          		IonPopup.close();
			          		IonModal.close();
			        	}
			      	}]
			    });
			} else {
				IonPopup.show({
			    	title: 'Result',
			      	template: result,
			      	buttons: [{
			        	text: 'OK',
			        	type: 'button-positive',
			        	onTap: function() {
			          		IonPopup.close();
			          		IonModal.close();
			        	}
			      	}]
			    });
			}
		});
	}
});