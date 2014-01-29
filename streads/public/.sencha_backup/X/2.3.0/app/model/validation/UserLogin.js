Ext.define('X.model.validation.UserLogin', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {
                name: 'usernameEmail'
            },
            {
                name: 'password'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'usernameEmail',
                message: 'It doesn\'t look like you entered an email.'
            },
            {
                type: 'email',
                field: 'usernameEmail',
                message: 'That email doesn\'t look like an email.'
            },
            {
                type: 'presence',
                field: 'password',
                message: 'How could you forget to enter your password?!'
            }
        ]
    }
});