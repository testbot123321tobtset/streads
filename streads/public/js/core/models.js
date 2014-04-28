(function () {
var Friendship = function() {
    var me = this;
    
    // https://github.com/mde/model/blob/master/test/fixtures/friendship.js
    // https://github.com/mde/model/blob/master/test/integration/adapters/sql/eager_assn.js#L149
    me.property('approved', 'boolean');

    me.belongsTo('Friender', {
        model: 'User'
    });
    me.belongsTo('Friend', {
        model: 'User'
    });

};

exports.Friendship = Friendship;}());

(function () {
var Group = function() {
    var me = this;
    
    me.defineProperties({
        title: {
            type: 'string',
            required: true
        },
        createdById: {
            type: 'string',
            required: true
        },
        description: {
            type: 'text'
        }
    });
    
    me.hasMany('Users', {
        through: 'Groupships'
    });
};

exports.Group = Group;}());

(function () {
var Groupship = function() {
    var me = this;
    
    me.belongsTo('User');
    me.belongsTo('Group');
};

exports.Groupship = Groupship;}());

(function () {
var Passport = function() {
    var me = this;
    
    me.defineProperties({
        authType: {
            type: 'string'
        },
        key: {
            type: 'string'
        }
    });
    
    me.belongsTo('User');
};

exports.Passport = Passport;}());

(function () {
var __ = require('underscore');
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
    
//    Instance methods
//    me.includeFriends = function() {
//        me.friendsList = [
//        ];
//        me.getFriends(function(err, friends) {
//            if (!err) {
//                friends.forEach(function(friend) {
//                    delete friend['password'];
//                    me.friendsList.push(friend);
//                });
//            }
//            me.getFrienders(function(err, frienders) {
//                if (!err) {
//                    frienders.forEach(function(friender) {
//                        delete friender['password'];
//                        me.friendsList.push(friender);
//                    });
//                }
//                return me.friendsList;
//            });
//            console.log(me.friendsList);
//        });
//    };
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
User.includeFriends = function(user) {
    var me = this;
    user.friendsList = [
    ];
    console.log('@@@@@@' + user.usernameEmail);
    user.getFriends(function(friendsErr, friends) {
        if (!__.isObject(friendsErr)) {
            friends.forEach(function(friend) {
                console.log('>>>>>>>' + friend.usernameEmail);
                delete friend['password'];
                user.friendsList.push(friend);
            });
        }
//        user.getFrienders(function(friendersErr, frienders) {
//            if (!err) {
//                frienders.forEach(function(friender) {
//                    delete friender['password'];
//                    user.friendsList.push(friender);
//                });
//            }
//            console.log(user);
//            return user.friendsList;
//        });
    });
    user.getFrienders(function(friendersErr, frienders) {
        if (!__.isObject(friendersErr)) {
            frienders.forEach(function(friender) {
                console.log('########' + friender.usernameEmail);
                delete friender['password'];
                user.friendsList.push(friender);
            });
        }
        return user.friendsList;
    });
    return me;
};

exports.User = User;}());