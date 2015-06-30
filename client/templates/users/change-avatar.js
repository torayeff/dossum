var uploader = new ReactiveVar(); //for progress

Template.changeAvatar.rendered = function () {
	avatarCrop = new CROP();
	currentZoom = 1;
};

Template.changeAvatar.helpers({
	progress: function () {
		var upload = uploader.get(); //get avatarUploader
		if (upload)
			return (Math.round(upload.progress() * 100) || 0) + '%';
	}
});

Template.changeAvatar.events({
 	'click [data-action=open-file-browser]': function() {
 		$('#file-input').click();
 	},

 	'click [data-action=take-photo]': function() {
 		var options = {  
 			width: 256,
 			height: 256,
 			quality: 100
 		};

 		MeteoricCamera.getPicture(options, function(err, dataURI){
 			if (err) {
 				IonPopup.alert({
					title: 'No photo',
					template: 'Avatar image was not selected',
					okText: 'OK',
					okType: 'button-assertive'
				});
 			} else {
 				$('.avatar-actions').hide();
 				$('.avatar-options').show();

 				avatarCrop.init({
 					container: '.avatar-crop',
 					image: dataURI,
 					width: 256,
 					height: 256,
 					mask: false,
 					zoom: {
 						steps: 0.01,
 						min: 1,
 						max: 5
 					}
 				});
 			}
 		});
 	},

 	'click [data-action=browse-gallery]': function() {
 		var options = {  
 			width: 256,
 			height: 256,
 			quality: 100,
 			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
 		};

 		MeteoricCamera.getPicture(options, function(err, dataURI){
 			if (err) {
 				IonPopup.alert({
					title: 'No photo',
					template: 'Avatar image was not selected',
					okText: 'OK',
					okType: 'button-assertive'
				});
 			} else {
 				$('.avatar-actions').hide();
 				$('.avatar-options').show();

 				avatarCrop.init({
 					container: '.avatar-crop',
 					image: dataURI,
 					width: 256,
 					height: 256,
 					mask: false,
 					zoom: {
 						steps: 0.01,
 						min: 1,
 						max: 5
 					}
 				});
 			}
 		});
 	},

 	'click [data-action=upload-avatar]': function() {
 		var avatarUploader = new Slingshot.Upload('avatarUploader');
 		var cropData = avatarCrop.data(256, 256, 'jpeg');
 		var img = dataURItoBlob(cropData.image);
 		
 		$('.button-bar').hide();
 		$(".loading").show();

 		avatarUploader.send(img, function(err, url) {
 			
 			uploader.set();

 			if (err) {
 				IonPopup.alert({
					title: 'Upload error',
					template: 'Error occured while uploading image',
					okText: 'OK',
					okType: 'button-assertive'
				});
				$(".loading").hide();
				$('.button-bar').show();
 			} else {
 				Meteor.call('changeAvatar', url);
 				Router.go('account');
 			}
 		});

 		uploader.set(avatarUploader);
 	},

 	'click [data-action=delete-avatar]': function() {
 		Meteor.call('changeAvatar', '');
 		Router.go('/account');
 	},

 	'click [data-action=zoom-out]': function () {
 		if (currentZoom > 1) {
 			currentZoom -= 0.1;
 			avatarCrop.zoom(currentZoom);
 		}
 	},

 	'click [data-action=zoom-in]': function () {
 		if (currentZoom < 5) {
 			currentZoom += 0.1;
 			avatarCrop.zoom(currentZoom);
 		}
 	},

 	'click [data-action=rotate]': function() {
 		avatarCrop.rotate();
 	}
 });