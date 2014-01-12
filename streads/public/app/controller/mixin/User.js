Ext.define('X.controller.mixin.User', {
    saveAuthenticatedUser: function(options) {
        var me = this;
        var authenticatedUser = me.getAuthenticatedUser();
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Options:');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (Ext.isObject(authenticatedUser)) {
            var errors = authenticatedUser.validate();
            if (!errors.isValid()) {
                authenticatedUser.reject();
                me.generateUserFailedUpdatedWindow({
                    message: errors.getAt(0).
                            getMessage()
                });
                return false;
            }
            else {
                var silent = (Ext.isObject(options) && Ext.isBoolean(options.silent)) ? options.silent : false;
                authenticatedUser.save({
                    success: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        if (Ext.isString(operation.getResponse().responseText)) {
                            var serverResponse = Ext.decode(operation.getResponse().responseText);
                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                            if (serverResponseSuccess) {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            }
                            else {
                                if (!serverResponseMessage) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                        }
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: authenticatedUser,
                            message: serverResponseMessage,
                            silent: silent
                        });
                    },
                    failure: function(record, operation) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received serverResponse:');
                            console.log(operation.getResponse());
                            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        if (Ext.isString(operation.getResponse().responseText)) {
                            var serverResponse = Ext.decode(operation.getResponse().responseText);
                            var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                            var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                            var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                            if (!serverResponseSuccess) {
                                if (!serverResponseMessage) {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                                else {
                                    if (me.getDebug()) {
                                        console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                    }
                                }
                            }
                            else {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.mixin.User.saveAuthenticatedUser(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                            }
                        }
                        me.commitOrRejectModelAndGenerateUserFeedbackOnSavingModel({
                            operation: operation,
                            model: authenticatedUser,
                            message: serverResponseMessage,
                            silent: silent
                        });
                    }
                });
            }
        }
        else {
            return false;
        }
        return me;
    },
    checkLoginAndResumeIfNotExistsOrRedirectIfExists: function(action) {
        var me = this;
        me.checkIfAuthenticatedUserExists({
            // Callback if authenticated user exists
            fn: function() {
                if (me.getUrlHash() !== X.XConfig.getDEFAULT_USER_PAGE()) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfNotExistsOrRedirectIfExists(): Authenticated user exists. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_USER_PAGE() = ' + X.XConfig.getDEFAULT_USER_PAGE() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                                console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_USER_PAGE() = ' + X.XConfig.getDEFAULT_USER_PAGE() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                            console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfNotExistsOrRedirectIfExists(): Authenticated user does not exist. Will do action.resume(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                    console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Will do action.resume(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                            console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user exists. Will do action.resume(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                                console.log('Debug: X.controller.mixin.User.checkLoginAndResumeIfExistsOrRedirectIfNotExists(): Authenticated user does not exist. Current URL hash - ' + me.getUrlHash() + '. Will redirect to X.XConfig.getDEFAULT_LOGIN_PAGE() = ' + X.XConfig.getDEFAULT_LOGIN_PAGE() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Operation failed: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                var rawResponse = authenticatedUserStore.getProxy().
                        getReader().rawData;
                if (!rawResponse.success) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Message from server: ' + rawResponse.message + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                }
                X.isUser = false;
                X.authenticated = false;
                X.authenticatedEntity = false;
                me.executeCallback(doesNotExistCallback);
            }
            else {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Operation succeeded: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                if (Ext.isArray(records) && records.length > 0) {
                    var authenticatedUser = records[0];
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Authenticated user:');
                        console.log(authenticatedUser);
                        console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    X.isUser = true;
                    X.authenticated = true;
                    X.authenticatedEntity = authenticatedUser;
                    me.loadGroupsStore();
                    me.executeCallback(existsCallback);
                }
                else {
                    var rawResponse = authenticatedUserStore.getProxy().
                            getReader().rawData;
                    if (Ext.isObject(rawResponse) && !rawResponse.success) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.mixin.User: loadAuthenticatedUserStore(): Message from server: ' + rawResponse.message + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
