Ext.define('X.view.page.user.Root', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserGroupsTabPanel',
        'X.view.plugandplay.UserMoreTabPanel'
    ],
    xtype: 'pageuserroot',
    id: 'pageUserRoot',
    config: {
        cls: 'page-user-root',
        tabBarPosition: 'bottom',
        tabBar: {
            docked: 'bottom',
            cls: 'x-stretched x-docked-bottom x-full-width',
            bottom: 0,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            }
        },
        items: [
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userGroups',
                cls: 'user-groups',
                iconCls: 'groups',
                items: [
                    {
                        flex: 1,
                        xtype: 'usergroupstabpanel'
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userMore',
                cls: 'user-more',
                iconCls: 'more',
                items: [
                    {
                        flex: 1,
                        xtype: 'usermoretabpanel'
                    }
                ]
            }
        ]
    }
});
