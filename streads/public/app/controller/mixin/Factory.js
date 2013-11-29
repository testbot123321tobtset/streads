Ext.define('X.controller.mixin.Factory', {
    generateFailedAuthenticationWindow: function(callback) {
        var me = this;
        Ext.Msg.alert(X.XConfig.getMESSAGES().ALERT, X.XConfig.getMESSAGES().FAILED_AUTHENTICATION, function() {
            me.executeCallback(callback);
        });
        return me;
    },
    generateInvalidAuthenticationWindow: function(callback) {
        var me = this;
        var message = Ext.isString(callback.message) ? callback.message : X.XConfig.getMESSAGES().INVALID_LOGIN;
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
    generateAndFillViewportWithBrandLoginWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithBrandLoginWindow()');
        }
        if (!Ext.isObject(me.getPageLogin())) {
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pagelogin'
            }).setActiveItem(1));
        }
        else {
            if(me.getPageLogin().isHidden()) {
                Ext.Viewport.removeAll(false, true).add(me.getPageLogin());
                me.getPageLogin().show();
                me.getPageLogin().setActiveItem(1);
            }
            else {
                me.getPageLogin().setActiveItem(1);
            }
        }
        return me;
    },
    generateAndFillViewportWithUserLoginWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserLoginWindow()');
        }
        if (!Ext.isObject(me.getPageLogin())) {
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pagelogin'
            }).setActiveItem(0));
        }
        else {
            if(me.getPageLogin().isHidden()) {
                Ext.Viewport.removeAll(false, true).add(me.getPageLogin());
                me.getPageLogin().show();
                me.getPageLogin().setActiveItem(0);
            }
            else {
                me.getPageLogin().setActiveItem(0);
            }
        }
        return me;
    },
    generateAndFillViewportWithUserRootNewsWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootNewsWindow()');
        }
        if (!Ext.isObject(me.getPageUserRoot())) {
            Ext.Viewport.removeAll(false, true).add(me.createView({
                xtype: 'pageuserroot'
            }).setActiveItem('#userNews'));
        }
        else {
            var pageUserRoot = me.getPageUserRoot();
            if(pageUserRoot.isHidden()) {
                Ext.Viewport.removeAll(false, true).add(pageUserRoot);
                pageUserRoot.show();
                pageUserRoot.setActiveItem('#userNews');
            }
            else {
                pageUserRoot.setActiveItem('#userNews');
            }
        }
        return me;
    },
    generateAndFillViewportWithUserRootMoreWindow: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreWindow()');
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
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreAccountWindow()');
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
            console.log('Debug: X.controller.mixin.Factory: generateAndFillViewportWithUserRootMoreLogoutWindow()');
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
    }
});
