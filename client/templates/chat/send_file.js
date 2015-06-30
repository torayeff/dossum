var uploader = new ReactiveVar(); //for progress

Template.sendFile.helpers({
	progress: function () {
		var upload = uploader.get(); //get fileUploader
		if (upload)
			return (Math.round(upload.progress() * 100) || 0) + '%';
	}
});

Template.sendFile.events({
 	'click [data-action=take-photo]': function() {
 		var options = {  
 			quality: 100
 		};

 		MeteoricCamera.getPicture(options, function(err, dataURI){
 			if (err) {
 				IonPopup.alert({
					title: 'No image',
					template: 'Image was not selected',
					okText: 'OK',
					okType: 'button-assertive'
				});
 			} else {
 				$('.file-sources').hide();
 				$('.file-data').show();
 				$('#img-data').attr('src', dataURI);
 			}
 		});
 	},

 	'click [data-action=browse-gallery]': function() {
 		var options = {  
 			quality: 75,
 			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
 		};

 		MeteoricCamera.getPicture(options, function(err, dataURI){
 			if (err) {
 				IonPopup.alert({
					title: 'No image',
					template: 'Image was not selected',
					okText: 'OK',
					okType: 'button-assertive'
				});
 			} else {
 				$('.file-sources').hide();
 				$('.file-data').show();
 				$('#img-data').attr('src', dataURI);
 			}
 		});
 	},

 	'click [data-action=upload-file]': function() {
 		var fileUploader = new Slingshot.Upload('fileUploader');
 		var img = dataURItoBlob($('#img-data').attr('src'));
 		
 		$('#upload-btn').hide();
 		$('#cancel-btn').show();

 		fileUploader.send(img, function(err, url) {
 			uploader.set();

 			if (err) {
 				IonPopup.alert({
					title: 'Upload error',
					template: err,
					okText: 'OK',
					okType: 'button-assertive'
				});
				$('#upload-btn').show();
 				$('#cancel-btn').hide();
 			} else {
 				//send file
 				var to = Router.current().params.friendId;
 				Meteor.call('sendMessage', to, '', 'image', url, function(err, res){
 					if (err) {
 						IonPopup.alert({
							title: 'Error sending message',
							template: err,
							okText: 'OK',
							okType: 'button-assertive'
						});
 					} else {
 						IonPopup.alert({
							title: 'Success!',
							template: 'Image was successfully sent!',
							okText: 'OK',
							okType: 'button-balanced'
						});
 						history.back();
 					}
 				});
 			}
 		});

 		uploader.set(fileUploader);
 	},

 	'click [data-action=cancel-upload]': function() {
 		var upload = uploader.get();
 		upload.xhr.abort();
 		$('#upload-btn').show();
 		$('#cancel-btn').hide();
 	}
 });