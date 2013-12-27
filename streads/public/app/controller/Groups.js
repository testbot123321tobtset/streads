Ext.define('X.controller.Groups', {
    extend: 'X.controller.Main',
    requires: [
        'X.view.plugandplay.UserGroupContainer'
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
            'user/profile/groups/create': 'showCreate'
        },
        control: {
            userGroupsTabPanel: {
                activeitemchange: 'onUserGroupsTabPanelPanelActiveItemChange'
            },
            userGroupCreateSubmitButton: {
                tap: 'doCreateGroup'
            },
            userGroupsList: {
                disclose: function() {
                    // Disclosure is handled by itemtap event, so return false here
                    return false;
                },
                itemtap: 'showGroupData'
            }
        },
        refs: {
            // User profile root page - this comes after authentication
            pageUserRoot: '#pageUserRoot',
            // User :: Groups
            userGroupsTabPanel: '#userGroupsTabPanel',
            // User :: Groups :: Feeds
            userGroupFeeds: '#userGroupsTabPanel #userGroupFeeds',
            userGroupsList: '#userGroupsTabPanel #userGroupFeeds #userGroupsList',
            // User :: Groups :: Create
            userGroupAddFormPanel: '#userGroupAddFormPanel',
            userGroupCreateSubmitButton: '#userGroupAddFormPanel #submitButton'
        }
    },
    // DIRECT EVENT HANDLERS
    onUserGroupsTabPanelPanelActiveItemChange: function(tabPanel, activeItem, previousActiveItem, eOpts) {
        var me = this;
        var urlHash = me.getUrlHash();
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupsTabPanelPanelActiveItemChange(): activeItem - ' + activeItem.getItemId() + ', previousActiveItem - ' + previousActiveItem.getItemId() + ', urlHash - ' + urlHash + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        if (activeItem.getItemId() === 'userGroupFeeds' && urlHash !== 'user/profile/groups/feed') {
            me.redirectTo('user/profile/groups/feed');
        }
        else if (activeItem.getItemId() === 'userAddGroups' && urlHash !== 'user/profile/groups/create') {
            me.redirectTo('user/profile/groups/create');
        }
        return me;
    },
    // Show groups disclosure list
    showFeed: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showFeed(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow().
                addGroupsListToGroupsFeedTab();
        return me;
    },
    addGroupsListToGroupsFeedTab: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.addGroupsListToGroupsFeedTab(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
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
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showCreate(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateAndFillUserRootGroupsWindowWithUserAddGroupWindow();
        return me;
    },
    doCreateGroup: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doCreateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        var formPanel = button.up('coreformpanel');
        var formData = formPanel.getValues();
        var title = formData.title;
        var description = formData.description;
        var newGroup = {
            title: title,
            description: description,
            createdById: X.authenticatedEntity.get('id')
        };
        var group = Ext.create('X.model.Group', newGroup);
        var errors = group.validate();
        if (!errors.isValid()) {
            me.generateFailedWindow({
                message: errors.getAt(0).
                        getMessage()
            });
        }
        else {
            group.save({
                success: function(record, operation) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.Groups.doCreateGroup(): Success. Received serverResponse:');
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
                                console.log('Debug: X.controller.Groups.doCreateGroup(): Success: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                            }
                            me.generateSuccessfulGroupCreatedWindow({
                                fn: function() {
                                    // Refresh authenticated user for truth
                                    Ext.getStore('AuthenticatedUserStore').load();
                                }
                            });
                        }
                        else {
                            if (!serverResponseMessage) {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.Groups.doCreateGroup(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                                me.generateFailedWindow();
                            }
                            else {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.Groups.doCreateGroup(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                                me.generateFailedWindow({
                                    message: serverResponseMessage
                                });
                            }
                        }
                    }
                    else {
                        me.generateFailedWindow();
                    }
                },
                failure: function(record, operation) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.Groups.doCreateGroup(): Failed. Received serverResponse:');
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
                                    console.log('Debug: X.controller.Groups.doCreateGroup(): Failed. Received no failure message from server: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                                me.generateFailedWindow();
                            }
                            else {
                                if (me.getDebug()) {
                                    console.log('Debug: X.controller.Groups.doCreateGroup(): Failed. Received failure message from server: ' + serverResponseMessage + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                                }
                                me.generateFailedWindow({
                                    message: serverResponseMessage
                                });
                            }
                        }
                        else {
                            me.generateFailedWindow();
                        }
                    }
                    else {
                        me.generateFailedWindow();
                    }
                }
            });
            group.commit();
        }
        return me;
    },
    showGroupData: function(id) {
        var me = this;
        if (X.XConfig.getDEBUG()) {
            console.log('Debug: X.controller.Groups.showGroupData(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateAndFillViewportWithGroupDataWindow();
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