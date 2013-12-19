var User = function() {
    var me = this;

    // required: true is shorthand for validatesPresent: https://groups.google.com/forum/#!topic/geddyjs/iRl2P064KN8
    me.defineProperties({
        usernameEmail: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string'
        },
        firstName: {
            type: 'string'
        },
        lastName: {
            type: 'string'
        }
    });

    me.validatesFormat('usernameEmail', /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    // required: true is shorthand for validatesPresent: https://groups.google.com/forum/#!topic/geddyjs/iRl2P064KN8
    // validatesPresent defaults to validating if present during create and update: http://geddyjs.org/reference#models.validatesPresent
    me.validatesPresent('password', {
        on: 'create'
    });

    me.hasMany('Passports');
};

User.fieldExcusionArray = [
    'password'
];
User.fieldUpdateExcusionArray = [
    // Once a user is created, we don't change email address
    'usernameEmail'
];

User = geddy.model.register('User', User);