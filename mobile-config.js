App.accessRule('*');
App.accessRule('https://*.storage.googleapis.com/*');
App.accessRule('https://<APPNAME>.storage.googleapis.com/*');

App.info({
  id: 'com.dossum',
  name: 'Dossum',
  description: 'Open Source Instant Messenger built with Meteor',
  author: 'torayeff',
  website: 'http://dossum.com'
});

App.icons({
	'iphone_2x': 'resources/icons/ios_120x120.png', //120x120
	'iphone_3x': 'resources/icons/ios_180x180.png', //180x180
	'ipad': 'resources/icons/ios_76x76.png', //76x76
	'ipad_2x': 'resources/icons/ios_152x152.png', //152x152
	'android_ldpi': 'resources/icons/android_36x36.png', //36x36
	'android_mdpi': 'resources/icons/android_48x48.png', //48x48
	'android_hdpi': 'resources/icons/android_72x72.png', //72x72
	'android_xhdpi': 'resources/icons/android_96x96.png', //96x96

});

App.launchScreens({
	'iphone_2x': 'resources/launch_screens/ios_640x960.png', //640x960
	'iphone5': 'resources/launch_screens/ios_640x1136.png', //640x1136
	'iphone6': 'resources/launch_screens/ios_750x1334.png', //750x1334
	'iphone6p_portrait': 'resources/launch_screens/ios_1242x2208.png', //1242x2208
	'iphone6p_landscape': 'resources/launch_screens/ios_2208x1242.png', //2208x1242
	'ipad_portrait': 'resources/launch_screens/ios_768x1024.png', //768x1024
	'ipad_portrait_2x': 'resources/launch_screens/ios_1536x2048.png', //1536x2048
	'ipad_landscape': 'resources/launch_screens/ios_1024x768.png', //1024x768
	'ipad_landscape_2x': 'resources/launch_screens/ios_2048x1536.png', //2048x1536
	'android_ldpi_portrait': 'resources/launch_screens/android_200x320.png', //200x320
	'android_ldpi_landscape': 'resources/launch_screens/android_320x200.png', //320x200
	'android_mdpi_portrait': 'resources/launch_screens/android_320x480.png', //320x480
	'android_mdpi_landscape': 'resources/launch_screens/android_480x320.png', //480x320
	'android_hdpi_portrait': 'resources/launch_screens/android_480x800.png', //480x800
	'android_hdpi_landscape': 'resources/launch_screens/android_800x480.png', //800x480
	'android_xhdpi_portrait': 'resources/launch_screens/android_720x1280.png', //720x1280
	'android_xhdpi_landscape':	'resources/launch_screens/android_1280x720.png', //1280x720
});
