Ext.define('X.controller.mixin.Factory', {
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
    generateSuccessfulUserCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : 'Arite! We have you in our system now! Now, let\'s log you in!';
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateSuccessfulGroupCreatedWindow: function(callback) {
        var me = this;
        var message = (Ext.isObject(callback) && Ext.isString(callback.message)) ? callback.message : 'Arite! We have your group in our system now! Now, start creating stories!';
        Ext.Msg.alert(X.XConfig.getMESSAGES().SUCCESS, message, function() {
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
    generateAndFillViewportWithUserSignupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserSignupWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (!Ext.isObject(me.getPageLogin())) {
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pagelogin'
            }).setActiveItem('#userSignup'));
        }
        else {
            if(me.getPageLogin().isHidden()) {
                Ext.Viewport.removeAll(false, true).add(me.getPageLogin());
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
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pagelogin'
            }).setActiveItem('#userLogin'));
        }
        else {
            if(me.getPageLogin().isHidden()) {
                Ext.Viewport.removeAll(false, true).add(me.getPageLogin());
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
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pageuserroot'
            }).setActiveItem('#userMore'));
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, true).add(pageUserRoot);
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
            var pageUserRoot = Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pageuserroot'
            }));
            pageUserRoot.setActiveItem('#userMore');
            pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userAccount');
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, true).add(pageUserRoot);
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
            var pageUserRoot = Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pageuserroot'
            }));
            pageUserRoot.setActiveItem('#userMore');
            pageUserRoot.down('#userMoreTabPanel').setActiveItem('#userLogout');
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, true).add(pageUserRoot);
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
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pageuserroot'
            }).setActiveItem('#userGroups'));
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, true).add(pageUserRoot);
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
    generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        // Make sure pageUserRoot exists
        var pageUserRoot = me.getPageUserRoot();
        if(!Ext.isObject(pageUserRoot) || (Ext.isObject(pageUserRoot) && pageUserRoot.isHidden())) {
            pageUserRoot = me.generateAndFillViewportWithUserRootGroupsWindow().getPageUserRoot();
        }
        pageUserRoot.setActiveItem('#userGroups');
        
        // If userGroups exists, then userGroupsTabPanel/usergroupstabpanel is guaranteed to exist
        pageUserRoot.down('#userGroupsTabPanel').setActiveItem('#userGroupFeeds');
        
        return me;
    },
    // User :: Groups :: Create
    generateAndFillUserRootGroupsWindowWithUserAddGroupWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillUserRootGroupsWindowWithAddUserGroupWindow()');
        }
        
        // Make sure pageUserRoot exists
        var pageUserRoot = me.getPageUserRoot();
        if(!Ext.isObject(pageUserRoot) || (Ext.isObject(pageUserRoot) && pageUserRoot.isHidden())) {
            pageUserRoot = me.generateAndFillViewportWithUserRootGroupsWindow().getPageUserRoot();
        }
        pageUserRoot.setActiveItem('#userGroups');
        
        // If userGroups exists, then userGroupsTabPanel/usergroupstabpanel is guaranteed to exist
        pageUserRoot.down('#userGroupsTabPanel').setActiveItem('#userAddGroups');
        
        return me;
    },
    // User :: Groups :: Feeds :: Group data: This is an independent panel i.e.
    // this is not nested withing any other panels. Any panel can call this component
    // without worrying about its place in the UI
    generateAndFillViewportWithGroupDataWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithGroupDataWindow(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        var userGroupContainer = me.createView({
            xtype: 'usergroupcontainer'
        });
        userGroupContainer.setWidth(Ext.Viewport.getWindowWidth());
        userGroupContainer.setHeight(Ext.Viewport.getWindowHeight());
        userGroupContainer.getBackButton().setText('Back');
        userGroupContainer.show(userGroupContainer.getShowAnimationConfig());
        return me;
    }
});
