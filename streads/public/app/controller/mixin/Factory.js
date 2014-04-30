Ext.define('X.controller.mixin.Factory', {
    generateComponentsOnViewportPainted: function() {
        var me = this;
//        We haven\'t figured out eager generaton yet, but here is the hook
//        me.generateEagerComponents();
        me.generateCameraTriggerPanel();
        return me;
    },
    generateEagerComponents: function() {
        var me = this;
        var xTypesOfComponentsToBeEagerGenerated = X.config.Config.getEAGERGENERATECOMPONENTS();
        Ext.Array.each(xTypesOfComponentsToBeEagerGenerated, function(thisXtype) {
            me.createView({
                xtype: thisXtype,
                hidden: true
            }).
                    hide();
        });
        return me;
    },
    generateFriendshipSuccessfullyCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().FRIENDSHIP_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupSuccessfullyCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupFailedCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupSuccessfullyUpdatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_UPDATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateGroupSuccessfullyDestroyedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_SUCCESSFULLY_DESTROYED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_CREATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyUpdatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_UPDATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserSuccessfullyDestroyedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().USER_SUCCESSFULLY_DESTROYED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateUserFailedUpdatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().GROUP_FAILED_UPDATED;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateFailedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : 'Hmm, that failed for some reason. Let us know, and we\'ll take care of it.';
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateFailedAuthenticationWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().FAILED_AUTHENTICATION;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateInvalidAuthenticationWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : X.XConfig.getMESSAGES().INVALID_LOGIN;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateFailedSaveModelWindow: function(callback) {
        var me = this;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, X.XConfig.getMESSAGES().FAILED_SAVE, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateCameraTriggerPanel: function() {
        var me = this;
        var cameraTriggerPanel = Ext.Viewport.add(me.createView({
            xtype: 'cameratriggerpanel'
        }));
        cameraTriggerPanel.show();
    },
    generateUserDeviceContactsAccessRequestWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateUserDeviceContactsAccessRequestWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        Ext.Msg.confirm(X.XConfig.getMESSAGES().CONFIRM, X.XConfig.getMESSAGES().DEVICE_CONTACTS_ACCESS_REQUEST, function(buttonId) {
            if (buttonId === 'yes') {
                Ext.Viewport.fireEvent('devicecontactsstorerefreshuserrequest');
            }
        });
        return me;
    },
    generateAndFillViewportWithUserSignupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserSignupWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageLogin())) {
            Ext.Viewport.removeAll(false, false).
                    add(me.createView({
                        xtype: 'pagelogin'
                    }).
                            setDimensionsToFillScreen().
                            setActiveItem('#userSignup'));
        }
        else {
            if (me.getPageLogin().
                    isHidden()) {
                Ext.Viewport.removeAll(false, false).
                        add(me.getPageLogin());
                me.getPageLogin().
                        setDimensionsToFillScreen().
                        show();
                me.getPageLogin().
                        setActiveItem('#userSignup');
            }
            else {
                me.getPageLogin().
                        setActiveItem('#userSignup');
            }
        }
        return me;
    },
    generateAndFillViewportWithUserLoginWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserLoginWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageLogin())) {
            Ext.Viewport.removeAll(false, false).
                    add(me.createView({
                        xtype: 'pagelogin'
                    }).
                            setDimensionsToFillScreen().
                            setActiveItem('#userLogin'));
        }
        else {
            if (me.getPageLogin().
                    isHidden()) {
                Ext.Viewport.removeAll(false, false).
                        add(me.getPageLogin());
                me.getPageLogin().
                        setDimensionsToFillScreen().
                        show();
                me.getPageLogin().
                        setActiveItem('#userLogin');
            }
            else {
                me.getPageLogin().
                        setActiveItem('#userLogin');
            }
        }
        return me;
    },
    // User
    generatePageUserRoot: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generatePageUserRoot(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var pageUserRoot = me.getPageUserRoot();
        if (!Ext.isObject(pageUserRoot)) {
            pageUserRoot = Ext.Viewport.removeAll(false, false).
                    add(me.createView({
                        xtype: 'pageuserroot'
                    }));
        }
        
        return pageUserRoot.open();
    },
    // User :: More
    generateAndFillViewportWithUserRootMoreWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var pageUserRoot = me.generatePageUserRoot();
        pageUserRoot.setActiveItem('#userMore');
        
        return pageUserRoot;
    },
    // User :: More :: Account
    generateAndFillViewportWithUserRootMoreAccountWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreAccountWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var pageUserRoot = me.generateAndFillViewportWithUserRootMoreWindow();
        pageUserRoot.down('#userMoreTabPanel').
                setActiveItem('#userAccount');
        
        return pageUserRoot;
    },
    // User :: More :: Logout
    generateAndFillViewportWithUserRootMoreLogoutWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreLogoutWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var pageUserRoot = me.generateAndFillViewportWithUserRootMoreWindow();
        pageUserRoot.down('#userMoreTabPanel').
                setActiveItem('#userLogout');
        
        return pageUserRoot;
    },
    // User :: Groups
    generateAndFillViewportWithUserRootGroupsWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootGroupsWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var pageUserRoot = me.generatePageUserRoot();
        pageUserRoot.setActiveItem('#userGroups');
        
        return pageUserRoot;
    },
    // User :: Groups :: Feeds
    generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var pageUserRoot = me.generateAndFillViewportWithUserRootGroupsWindow();
        pageUserRoot.down('#userGroupsTabPanel').
                setActiveItem('#userGroupFeeds');

        return me;
    },
    // User :: Groups :: Feed :: Data window
    generateAndFillViewportWithGroupDataWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithGroupDataWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        options = Ext.isObject(options) ? options : false;
        if (options) {
            var group = ('group' in options && Ext.isObject(options.group)) ? options.group : false;
            var showContainer = ('showContainer' in options && Ext.isBoolean(options.showContainer)) ? options.showContainer : true;
            var createOptimizedLayeredEffect = ('createOptimizedLayeredEffect' in options && Ext.isBoolean(options.createOptimizedLayeredEffect)) ? options.createOptimizedLayeredEffect : true;
            var userGroupContainer = Ext.isObject(me.getUserGroupContainer()) ? me.getUserGroupContainer() : me.createView({
                xtype: 'usergroupcontainer'
            });
            if (showContainer) {
                if (X.config.Config.getLAYER_DEPTH_BASED_ON_OFFSET() && userGroupContainer.getDepthBasedOnOffset()) {
                    userGroupContainer.setDimensionsBasedOnDepthOffsetRelativeToGivenComponentAdjustingForLayer(Ext.Viewport);
                }
                else {
                    userGroupContainer.setDimensionsToFillScreen();
                }
                Ext.Viewport.add(userGroupContainer);
                if (createOptimizedLayeredEffect) {
                    userGroupContainer.createOptimizedLayeredEffect();
                }
                userGroupContainer.show(X.config.Config.getSHOW_ANIMATION_CONFIG());
                userGroupContainer.setRecordRecursive(group);
            }
            return me;
        }
        return false;
    },
    // User :: Groups :: Feed edit
    generateAndFillViewportWithGroupEditFormPanel: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithGroupEditFormPanel(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (Ext.isObject(options) && Ext.isObject(options.group)) {
            var group = options.group;
            var showContainer = Ext.isBoolean(options.showContainer) ? options.showContainer : true;
            var userEditGroupContainer = me.createView({
                xtype: 'usereditgroupcontainer'
            });
            if (showContainer) {
                if (X.config.Config.getLAYER_DEPTH_BASED_ON_OFFSET() && userEditGroupContainer.getDepthBasedOnOffset()) {
                    userEditGroupContainer.setDimensionsBasedOnDepthOffsetRelativeToGivenComponentAdjustingForLayer(Ext.Viewport);
                }
                else {
                    userEditGroupContainer.setDimensionsToFillScreen();
                }
                userEditGroupContainer.createOptimizedLayeredEffect();
                Ext.Viewport.add(userEditGroupContainer);
                userEditGroupContainer.show(X.config.Config.getSHOW_ANIMATION_CONFIG());
                userEditGroupContainer.setRecordRecursive(group);
            }
        }
        return me;
    },
    // User :: Groups :: Create
    activateUserAddGroupFormPanel: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: activateUserAddGroupFormPanel()');
        }

        var options = Ext.isObject(options) ? options : false;

        // Make sure pageUserRoot exists
        var pageUserRoot = me.getPageUserRoot();
        if (!Ext.isObject(pageUserRoot) || (Ext.isObject(pageUserRoot) && pageUserRoot.isHidden())) {
            pageUserRoot = me.generateAndFillViewportWithUserRootGroupsWindow().
                    getPageUserRoot();
        }
        pageUserRoot.setActiveItem('#userGroups');
        // If userGroups exists, then userGroupsTabPanel/usergroupstabpanel is guaranteed to exist
        pageUserRoot.down('#userGroupsTabPanel').
                setActiveItem('#userAddGroups');

        return me;
    },
    // Camera :: Photo message input
    generateAndFillViewportWithPhotoMessageInputContainerWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithPhotoMessageInputContainerWindow()');
        }

        var photoMessageInputContainer = false;
        var photoMessageInputContainerExists = Ext.isObject(me.getPhotoMessageInputContainer());
        if (photoMessageInputContainerExists) {
            photoMessageInputContainer = me.getPhotoMessageInputContainer();
            photoMessageInputContainer.open();
        }
        else {
            photoMessageInputContainer = Ext.Viewport.add(me.createView({
                xtype: 'photomessageinputcontainer'
            }));
            photoMessageInputContainer.open();
            photoMessageInputContainerExists = true;
        }
        if (photoMessageInputContainerExists) {
            var options = Ext.isObject(options) ? options : false;
            if (options) {
                var imageData = ('imageData' in options) ? options.imageData : false;
                if (imageData) {
                    var destinationType = X.config.Config.getPG_CAMERA().DESTINATION_TYPE;
                    if (destinationType === 1 || destinationType === 2) {
                        photoMessageInputContainer.setImageUsingFileUrl(imageData);
                    }
                    else if (destinationType === 0) {
                        photoMessageInputContainer.setImageUsingBase64Data(imageData);
                    }
                }
            }
        }

        return me;
    }
});
