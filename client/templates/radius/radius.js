Template.radius.helpers({
	myLocation: function () {
		var options = {
			enableHighAccuracy: true,
	        maximumAge: 3000,
	        timeout: 60000
		};
		var location = Geolocation.latLng(options);
		if (location) {
			return location.lat + ', ' + location.lng;
		} else {
			var geoError = Geolocation.error(options);
			if (geoError) {
				alert('Geo Error: ' + JSON.stringify(geoError));
				geoError = null;
			}
			return 'Loading...';
		}
	}
});