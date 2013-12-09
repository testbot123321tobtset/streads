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

var Users = function() {
    var me = this;

    me.respondsWith = [
        'json'
    ];

    me.error = false;
    me.message = false;
    me.authenticatedUser = false;
    me.checkIfAuthenticatedUserExists = function(next) {
        var self = this;

        var User = geddy.model.User;
        User.first({
            id: self.session.get('userId')
        }, function(err, user) {
            me.error = __.isObject(err) ? err : false;
            if (__.isObject(user)) {
                me.authenticatedUser = user;
                me.message = false;
                __.each(User.fieldExcusionArray, function(field) {
                    if (__.has(me.authenticatedUser, field)) {
                        delete me.authenticatedUser[field];
                    }
                });
            }
            else {
                me.authenticatedUser = false;
                me.message = AH.getResponseMessage('noAuthenticatedUserFound');
            }
            next();
        });
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
        geddy.model.User.first({
            usernameEmail: user.usernameEmail
        }, function(err, data) {
            if (data) {
                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('usernameEmailIsAlreadyTaken')));
            } else {
                if (user.isValid()) {
                    user.password = cryptPass(user.password);
                }
                user.save(function(err, data) {
                    if (err) {
                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('authenticatedUserCouldNotBeCreated')));
                    } else {
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
    me.index = function(req, resp, params) {
        var self = this;

        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var User = geddy.model.User;
            User.all(function(err, users) {
                if (err || !users) {
                    self.respond(AH.getFailureResponseObject(params, err));
                }
                else {
                    __.each(users, function(user) {
                        __.each(User.fieldExcusionArray, function(field) {
                            if (__.has(user, field)) {
                                delete user[field];
                            }
                        });
                    });
                    self.respond(AH.getSuccessResponseObject(params, users));
                }
            });
        }
    };
    
    // Authenticated: logs a user in
    me.login = function(req, resp, params) {
        var self = this;
        
        console.log(passport.actions.local(req, resp, params));
    };
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
                    __.each(User.fieldExcusionArray, function(field) {
                        if (__.has(user, field)) {
                            delete user[field];
                        }
                    });
                    self.respond(AH.getSuccessResponseObject(params, user.toObj()));
                }
            });
        }
    };

    // Authenticated: update authenticated and in-session user
    me.update = function(req, resp, params) {
        var self = this;

        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var User = geddy.model.User;
            User.first(params.id, function(err, user) {
                // Only update password if it's changed
                var skip = params.password ? [
                ] : [
                    'password'
                ];
                user.updateAttributes(params, {
                    skip: skip
                });
                if (params.password && user.isValid()) {
                    user.password = cryptPass(user.password);
                }
                user.save(function(err, user) {
                    if (err || !user) {
                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('authenticatedUserCouldNotBeUpdated')));
                    }
                    else {
                        __.each(User.fieldExcusionArray, function(field) {
                            if (__.has(user, field)) {
                                delete user[field];
                            }
                        });
                        self.respond(AH.getSuccessResponseObject(params, user));
                    }
                });
            });
        }
    };

    // Authenticated: update authenticated and in-session user
    me.destroy = function(req, resp, params) {
        var self = this;

        var User = geddy.model.User;
        User.remove(params.id, function(err, user) {
            if (err) {
                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('authenticatedUserCouldNotBeDeleted')));
            } else {
                __.each(User.fieldExcusionArray, function(field) {
                    if (__.has(user, field)) {
                        delete user[field];
                    }
                });
                self.respond(AH.getSuccessResponseObject(params, user));
            }
        });
    };
};

exports.Users = Users;