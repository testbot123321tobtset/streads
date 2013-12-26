Ext.define('X.controller.Groups', {
    extend: 'X.controller.Main',
    requires: [
        'X.model.validation.UserLogin'
    ],
    config: {
        models: [
            'Group',
            'User',
            'AuthenticatedUser'
        ],
        stores: [
            'Groups',
            'Users',
            'AuthenticatedUser'
        ],
        before: {
            showFeed: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showCreate: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ]
        },
        routes: {
            'user/profile/groups/feed': 'showFeed',
            'user/profile/groups/add': 'showCreate'
        },
        control: {
            // Group tab panel: contains group feed and add group UIs
            userGroupsTabPanel: {
                activeitemchange: 'onUserGroupsTabPanelPanelActiveItemChange'
            }
        },
        refs: {
            // User profile root page - this comes after authentication
            pageUserRoot: '#pageUserRoot',
            // User :: Groups
            userGroupsTabPanel: '#userGroupsTabPanel',
            userGroupsList: '#userGroupsTabPanel #userGroupFeeds #userGroupsList',
        }
    },
    // DIRECT EVENT HANDLERS
    onUserGroupsTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        var urlHash = me.getUrlHash();
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupsTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash);
        }
        if (activeItem.getItemId() === 'userGroupFeeds' && urlHash !== 'user/profile/groups/feed') {
            me.redirectTo('user/profile/groups/feed');
        }
        else if (activeItem.getItemId() === 'userAddGroups' && urlHash !== 'user/profile/groups/add') {
            me.redirectTo('user/profile/groups/add');
        }
        return me;
    },
    // Show groups disclosure list
    showFeed: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showFeed()');
        }
        me.generateAndFillViewportWithUserRootGroupsWindow().
                addGroupsListToGroupsFeedTab();
        return me;
    },
    addGroupsListToGroupsFeedTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.addGroupsListToGroupsFeedTab()');
        }
        var groupsList = me.getUserGroupsList();
        var groups = X.authenticatedEntity.get('groups');
        if (Ext.isObject(groupsList) && Ext.isArray(groups) && groups.length > 0) {
            groupsList.setData(groups);
        }
        return me;
    },
    // Show add group form
    showCreate: function() {
        var me = this;
        if (!Ext.isObject(me.getPageLogin()) || me.getPageLogin().
                isHidden() || !Ext.isObject(me.getPageLogin().
                getActiveItem()) || me.getPageLogin().
                getActiveItem().
                getItemId() !== 'userSignup') {
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.showCreate(): Current active item is not userLogin. Will call generateAndFillViewportWithUserLoginWindow()');
            }
            return me.generateAndFillViewportWithUserSignupWindow();
        }
        return me;
    },
    doSignup: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doSignup()');
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
            console.log('Debug: X.controller.Groups.xhrSignup()');
        }
        form.submit({
            method: 'POST',
            success: function(form, action) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.Groups.xhrSignup(): Successful');
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
                    console.log('Debug: X.controller.Groups.xhrSignup(): Failed. Received serverResponse:');
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
                            console.log('Debug: X.controller.Groups.xhrSignup(): Failed. Received no failure message from server');
                        }
                    }
                    else {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Groups.xhrSignup(): Failed. Received failure message from server: ' + serverResponseMessage);
                        }
                    }
                    me.generateFailedAuthenticationWindow({
                        message: serverResponseMessage
                    });
                }
                else {
                    if (!serverResponseResult) {
                        if (me.getDebug()) {
                            console.log('Debug: X.controller.Groups.xhrSignup(): Succeeded. But, no user object was found');
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
                            console.log('Debug: X.controller.Groups.xhrSignup(): Succeeded');
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
    show: function(id) {
        var me = this;
        if (X.XConfig.getDEBUG()) {
            console.log('Debug: X.controller.Groups.show()');
        }
        return me;
    },
    // AUTHENTICATED FUNCTIONS
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Groups.init()");
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Groups.launch()");
        }
    }
});