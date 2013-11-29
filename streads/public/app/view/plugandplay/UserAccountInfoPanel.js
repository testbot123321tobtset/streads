Ext.define('X.view.plugandplay.UserAccountInfoPanel', {
    extend: 'Ext.Container',
    xtype: 'useraccountinfopanel',
    requires: [
        'X.view.ux.ToggleableButton'
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
                tpl: '{displayName}'
            },
            {
                itemId: 'creditCardsPanel',
                cls: 'user-account-credit-cards-panel',
                items: [
                    {
                        itemId: 'creditCardsLabelDisplayPanel',
                        cls: 'section-highlighted-separated-panel credit-cards-label-display-panel',
                        html: 'Your Credit Cards'
                    },
                    {
                        layout: {
                            type: 'hbox',
                            align: 'stretch',
                            pack: 'center'
                        },
                        items: [
                            {
                                xtype: 'button',
                                flex: 1,
                                itemId: 'addCreditCardButton',
                                cls: 'add-credit-card-button',
                                text: 'New',
                                ui: 'confirm'
                            },
                            {
                                xtype: 'button',
                                flex: 1,
                                itemId: 'submitCreditCardsButton',
                                cls: 'submit-credit-cards-button',
                                text: 'Save',
                                ui: 'confirm'
                            }
                        ]
                    }
                ]
            }
        ]
    }
});