var __ = require('underscore');

var passport = require('../helpers/passport'),
        cryptPass = passport.cryptPass,
        strategies = require('../helpers/passport/strategies'),
        authTypes = geddy.mixin(strategies, {
            local: {
                name: 'local account'
            }
        });

var AH = require('../helpers/application');
var UH = require('../helpers/user');

var Users = function() {
    var me = this;
    
    me.respondsWith = [
        'json'
    ];

    me.checkIfAuthenticatedUserExists = function(next) {
        UH.checkIfAuthenticatedUserExists(this, me, next);
    };
    me.before(me.checkIfAuthenticatedUserExists, {
        async: true,
        except: [
            'create'
        ]
    });

    // Unauthenticated: creates a user
    me.create = function(req, resp, params) {
      var self = this,
      User = geddy.model.User,
      user = User.create(params);

        // Non-blocking uniqueness checks are hard
        User.first({
            usernameEmail: user.usernameEmail
        }, function(err, data) {
            if (__.isObject(err)) {
                self.respond(AH.getFailureResponseObject(params, err));
            }
            else if (__.isObject(data)) {
                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('usernameEmailIsAlreadyTaken')));
            }
            else {
                if (user.isValid()) {
                    user.password = cryptPass(user.password);
                }
                user.save(function(err, data) {
                    if (__.isObject(err)) {
                        self.respond(AH.getFailureResponseObject(params, err));
                    }
                    else if (!__.isObject(data)) {
                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('authenticatedUserCouldNotBeCreated')));
                    }
                    else {
                        self.respond(AH.getSuccessResponseObject(params, data));
                    }
                });
            }
        });
    };

    // Basically, you won't need index, because when you show authenticated user, you will send
    // all her associations with the authenticated user response object. For now, since we are
    // not implementing public forums, we'll only have in-group and private messaging
    // 
    // Authenticated: displays all my friends (for now it displays all users TODO)
    //    me.index = function(req, resp, params) {
    //        var self = this;
    //
    //        if (!__.isObject(me.authenticatedUser)) {
    //            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
    //        }
    //        else {
    //            var User = geddy.model.User;
    //            User.all(function(err, users) {
    //                if (err || !users) {
    //                    self.respond(AH.getFailureResponseObject(params, err));
    //                }
    //                else {
    //                    __.each(users, function(user) {
    //                        __.each(User.fieldExcusionArray, function(field) {
    //                            if (__.has(user, field)) {
    //                                delete user[field];
    //                            }
    //                        });
    //                    });
    //                    self.respond(AH.getSuccessResponseObject(params, users));
    //                }
    //            });
    //        }
    //    };

    // Authenticated: logs a user out
    me.logout = function(req, resp, params) {
        var self = this;

        var session = self.session;
        session.unset('userId');
        session.unset('authType');
        self.respond(AH.getSuccessResponseObject(params, false, AH.getResponseMessage('authenticatedUserSuccessfullyLoggedOut')));
    };

    // Authenticated: display me
    me.showMe = function(req, resp, params) {
        var self = this;
        
        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
//            Success
            self.respond(AH.getSuccessResponseObject(params, me.authenticatedUser));
        }
    };

    // Authenticated: display a particular user using id from params
    me.show = function(req, resp, params) {
        var self = this;

        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            // If requested user is the same as authenticated user, then just use showMe()
            if (params.id === me.authenticatedUser.id) {
                me.showMe(req, resp, params);
            }
            else {
                var User = geddy.model.User;
                User.first(params.id, function(err, user) {
                    if (err || !user) {
                        if (!__isObject(err)) {
                            var err = new Error();
                        }
                        err.statusCode = 400;
                        self.respond(AH.getFailureResponseObject(params, err));
                    }
                    else {
                        __.each(User.fieldShowExclusionArray, function(field) {
                            if (__.has(user, field)) {
                                delete user[field];
                            }
                        });
                        __.each(User.fieldShowUnauthenticatedExclusionArray, function(field) {
                            if (__.has(user, field)) {
                                delete user[field];
                            }
                        });
                        self.respond(AH.getSuccessResponseObject(params, user.toObj()));
                    }
                });
            }
        }
    };

    // Authenticated: update authenticated and in-session user
    me.update = function(req, resp, params) {
        var self = this;
        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var authenticatedUser = me.authenticatedUser;
            var User = geddy.model.User;
            User.first(authenticatedUser.id, function(err, user) {
                var skip = User.fieldUpdateExclusionArray;
                // Update password only if it has changed
                if (!params.password) {
                    skip.push('password');
                }
                user.updateAttributes(params, {
                    skip: skip
                });
                if (params.password && user.isValid()) {
                    user.password = cryptPass(user.password);
                }
                user.save(function(savedUserErr, savedUser) {
                    if (__.isObject(savedUserErr)) {
                        self.respond(AH.getFailureResponseObject(params, savedUserErr));
                    }
                    else if (!__.isObject(savedUser)) {
                        self.respond(AH.getFailureResponseObject(params, savedUserErr, AH.getResponseMessage('authenticatedUserCouldNotBeUpdated')));
                    }
                    else {
                        __.each(User.fieldShowExclusionArray, function(field) {
                            if (__.has(savedUser, field)) {
                                delete savedUser[field];
                            }
                        });
                        self.respond(AH.getSuccessResponseObject(params, savedUser));
                    }
                });
            });
        }
    };

//    Authenticated: destroy in-session user
    me.destroy = function(req, resp, params) {
//        Implement me
    };
};

exports.Users = Users;
