Ext.define('X.view.plugandplay.UserLoginFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Email',
        'Ext.field.Password'
    ],
    xtype: 'userloginformpanel',
    id: 'userLoginFormPanel',
    config: {
        cls: 'user-login-form-panel',
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        items: [
            {
                xtype: 'fieldset',
                itemId: 'loginFormFieldSet',
                cls: 'login-form-fieldset',
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
                text: 'Log in',
                ui: 'confirm'
            }
        ],
        url: 'login'
    },
    applyUrl: function(url) {
        return X.config.Config.getAPI_ENDPOINT() + url;
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