Ext.define('X.controller.Users', {
    extend: 'X.controller.Main',
    requires: [
        'X.model.validation.UserLogin'
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
            showSignup: [
                'checkLoginAndResumeIfNotExistsOrRedirectIfExists'
            ],
            showLogin: [
                'checkLoginAndResumeIfNotExistsOrRedirectIfExists'
            ],
            showAuthenticatedMoreAccountInformation: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showAuthenticatedMoreLogoutInformation: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ]
        },
        routes: {
            // Unauthenticated
            'user/signup': 'showSignup',
            'user/login': 'showLogin',
            // Authenticated
            'user/profile/more/account': 'showAuthenticatedMoreAccountInformation',
            'user/profile/more/logout': 'showAuthenticatedMoreLogoutInformation'
        },
        control: {
            // Login
            pageLogin: {
                activeitemchange: 'onPageLoginTabPanelActiveItemChange'
            },
            userSignupFormSubmitButton: {
                tap: 'doSignup'
            },
            userLoginFormSubmitButton: {
                tap: 'doLogin'
            },
            // User profile root page - this comes after authentication
            pageUserRoot: {
                activeitemchange: 'onPageUserRootTabPanelPanelActiveItemChange'
            },
            userMoreTabPanel: {
                activeitemchange: 'onUserMoreTabPanelPanelActiveItemChange'
            },
            //Logout
            logoutButton: {
                tap: 'doLogout'
            }
        },
        refs: {
            // Login
            pageLogin: '#pageLogin',
            userSignupFormPanel: '#userSignupFormPanel',
            userSignupFormSubmitButton: '#userSignupFormPanel #submitButton',
            userLoginFormPanel: '#userLoginFormPanel',
            userLoginFormSubmitButton: '#userLoginFormPanel #submitButton',
            // User profile root page - this comes after authentication
            pageUserRoot: '#pageUserRoot',
            // User :: More
            userMoreTabPanel: '#userMoreTabPanel',
            userAccountInfoPanel: '#userMoreTabPanel #userAccountInfoPanel',
            userAccountFormPanel: '#userMoreTabPanel #userAccountFormPanel',
            // User :: Logout
            userLogoutPanel: '#userMoreTabPanel #userLogout',
            logoutButton: '#userMoreTabPanel #userLogout #logoutButton'
        }
    },
    // DIRECT EVENT HANDLERS
    onPageLoginTabPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        var urlHash = me.getUrlHash();
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onPageLoginTabPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash);
        }
        if (activeItem.getItemId() === 'userLogin' && me.getUrlHash() !== X.XConfig.getDEFAULT_USER_LOGIN_PAGE()) {
            me.redirectTo(X.XConfig.getDEFAULT_USER_LOGIN_PAGE());
        }
        else if (activeItem.getItemId() === 'userSignup' && me.getUrlHash() !== X.XConfig.getDEFAULT_USER_SIGNUP_PAGE()) {
            me.redirectTo(X.XConfig.getDEFAULT_USER_SIGNUP_PAGE());
        }
        return me;
    },
    onPageUserRootTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        var urlHash = me.getUrlHash();
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onPageUserRootTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash);
        }
        if (activeItem.getItemId() === 'userGroups' && urlHash !== 'user/profile/groups/feed') {
            me.redirectTo('user/profile/groups/feed');
        }
        else if (activeItem.getItemId() === 'userMore' && urlHash !== 'user/profile/more/account') {
            me.redirectTo('user/profile/more/account');
        }
        return me;
    },
    onUserMoreTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        var urlHash = me.getUrlHash();
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.onUserMoreTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash);
        }
        if (activeItem.getItemId() === 'userAccount' && urlHash !== 'user/profile/more/account') {
            me.redirectTo('user/profile/more/account');
        }
        else if (activeItem.getItemId() === 'userLogout' && urlHash !== 'user/profile/more/logout') {
            me.redirectTo('user/profile/more/logout');
        }
        return me;
    },
    // Show sign up form
    showSignup: function() {
        var me = this;
        if (!Ext.isObject(me.getPageLogin()) || me.getPageLogin().
                isHidden() || !Ext.isObject(me.getPageLogin().
                getActiveItem()) || me.getPageLogin().
                getActiveItem().
                getItemId() !== 'userSignup') {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Users.showSignup(): Current active item is not userLogin. Will call generateAndFillViewportWithUserLoginWindow()');
            }
            return me.generateAndFillViewportWithUserSignupWindow();
        }
        return me;
    },
    doSignup: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doSignup()');
        }
        var formPanel = button.up('coreformpanel');
        var formData = formPanel.getValues();
        var usernameEmail = formData.usernameEmail;
        var password = formData.password;
        var modelValidationUserLogin = Ext.create('X.model.validation.UserLogin', {
            usernameEmail: usernameEmail,
            password: password
        });
        var errors = modelValidationUserLogin.validate();
        if (!errors.isValid()) {
            me.generateInvalidAuthenticationWindow({
                message: errors.getAt(0).
                        getMessage()
            });
            return false;
        }
        else {
            me.xhrSignup(formPanel);
        }
        return me;
    },
    // Ajax sign up
    // This assumes that the passed user object is valid
    xhrSignup: function(form) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.xhrSignup()');
        }
        form.submit({
            method: 'POST',
            success: function(form, action) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Users.xhrSignup(): Successful');
                }
                form.reset();
                me.generateSuccessfulUserCreatedWindow({
                    message: false,
                    fn: function() {
                        me.redirectTo(X.config.Config.getDEFAULT_USER_LOGIN_PAGE());
                    },
                    scope: me
                });
            },
            failure: function(form, serverResponse) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Users.xhrSignup(): Failed. Received serverResponse:');
                    console.log(serverResponse);
                    //me.redirectTo(X.config.Config.getDEFAULT_USER_LOGIN_PAGE());
                }
                form.reset();
                var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                if (!serverResponseSuccess) {
                    if (!serverResponseMessage) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrSignup(): Failed. Received no failure message from server');
                        }
                    }
                    else {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrSignup(): Failed. Received failure message from server: ' + serverResponseMessage);
                        }
                    }
                    me.generateFailedAuthenticationWindow({
                        message: serverResponseMessage
                    });
                }
                else {
                    if (!serverResponseResult) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrSignup(): Succeeded. But, no user object was found');
                        }
                        me.generateFailedAuthenticationWindow({
                            message: serverResponseMessage,
                            fn: function() {
                                me.redirectTo(X.config.Config.getDEFAULT_USER_LOGIN_PAGE());
                            },
                            scope: me
                        });
                    }
                    else {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrSignup(): Succeeded');
                        }
                        me.generateSuccessfulUserCreatedWindow({
                            message: serverResponseMessage,
                            fn: function() {
                                me.redirectTo(X.config.Config.getDEFAULT_USER_LOGIN_PAGE());
                            },
                            scope: me
                        });
                    }
                }
            }
        });
        return me;
    },
    // Show login form
    showLogin: function() {
        var me = this;
        if (!Ext.isObject(me.getPageLogin()) || me.getPageLogin().
                isHidden() || !Ext.isObject(me.getPageLogin().
                getActiveItem()) || me.getPageLogin().
                getActiveItem().
                getItemId() !== 'userLogin') {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Users.showLogin(): Current active item is not userLogin. Will call generateAndFillViewportWithUserLoginWindow()');
            }
            return me.generateAndFillViewportWithUserLoginWindow();
        }
        return me;
    },
    // Validate login form on submit and initiate login over ajax
    doLogin: function(button, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doLogin()');
        }
        var formPanel = button.up('coreformpanel');
        var formData = formPanel.getValues();
        var modelValidationUserLogin = Ext.create('X.model.validation.UserLogin', {
            usernameEmail: formData.usernameEmail,
            password: formData.password
        });
        var errors = modelValidationUserLogin.validate();
        if (!errors.isValid()) {
            me.generateInvalidAuthenticationWindow({
                message: errors.getAt(0).
                        getMessage()
            });
            return false;
        }
        else {
            me.xhrLogin(formPanel);
        }
        return me;
    },
    // Ajax login
    xhrLogin: function(form) {
        var me = this;
        form.submit({
            method: 'POST',
            success: function(form, action) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Users.xhrLogin(): Successful');
                }
                form.reset();
                me.loadAuthenticatedUserStore({
                    // Callback if authenticated user exists
                    fn: function() {
                        Ext.getStore('AuthenticatedUserStore').
                                removeAll();
                        me.resetAuthenticatedEntity();
                        Ext.create('Ext.util.DelayedTask', function() {
                            me.redirectTo(X.XConfig.getDEFAULT_USER_PAGE());
                        }).
                                delay(500);
                    },
                    scope: me
                });
            },
            failure: function(form, serverResponse) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Users.xhrLogin(): Failed. Received serverResponse:');
                    console.log(serverResponse);
                }
                form.reset();
                var serverResponseSuccess = Ext.isBoolean(serverResponse.success) ? serverResponse.success : false;
                var serverResponseMessage = Ext.isString(serverResponse.message) ? serverResponse.message : false;
                var serverResponseResult = Ext.isObject(serverResponse.result) ? serverResponse.result : false;
                if (!serverResponseSuccess) {
                    if (!serverResponseMessage) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrLogin(): Failed. Received no failure message from server');
                        }
                    }
                    else {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrLogin(): Failed. Received failure message from server: ' + serverResponseMessage);
                        }
                    }
                    me.generateFailedAuthenticationWindow({
                        message: serverResponseMessage,
                        fn: function() {
                            me.redirectTo(X.config.Config.getDEFAULT_USER_LOGIN_PAGE());
                        },
                        scope: me
                    });
                }
                else {
                    if (!serverResponseResult) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrLogin(): Succeeded. But, no authenticated user object was found');
                        }
                        me.generateFailedAuthenticationWindow({
                            message: serverResponseMessage,
                            fn: function() {
                                me.redirectTo(X.config.Config.getDEFAULT_USER_LOGIN_PAGE());
                            },
                            scope: me
                        });
                    }
                    else {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Users.xhrLogin(): Succeeded');
                        }
                        Ext.getStore('AuthenticatedUserStore').
                                removeAll();
                        me.resetAuthenticatedEntity();
                        Ext.create('Ext.util.DelayedTask', function() {
                            me.redirectTo(X.config.Config.getDEFAULT_USER_PAGE());
                        }).
                                delay(500);
                    }
                }
            }
        });
        return me;
    },
    show: function(id) {
        var me = this;
        if (X.XConfig.getDEBUG()) {
            console.log('Debug: X.controller.Users.show()');
        }
        return me;
    },
    authenticate: function(action) {
        var me = this;
        if (X.XConfig.getDEBUG()) {
            console.log('Debug: X.controller.Users.authenticate()');
        }
        action.resume();
    },
    // AUTHENTICATED FUNCTIONS
    showAuthenticatedMoreAccountInformation: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.showAuthenticatedMoreAccountInformation()');
        }
        me.generateAndFillViewportWithUserRootMoreAccountWindow();
        var userAccountInfoPanel = me.getUserAccountInfoPanel();
        userAccountInfoPanel.setRecordRecursive(X.authenticatedEntity);
        return me;
    },
    showAuthenticatedMoreLogoutInformation: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.showAuthenticatedMoreLogoutInformation()');
        }
        return me.generateAndFillViewportWithUserRootMoreLogoutWindow();
    },
    // Logout
    doLogout: function(button, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Users.doLogout()');
        }
        Ext.Ajax.request({
            url: X.XConfig.getDEFAULT_USER_LOGOUT_PAGE(),
            success: function(response) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Users.doLogout(): User successfully logged out. Will redirect to X.XConfig.getDEFAULT_USER_LOGIN_PAGE(). Response received from server:');
                    console.log(response.responseText);
                }
                Ext.getStore('AuthenticatedUserStore').
                        removeAll();
                me.resetAuthenticatedEntity();
                Ext.create('Ext.util.DelayedTask', function() {
                    me.redirectTo(X.XConfig.getDEFAULT_USER_LOGIN_PAGE());
                }).
                        delay(500);
            }
        });
        return me;
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Users.init()");
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Users.launch()");
        }
    }
});