Ext.define('X.controller.mixin.User', {
    checkLoginAndResumeIfNotExistsOrRedirectIfExists: function(action) {
        var me = this;
        me.checkIfAuthenticatedUserExists({
            // Callback if authenticated user exists
            fn: function() {
                if (me.getUrlHash() !== X.XConfig.getDEFAULT_USER_PAGE()) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfNotExistsOrRedirectIfExists(): Authenticated user exists. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_USER_PAGE()');
                    }
                    me.redirectTo(X.XConfig.getDEFAULT_USER_PAGE());
                }
            },
            scope: me
        },
        {
            // Callback if authenticated user does not exist
            fn: function() {
                me.loadAuthenticatedUserStore({
                    // Callback if authenticated user exists
                    fn: function() {
                        if (me.getUrlHash() !== X.XConfig.getDEFAULT_USER_PAGE()) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_USER_PAGE() = ' + X.XConfig.getDEFAULT_USER_PAGE());
                            }
                            me.redirectTo(X.XConfig.getDEFAULT_USER_PAGE());
                        }
                    },
                    scope: me
                },
                {
                    // Callback if authenticated user does not exist
                    fn: function() {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfNotExistsOrRedirectIfExists(): Authenticated user does not exist. Will do action.resume()');
                        }
                        action.resume();
                    },
                    scope: me
                });
            },
            scope: me
        });
    },
    checkLoginAndResumeIfExistsOrRedirectIfNotExists: function(action) {
        var me = this;
        me.checkIfAuthenticatedUserExists({
            // Callback if authenticated user exists
            fn: function() {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Will do action.resume()');
                }
                action.resume();
            },
            scope: me
        },
        {
            // Callback if authenticated user does not exist
            fn: function() {
                me.loadAuthenticatedUserStore({
                    // Callback if authenticated user exists
                    fn: function() {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Will do action.resume()');
                        }
                        action.resume();
                    },
                    scope: me
                },
                {
                    // Callback if authenticated user does not exist
                    fn: function() {
                        if (me.getUrlHash() !== X.XConfig.getDEFAULT_LOGIN_PAGE()) {
                            if (me.getDebug()) {
                                console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user does not exist. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_LOGIN_PAGE()');
                            }
                            me.redirectTo(X.XConfig.getDEFAULT_LOGIN_PAGE());
                        }
                    },
                    scope: me
                });
            },
            scope: me
        });
    },
    getAuthenticatedUser: function() {
        var me = this;
        if (Ext.isBoolean(X.isUser) && X.isUser && Ext.isBoolean(X.authenticated) && X.authenticated && Ext.isObject(X.authenticatedEntity)) {
            return X.authenticatedEntity;
        }
        else {
            return false;
        }
        return me;
    },
    checkIfAuthenticatedUserExists: function(existsCallback, doesNotExistCallback) {
        var me = this;
        if (Ext.isObject(me.getAuthenticatedUser())) {
            me.executeCallback(existsCallback);
            return true;
        }
        else {
            me.executeCallback(doesNotExistCallback);
            return false;
        }
        return me;
    },
    isAuthenticatedUserIdSameAsGivenUserId: function(userId) {
        var me = this;
        if (Ext.isObject(me.getAuthenticatedUser())) {
            var authenticatedUser = me.getAuthenticatedUser();
            if (authenticatedUser.getId() === userId) {
                return X.authenticatedEntity;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        return me;
    },
    loadAuthenticatedUserStore: function(existsCallback, doesNotExistCallback, emptyAuthenticatedBrandStore) {
        var me = this;
        emptyAuthenticatedBrandStore = Ext.isBoolean(emptyAuthenticatedBrandStore) ? emptyAuthenticatedBrandStore : true;
        var authenticatedUserStore = Ext.getStore('AuthenticatedUserStore');
        authenticatedUserStore.load(function(records, successful) {
            if (!successful) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Operation failed');
                }
                var rawResponse = authenticatedUserStore.getProxy().getReader().rawData;
                if (!rawResponse.success) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Message from server: ' + rawResponse.message);
                    }
                }
                X.isUser = false;
                X.authenticated = false;
                X.authenticatedEntity = false;
                me.executeCallback(doesNotExistCallback);
            }
            else {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Operation succeeded');
                }
                if (Ext.isArray(records) && records.length > 0) {
                    var authenticatedUser = records[0];
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Authenticated user:');
                        console.log(authenticatedUser);
                    }
                    X.isUser = true;
                    X.authenticated = true;
                    X.authenticatedEntity = authenticatedUser;
                    me.executeCallback(existsCallback);
                }
                else {
                    var rawResponse = authenticatedUserStore.getProxy().getReader().rawData;
                    if (!rawResponse.success) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Message from server: ' + rawResponse.message);
                        }
                    }
                    X.isUser = false;
                    X.authenticated = false;
                    X.authenticatedEntity = false;
                    me.executeCallback(doesNotExistCallback);
                }
            }
        });
        return me;
    }
});
