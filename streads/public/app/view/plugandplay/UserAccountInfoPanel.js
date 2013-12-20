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
                        '<tpl if="typeof(firstName) === \'string\' && firstName !== \'\'">',
                        '{firstName} ',
                        '</tpl>',
                        '<tpl if="typeof(lastName) === \'string\' && lastName !== \'\'">',
                        '{lastName}',
                        '</tpl>',
                        '<tpl if="!this.nameExists(firstName, lastName)">',
                        '{usernameEmail}',
                        '</tpl>',
                        {
                            nameExists: function(firstName, lastName) {
                                return (typeof (firstName) === 'string' && firstName !== '') || (typeof (lastName) === 'string' && lastName !== '');
                            }
                        }
                )
            },
            {
                itemId: 'profilePanel',
                cls: 'user-account-profile-panel',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [
                    {
                        xtype: 'useraccountformpanel',
                        flex: 1
                    }
                ]
            }
        ]
    }
});