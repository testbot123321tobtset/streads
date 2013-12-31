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
            showGroupsList: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showFeedUiForGivenGroupId: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showEditGroupUiForGivenGroupId: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ],
            showCreate: [
                'checkLoginAndResumeIfExistsOrRedirectIfNotExists'
            ]
        },
        routes: {
            'user/profile/groups/feeds': 'showGroupsList',
            'user/profile/groups/feeds/:id': 'showFeedUiForGivenGroupId',
            'user/profile/groups/feeds/:id/edit': 'showEditGroupUiForGivenGroupId',
            'user/profile/groups/create': 'showCreate'
        },
        control: {
            viewport: {
                editgroup: 'onEditGroup',
                destroygroup: 'onDestroyGroup',
                destroyedgroup: 'onDestroyedGroup'
            },
            userGroupsTabPanel: {
                activeitemchange: 'onUserGroupsTabPanelPanelActiveItemChange'
            },
            userGroupCreateSubmitButton: {
                tap: 'doCreateGroup'
            },
            userGroupsList: {
                itemtap: 'onUserGroupsListItemTap'
            },
            // This is actually the Edit button for now
            // Maybe in future we might need more features here
            userGroupContainerMoreButton: {
                tap: 'onUserGroupContainerMoreButtonTap'
            },
            userGroupContainer: {
                hide: 'onUserGroupContainerHide'
            },
            userEditGroupContainer: {
                hide: 'onUserEditGroupContainerHide'
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
            userEditGroupContainer: '#userEditGroupContainer',
            userGroupEditFormPanel: '#userGroupEditFormPanel',
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
        if (activeItem.getItemId() === 'userGroupFeeds' && urlHash !== 'user/profile/groups/feeds') {
            me.redirectTo('user/profile/groups/feeds');
        }
        else if (activeItem.getItemId() === 'userAddGroups' && urlHash !== 'user/profile/groups/create') {
            me.redirectTo('user/profile/groups/create');
        }
        return me;
    },
    onUserGroupsListItemTap: function(list, index, target, record, e, eOpts) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupsListItemTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo('user/profile/groups/feeds/' + record.getId());
    },
    onUserGroupContainerMoreButtonTap: function(button) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupContainerMoreButtonTap(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        // TODO: This assumes that Edit button will only be tapped if active UI is the Group container
        // This isn't a very good assumption: see if there is a better way to do it
        me.redirectTo(me.getUrlHash() + '/edit');
        return me;
    },
    onUserGroupContainerHide: function(container) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserGroupContainerHide(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        // TODO: This assumes that group container can only come up if the UI underneath is the feeds UI
        // This isn't a very good assumption: see if there is a better way to do it
        me.redirectTo('user/profile/groups/feeds');
        return me;
    },
    onUserEditGroupContainerHide: function(container) {
        var me = this;
        var urlHash = me.getUrlHash();
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onUserEditGroupContainerHide(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo(urlHash.split('/edit')[0]);
        return me;
    },
    onEditGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onEditGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.doUpdateGroup(options);
    },
    onDestroyGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onDestroyGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.doDestroyGroup(options);
    },
    onDestroyedGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.onDestroyedGroup(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.redirectTo('user/profile/groups/feeds');
        return me;
    },
    // Show groups disclosure list
    showGroupsList: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showGroupsList(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateAndFillUserRootGroupsWindowWithUserGroupFeedsWindow().
                addGroupsListToGroupsFeedTab();
        return me;
    },
    showFeedUiForGivenGroupId: function(groupId) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateAndFillViewportWithGroupDataWindow(Ext.getStore('GroupsStore').getById(groupId));
        return me;
    },
    showEditGroupUiForGivenGroupId: function(groupId) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.showEditFeedUiForGivenGroupId(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        me.generateAndFillViewportWithGroupEditFormPanel(Ext.getStore('GroupsStore').getById(groupId));
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
    doUpdateGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doUpdateGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.saveGivenGroup(options);
    },
    doDestroyGroup: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.Groups.doDestroyGroup(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me.saveGivenGroup(options);
    },
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