Ext.define('X.view.page.Login', {
    extend: 'Ext.tab.Panel',
    requires: [
        'X.view.plugandplay.UserLoginFormPanel'
    ],
    xtype: 'pagelogin',
    id: 'pageLogin',
    config: {
        cls: 'page-login',
        tabBarPosition: 'bottom',
        items: [
            {
                layout: {
                    type: 'vbox',
                    pack: 'center',
                    align: 'stretch'
                },
                itemId: 'userLogin',
                cls: 'user-login',
                title: 'Log in',
                items: [
                    {
                        flex: 1,
                        html: 'Logo Placeholder',
                        scrollable: null
                    },
                    {
                        xtype: 'userloginformpanel',
                        flex: 1,
                        scrollable: null
                    }
                ]
            }
        ]
    }
});
