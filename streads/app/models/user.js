var AH = require('../helpers/application');

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
    // This expects 2 field from client: password and confirmPassword
    // Only if the 2 fields have the same value will the user be created
//    me.validatesConfirmed('password', 'confirmPassword', {
//        on: 'create'
//    });

    me.hasMany('Passports');
    
//    me.hasMany('Groupships');
//    me.hasMany('Groups', {through: 'Groupships'});

//    Named associations (http://geddyjs.org/guide#models)
//    
//    var User = function() {
//        this.property('familyName', 'string', {required: true});
//        this.property('givenName', 'string', {required: true});
//
//        this.hasMany('Kids', {model: 'Users'});
//    };
//    
//    The API for this is the same as with normal associations, using the set/add and get, with the appropriate 
//    association name (not the model name). For example, in the case of Kids, you'd use addKid and getKids.

    me.hasMany('Frienders', {
        through: 'Friendships',
        model: 'User'
    });
    me.hasMany('Friends', {
        through: 'Friendships',
        model: 'User'
    });
    
    me.hasMany('Groups', {
        through: 'Groupships'
    });
};

User.fieldShowExclusionArray = [
    'password'
];
User.fieldShowUnauthenticatedExclusionArray = [
    'groups'
];
User.fieldShowAuthenticatedExclusionArray = [
];
User.fieldUpdateExclusionArray = [
    // Once a user is created, we don't change email address
    'usernameEmail',
    'groups'
];

User.includeGroups = function(callback) {
    var me = this;
    me.groups = [
    ];
    me.getGroups(function(err, groups) {
        if (!err) {
            me.groups = groups;
        }
        AH.executeCallback(callback);
    });
};

//function to get list of friends. Return friendslist array
User.includeFriends = function() {
    var me = this;
    me.friendsList = [
    ];
    me.getFriends(function(err, friends) {
        if (!err) {
            friends.forEach(function(friend){
                delete friend['password'];
                me.friendsList.push(friend); 
            });     
        }
        me.getFrienders(function(err, frienders) {
            if (!err) {
                frienders.forEach(function(friender){
                    delete friender['password'];
                    me.friendsList.push(friender); 
                });     
               }
            return me.friendsList;
        });
    });
    
};

exports.User = User;