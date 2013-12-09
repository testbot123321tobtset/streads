Ext.define('X.view.plugandplay.UserAccountInfoPanel', {
    extend: 'Ext.Container',
    xtype: 'useraccountinfopanel',
    requires: [
        'X.view.ux.ToggleableButton',
        'X.view.plugandplay.UserAccountFormPanel'
    ],
    id: 'userAccountInfoPanel',
    config: {
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        cls: 'user-account-info-panel',
        scrollable: true,
        items: [
            {
                itemId: 'userDisplayName',
                cls: 'highlighted-header-panel user-account-display-name-panel',
                tpl: new Ext.XTemplate(
                        '<tpl if="typeof(fullName) === \'string\'">',
                        '{fullName} {typeof(fullName)}',
                        '<tpl else>',
                        '{usernameEmail}',
                        '</tpl>'
                        )
            },
            {
                itemId: 'profilePanel',
                cls: 'user-account-profile-panel',
                items: [
                    {
                        itemId: 'profileLabelDisplayPanel',
                        cls: 'section-highlighted-separated-panel profile-label-display-panel',
                        html: 'Your Profile'
                    },
                    {
                        xtype: 'useraccountformpanel'
                    }
                ]
            }
        ]
    }
});