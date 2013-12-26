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
                buffer: 10
            },
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#lastNameTextfield',
                buffer: 10
            },
            {
                fn: 'onUserRecordChange',
                event: 'change',
                delegate: '#usernameEmail',
                buffer: 10
            }
        ]
    },
    onUserRecordChange: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var userRecord = me.getRecord();
        var fieldName = field.getName();
        var knownFieldValue = X.authenticatedEntity.get(fieldName);
        if(knownFieldValue !== newValue) {
            // Authenticated users store will auto sync on set()
            X.authenticatedEntity.set(fieldName, newValue);
            // Need to commit to unset dirty
            X.authenticatedEntity.commit();
        }
    }
});