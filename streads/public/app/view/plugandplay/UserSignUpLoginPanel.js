Ext.define('X.view.plugandplay.UserSignUpLoginPanel', {
	extend: 'X.view.core.FormPanel',
	requires: [
		'Ext.form.FieldSet',
    	'Ext.field.Email',
    	'Ext.field.Password',
    	'Ext.SegmentedButton'
    ],
    xtype: 'usersignuploginpanel',
    id: 'userSignupLoginPanel',
    config: {
    	cls: 'user-signup-login-panel',
    	layout: {
    		type: 'vbox',
    		pack: 'center',
    		align: 'center'
    	},
    	items: [
    		{
    			xtype: 'fieldset',
    			itemId: 'signupLoginFormFieldSet',
    			cls: 'signup-login-form-fieldset',
    			items: [
    				{
    					xtype: 'emailfield',
    					itemId: 'usernameEmailField',
    					cls: 'username-email-field',
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
    			xtype: 'segmentedbutton',
    			itemId: 'signupLoginButton',
    			cls: 'signup-login-button',
    			items: [
    				{
    					text: 'Log In',
                        id: 'LoginButton'
    				},
    				{
    					text: 'Sign Up',
                        id: 'SignupButton'
    				}
    			]
    		}	
    	],
    	url: 'login'
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
})