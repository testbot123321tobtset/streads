var AuthenticatedUser = function() {
    var me = this;
    me.defineProperties({
        usernameEmail: {
            type: 'string',
            required: true
        },
        firstName: {
            type: 'string',
            required: true
        },
        lastName: {
            type: 'string',
            required: true
        }
    });

    me.validatesFormat('usernameEmail', /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

};

exports.AuthenticatedUser = AuthenticatedUser;