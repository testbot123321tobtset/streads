var __ = require('underscore');
var AH = require('../helpers/application');

var Friendships = function() {
    var me = this;

    me.respondsWith = [
        'json'
    ];

    me.checkIfAuthenticatedUserExists = function(next) {
        var self = this;

        var User = geddy.model.User;
        User.first({
            id: self.session.get('userId')
        }, function(err, user) {
            if (__.isObject(user)) {
                // Include groups for authenticated user only
                user.includeGroups({
                    fn: function() {
                        me.authenticatedUser = user;
                        me.message = false;
                        __.each(User.fieldExcusionArray, function(field) {
                            if (__.has(me.authenticatedUser, field)) {
                                delete me.authenticatedUser[field];
                            }
                        });
                        next();
                    },
                    scope: me
                });
            }
            else {
                me.authenticatedUser = false;
                me.message = AH.getResponseMessage('noAuthenticatedUserFound');
                next();
            }
        });
    };

    me.before(me.checkIfAuthenticatedUserExists, {
        async: true
    });

    me.index = function(req, resp, params) {
        me.respond({params: params});
    };

    me.add = function(req, resp, params) {
        me.respond({params: params});
    };

    me.create = function(req, resp, params) {
        var self = this,
                Friendship = geddy.model.Friendship,
                User = geddy.model.User,
                frienderId = self.session.get("userId");
        var friendId;
        User.first({
            usernameEmail: params['friendEmailField']
        }, function(err, user) {
            if (!__.isObject(user) || err) {
                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('noUserFoundForEmail')));
            } else {
                // here we gets the user to make friend with
                friendId = user.id;
                // checks whether frienship already exists or not
                Friendship.first({
                    frienderUserId: frienderId,
                    friendUserId: friendId
                }, function(err, data) {
                    if (data) {
                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('friendshipAlreadyExists')));
                    } else { // create new friendship if there's no friendship yet
                        Friendship.first({
                            frienderUserId: friendId,
                            friendUserId: frienderId
                        }, function(err, data) {
                            if (data) {
                                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('friendshipAlreadyExists')));
                            } else {
                                var friendship = Friendship.create({
                                    frienderUserId: frienderId,
                                    friendUserId: friendId
                                });
                                friendship.save(function(err, data) {
                                    if (err) {
                                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('failedToSaveFriendship')));
                                    } else {
                                        self.respond(AH.getSuccessResponseObject(params, data));
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
        // Save the resource, then display index page
    };

    me.show = function(req, resp, params) {
        me.respond({params: params});
    };

    me.edit = function(req, resp, params) {
        me.respond({params: params});
    };

    me.update = function(req, resp, params) {
        // Save the resource, then display the item page
        me.redirect({controller: me.name, id: params.id});
    };

    me.remove = function(req, resp, params) {
        me.respond({params: params});
    };

};

exports.Friendships = Friendships;

