Slingshot.fileRestrictions('avatarUploader', {
	allowedFileTypes: ['image/png', 'image/jpeg'],
	maxSize: 10 * 1024 * 1024
});

Slingshot.fileRestrictions('fileUploader', {
	allowedFileTypes: ['image/png', 'image/jpeg'],
	maxSize: 20 * 1024 * 1024
});