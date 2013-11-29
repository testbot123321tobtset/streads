// NOT USED RIGHT NOW!
Ext.define('X.view.plugandplay.UserAccountFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email'
    ],
    xtype: 'useraccountformpanel',
    id: 'userAccountFormPanel',
    config: {
        cls: 'user-account-form-panel',
        layout: {
            type: 'fit'
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'accountFormFieldSet',
                cls: 'account-form-fieldset',
                defaults: {
                    labelWidth: '35%',
                    xtype: 'textfield',
                    readOnly: true
                },
                title: 'Your Names',
                items: [
                    {
                        itemId: 'usernamefield',
                        cls: 'username-field',
                        label: 'Id',
                        name: 'username'
                    },
                    {
                        itemId: 'firstNameTextfield',
                        cls: 'firstname-textfield',
                        label: 'First',
                        name: 'firstName'
                    },
                    {
                        itemId: 'lastNameTextfield',
                        cls: 'lastname-textfield',
                        label: 'Last',
                        name: 'lastName'
                    },
                    {
                        itemId: 'displayNameTextfield',
                        cls: 'displayname-textfield',
                        label: 'Screen',
                        name: 'displayName'
                    }
                ]
            }
        ]
    }
});