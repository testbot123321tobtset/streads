Ext.define('X.view.plugandplay.UserMoreTabPanel', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserAccountInfoPanel'
    ],
    xtype: 'usermoretabpanel',
    id: 'userMoreTabPanel',
    config: {
        cls: 'user-more-tab-panel',
        tabBarPosition: 'top',
        items: [
            {
                layout: {
                    type: 'fit'
                },
                itemId: 'userAccount',
                cls: 'user-account',
                title: 'Account',
                items: [
                    {
                        xtype: 'useraccountinfopanel',
                        flex: 1
                    }
                ]
            },
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'center'
                },
                itemId: 'userLogout',
                cls: 'user-logout',
                title: 'Log out',
                items: {
                    xtype: 'button',
                    style: 'width: 80%',
                    itemId: 'logoutButton',
                    cls: 'logout-button',
                    text: 'Log out',
                    ui: 'decline'
                }
            }
        ]
    }
});
