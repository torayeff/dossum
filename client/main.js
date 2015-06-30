Meteor.startup(function () {

    document.addEventListener('deviceReady', onDeviceReady, false);

	Push.addListener('message', function(notification) {

        //show toast notification
        if (notification.payload.msgId) {
            //toast for new messages
            var msg = Messages.findOne({_id: notification.payload.msgId});

            //show toast only if message was not read
            if (msg.state === 'new-msg') {
                var toastText = notification.payload.sender + ': ' + notification.message;
                window.plugins.toast.show(toastText, 'short', 'top');
            }
        } else {
            window.plugins.toast.show(notification.message, 'short', 'top');
        }
    });

    // Push.addListener('token', function(token) {
    //     alert(JSON.stringify(token));
    // });

    function onDeviceReady() {
        document.addEventListener('offline', function(){
            window.plugins.toast.show('No Internet Connection!', 'long', 'top');
        }, false);
    }
});