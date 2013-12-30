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
        items: [
            {
                xtype: 'fieldset',
                itemId: 'accountFormFieldSet',
                cls: 'account-form-fieldset',
                defaults: {
                    xtype: 'textfield'
                },
                title: 'My Account',
                items: [
                    {
                        itemId: 'firstNameTextfield',
                        cls: 'firstname-textfield',
                        placeHolder: 'First Name',
                        name: 'firstName'
                    },
                    {
                        itemId: 'lastNameTextfield',
                        cls: 'lastname-textfield',
                        placeHolder: 'Last Name',
                        name: 'lastName'
                    },
                    {
                        itemId: 'usernameEmailfield',
                        cls: 'username-emailfield',
                        placeHolder: 'Email',
                        name: 'usernameEmail',
                        readOnly: true
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#firstNameTextfield',
                buffer: 1
            },
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#lastNameTextfield',
                buffer: 1
            },
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#usernameEmail',
                buffer: 1
            }
        ]
    },
    onUserRecordChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var fieldName = field.getName();
        var authenticatedEntityFieldValue = X.authenticatedEntity.get(fieldName);
        if(authenticatedEntityFieldValue !== newValue) {
            X.authenticatedEntity.set(fieldName, newValue);
            Ext.Viewport.fireEvent('authenticatedUserDataEdit', {
                silent: true
            });
        }
    }
});