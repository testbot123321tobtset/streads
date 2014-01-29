Ext.define('X.view.plugandplay.UserSignupFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password'
    ],
    xtype: 'usersignupformpanel',
    id: 'userSignupFormPanel',
    config: {
        cls: 'user-signup-form-panel',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'signupFormFieldSet',
                cls: 'signup-form-fieldset',
                items: [
                    {
                        xtype: 'emailfield',
                        itemId: 'usernameEmailfield',
                        cls: 'username-emailfield',
                        name: 'usernameEmail',
                        placeHolder: 'Email'
                    },
                    {
                        xtype: 'passwordfield',
                        itemId: 'passwordTextfield',
                        cls: 'password-passwordfield',
                        name: 'password',
                        placeHolder: 'Password'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'submitButton',
                cls: 'submit-button',
                text: 'Sign up',
                ui: 'confirm'
            }
        ],
        url: 'users'
    },
    resetLoginFields: function() {
        var me = this;
        me.resetEmailField().resetPasswordField();
        return me;
    },
    resetEmailField: function() {
        var me = this;
        me.down('#usernameEmailfield').setValue('');
        return me;
    },
    resetPasswordField: function() {
        var me = this;
        me.down('#passwordTextfield').setValue('');
        return me;
    }
});