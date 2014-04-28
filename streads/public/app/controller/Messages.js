Ext.define('X.controller.Messages', {
    extend: 'X.controller.Main',
    requires: [
        'X.model.validation.UserLogin',
        'X.view.plugandplay.PhotoMessageInputContainer'
    ],
    config: {
        models: [
            'User',
            'AuthenticatedUser'
        ],
        stores: [
            'Users',
            'AuthenticatedUser'
        ],
        before: {
        },
        routes: {
        },
        control: {
            viewport: {
                photomessageinputcontainerclose: 'onPhotoMessageInputContainerClose'
            },
            cameraTriggerButton: {
                tap: 'onCameraTriggerButtonTap'
            }
        },
        refs: {
            photoMessageInputContainer: '#photoMessageInputContainer',
            cameraTriggerPanel: '#cameraTriggerPanel',
            cameraTriggerButton: '#cameraTriggerPanel #cameraTriggerButton'
        }
    },
    onCameraTriggerButtonTap: function(button, eOpts) {
        var me = this;
        if (Ext.browser.is.PhoneGap) {
            if (me.getDebug()) {
                console.log('Debug: PHONEGAP: X.controller.Messages.onCameraTriggerButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            me.generateAndFillViewportWithPhotoMessageInputContainerWindow();
            navigator.camera.getPicture(
                    function(imageData) {
                        if (me.getDebug()) {
                            console.log('Debug: PHONEGAP: X.controller.Messages.onCameraTriggerButtonTap(): navigator.camera.getPicture: Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        me.generateAndFillViewportWithPhotoMessageInputContainerWindow({
                            imageData: imageData
                        });
                    },
                    function() {
                        if (me.getDebug()) {
                            console.log('Debug: PHONEGAP: X.controller.Messages.onCameraTriggerButtonTap(): navigator.camera.getPicture: Failed: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                    },
                    {
                        quality: 100,
                        encodingType: Camera.EncodingType.JPEG,
                        sourceType: Camera.PictureSourceType.CAMERA,
//                        If you use DATA_URL here then use setSrc('data:image/jpeg;base64,' + imageData)
                        destinationType: Camera.DestinationType.FILE_URL,
                        mediaType: Camera.MediaType.ALLMEDIA,
                        saveToPhotoAlbum: false,
                        allowEdit: false,
                        correctOrientation: true
                    }
            );
        }
        else {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Messages.onCameraTriggerButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            me.generateAndFillViewportWithPhotoMessageInputContainerWindow();
            if (me.getDebug()) {
                console.log("Debug: This is not a Phonegap application");
            }
        }
        return me;
    },
    onPhotoMessageInputContainerClose: function() {
        var me = this;
        me.getCameraTriggerPanel().
                show(X.config.Config.getSHOW_BY_POP_ANIMATION_CONFIG());
        return me;
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Messages.init()");
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Messages.launch()");
        }
    }
});
