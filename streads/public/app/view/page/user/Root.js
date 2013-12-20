Ext.define('X.view.page.user.Root', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserMoreTabPanel'
    ],
    xtype: 'pageuserroot',
    id: 'pageUserRoot',
    config: {
        cls: 'page-user-root',
        tabBarPosition: 'bottom',
        /*
         * Use this to make the bottom tab bar transparent
        tabBar: {
            docked: 'bottom',
            cls: 'x-stretched x-docked-bottom x-transparent-bottom-tabbbar',
            bottom: 0,
            layout: {
                type: 'hbox',
                align: 'center',
                pack: 'center'
            }
        },
        */
        items: [
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userGroups',
                cls: 'user-groups',
                title: 'Groups',
                items: [
                    {
                        flex: 1,
                        html: 'This will list all of the user\'s groups. Clicking on each should take the user to that group\'s stream'
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
                title: 'More',
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
