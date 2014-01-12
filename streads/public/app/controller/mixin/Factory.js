Ext.define('X.controller.mixin.Factory', {
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
            xtype: 'cameratriggerpanel',
            style: 'background: transparent; z-index: 10;'
        }));
        cameraTriggerPanel.show();
    },
    generateAndFillViewportWithUserSignupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserSignupWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageLogin())) {
            Ext.Viewport.removeAll(false, false).add(me.createView({
                xtype: 'pagelogin'
            }).setActiveItem('#userSignup'));
        }
        else {
            if(me.getPageLogin().isHidden()) {
                Ext.Viewport.removeAll(false, false).add(me.getPageLogin());
                me.getPageLogin().show();
                me.getPageLogin().setActiveItem('#userSignup');
            }
            else {
                me.getPageLogin().setActiveItem('#userSignup');
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
            Ext.Viewport.removeAll(false, false).add(me.createView({
                xtype: 'pagelogin'
            }).setActiveItem('#userLogin'));
        }
        else {
            if(me.getPageLogin().isHidden()) {
                Ext.Viewport.removeAll(false, false).add(me.getPageLogin());
                me.getPageLogin().show();
                me.getPageLogin().setActiveItem('#userLogin');
            }
            else {
                me.getPageLogin().setActiveItem('#userLogin');
            }
        }
        return me;
    },
    generateAndFillViewportWithUserRootMoreWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageUserRoot())) {
            Ext.Viewport.removeAll(false, false).add(me.createView({
                xtype: 'pageuserroot'
            }).setActiveItem('#userMore'));
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, false).add(pageUserRoot);
                pageUserRoot.show();
                pageUserRoot.setActiveItem('#userMore');
            }
            else {
                pageUserRoot.setActiveItem('#userMore');
            }
        }
        return me;
    },
    generateAndFillViewportWithUserRootMoreAccountWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreAccountWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageUserRoot())) {
            var pageUserRoot = Ext.Viewport.removeAll(false, false).add(me.createView({
                xtype: 'pageuserroot'
            }));
            pageUserRoot.setActiveItem('#userMore');
            pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userAccount');
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, false).add(pageUserRoot);
                pageUserRoot.show();
                pageUserRoot.setActiveItem('#userMore');
                pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userAccount');
            }
            else {
                pageUserRoot.setActiveItem('#userMore');
                pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userAccount');
            }
        }
        return me;
    },
    generateAndFillViewportWithUserRootMoreLogoutWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreLogoutWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageUserRoot())) {
            var pageUserRoot = Ext.Viewport.removeAll(false, false).add(me.createView({
                xtype: 'pageuserroot'
            }));
            pageUserRoot.setActiveItem('#userMore');
            pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userLogout');
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, false).add(pageUserRoot);
                pageUserRoot.show();
                pageUserRoot.setActiveItem('#userMore');
                pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userLogout');
            }
            else {
                pageUserRoot.setActiveItem('#userMore');
                pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userLogout');
            }
        }
        return me;
    },
    
    // User :: Groups
    generateAndFillViewportWithUserRootGroupsWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootGroupsWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageUserRoot())) {
            Ext.Viewport.removeAll(false, false).add(me.createView({
                xtype: 'pageuserroot'
            }).setActiveItem('#userGroups'));
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, false).add(pageUserRoot);
                pageUserRoot.show();
                pageUserRoot.setActiveItem('#userGroups');
            }
            else {
                pageUserRoot.setActiveItem('#userGroups');
            }
        }
        return me;
    },
    // User :: Groups :: Feeds
    generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        var options = Ext.isObject(options) ? options : false;
        
        // Make sure pageUserRoot exists
        var pageUserRoot = me.getPageUserRoot();
        if(!Ext.isObject(pageUserRoot) || (Ext.isObject(pageUserRoot) && pageUserRoot.isHidden())) {
            pageUserRoot = me.generateAndFillViewportWithUserRootGroupsWindow().getPageUserRoot();
        }
        pageUserRoot.setActiveItem('#userGroups');
        // If userGroups exists, then userGroupsTabPanel/usergroupstabpanel is guaranteed to exist
        pageUserRoot.down('#userGroupsTabPanel').setActiveItem('#userGroupFeeds');
        
        var hideAllWindows = (options && Ext.isBoolean(options.hideAllWindows)) ? options.hideAllWindows : true;
        if(hideAllWindows) {
            me.hideAllWindows();
        }
        
        return me;
    },
    // User :: Groups :: Feed data
    generateAndFillViewportWithGroupDataWindow: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithGroupDataWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (Ext.isObject(options) && Ext.isObject(options.group)) {
            var group = options.group;
            var showContainer = Ext.isBoolean(options.showContainer) ? options.showContainer : true;
            var userGroupContainer = me.createView({
                xtype: 'usergroupcontainer'
            });
            userGroupContainer.setRecordRecursive(group);
            if (showContainer) {
                userGroupContainer.setWidth(Ext.Viewport.getWindowWidth());
                userGroupContainer.setHeight(Ext.Viewport.getWindowHeight());
                userGroupContainer.show(X.config.Config.getShowAnimationConfig());
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
            userEditGroupContainer.setRecordRecursive(group);
            if (showContainer) {
                userEditGroupContainer.setWidth(Ext.Viewport.getWindowWidth());
                userEditGroupContainer.setHeight(Ext.Viewport.getWindowHeight());
                userEditGroupContainer.show(X.config.Config.getShowAnimationConfig());
            }
            return me;
        }
        return false;
    },
    // User :: Groups :: Create
    generateAndFillUserRootGroupsWindowWithUserAddGroupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillUserRootGroupsWindowWithAddUserGroupWindow()');
        }
        
        var options = Ext.isObject(options) ? options : false;
        
        // Make sure pageUserRoot exists
        var pageUserRoot = me.getPageUserRoot();
        if(!Ext.isObject(pageUserRoot) || (Ext.isObject(pageUserRoot) && pageUserRoot.isHidden())) {
            pageUserRoot = me.generateAndFillViewportWithUserRootGroupsWindow().getPageUserRoot();
        }
        pageUserRoot.setActiveItem('#userGroups');
        // If userGroups exists, then userGroupsTabPanel/usergroupstabpanel is guaranteed to exist
        pageUserRoot.down('#userGroupsTabPanel').setActiveItem('#userAddGroups');
        
        var hideAllWindows = (options && Ext.isBoolean(options.hideAllWindows)) ? options.hideAllWindows : true;
        if(hideAllWindows) {
            me.hideAllWindows();
        }
        
        return me;
    }
});
