Ext.define('X.view.plugandplay.UserGroupsTabPanel', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserGroupAddFormPanel',
        'X.view.plugandplay.UserGroupsList'
    ],
    xtype: 'usergroupstabpanel',
    id: 'userGroupsTabPanel',
    config: {
        cls: 'user-groups-tab-panel',
        tabBarPosition: 'top',
        items: [
            {
                // This will have the UI to first display all groups
                // then on click, will display group feed
                layout: {
                    type: 'fit'
                },
                itemId: 'userGroupFeeds',
                cls: 'user-group-feeds',
                title: 'Feed',
                items: [
                    {
                        xtype: 'usergroupslist',
                        flex: 1
                    }
                ]
            },
            {
                layout: {
                    type: 'fit'
                },
                itemId: 'userAddGroups',
                cls: 'user-add-groups',
                title: 'Add',
                items: [
                    {
                        xtype: 'usergroupaddformpanel',
                        flex: 1
                    }
                ]
            }
        ]
    }
});
