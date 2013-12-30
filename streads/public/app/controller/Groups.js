Ext.define('X.controller.Groups', {
    extend: 'X.controller.Main',
    requires: [
        'X.view.plugandplay.UserGroupContainer',
        'X.view.plugandplay.UserEditGroupContainer'
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
            viewport: {
                groupDataEdit: 'onGroupDataEdit'
            },
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
            },
            // This is actually the Edit button for now
            // Maybe in future we might need more features here
            userGroupContainerMoreButton: {
                tap: 'onUserGroupContainerMoreButtonTap'
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
            // This is an independent container i.e. this is not nested within any other panels
            userGroupContainer: '#userGroupContainer',
            userGroupContainerTopToolbar: '#userGroupContainer #userGroupContainerToolbar',
            userGroupContainerStoriesButton: '#userGroupContainer #userGroupContainerToolbar #storiesButton',
            userGroupContainerMoreButton: '#userGroupContainer #userGroupContainerToolbar #moreButton',
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
    onUserGroupContainerMoreButtonTap: function(button) {
        var me = this;
        me.generateAndFillViewportWithGroupEditFormPanel();
        return me;
    },
    onGroupDataEdit: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onGroupDataEdit(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.doUpdateGroup(options);
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
        var groupsStore = Ext.getStore('GroupsStore');
        var callbackFunction = function() {
            groupsList.setStore(groupsStore);
        };
        if (groupsStore.isLoading()) {
            me.runTask({
                fn: callbackFunction,
                condition: function() {
                    return groupsStore.isLoaded();
                },
                scope: me
            });
        }
        else {
            callbackFunction();
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
            if (me.getDebug()) {
                console.log('Debug: X.controller.Groups.doCreateGroup(): Will call saveGivenGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            var groupsStore = Ext.getStore('GroupsStore');
            groupsStore.add(group);
            me.saveGivenGroup({
                group: group
            });
        }
        return me;
    },
    doUpdateGroup: function(group) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doUpdateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.saveGivenGroup(group);
    },
    showGroupData: function() {
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