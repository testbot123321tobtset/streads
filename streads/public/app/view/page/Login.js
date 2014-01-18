Ext.define('X.view.page.Login', {
    extend: 'Ext.form.Panel',
    requires: [
        'X.view.plugandplay.UserSignUpLoginPanel'
    ],
    xtype: 'pagelogin',
    id: 'pageLogin',
    config: {
        cls: 'page-login',
        layout: {
            type: 'vbox',
            pack: 'center'
        },
        items: [
            {
                html: 'Logo Placeholder',
                flex: 1,
                scrollable: null
            },
            {
                itemId: 'userLogin',
                xtype: 'usersignuploginpanel',
                flex: 1,
                scrollable: null
            }
        ]
    }
});