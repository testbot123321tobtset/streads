var passport = require('../helpers/passport'),
        cryptPass = passport.cryptPass,
        requireAuth = passport.requireAuth;

var __ = require('underscore');

var Users = function() {
    var me = this;

    me.before(requireAuth, {
        except: [
            'add', 'create'
        ]
    });

    me.respondsWith = [
        'json'
    ];

    me.index = function(req, resp, params) {
        var self = this;
        var User = geddy.model.User;
        User.all(function(err, users) {
            __.each(users, function(user) {
                __.each(User.fieldExcusionArray, function(field) {
                    if (__.has(user, field)) {
                        delete user[field];
                    }
                });
            });
            self.respond({
                params: params,
                success: true,
                result: users
            });
        });
    };

    me.create = function(req, resp, params) {
        var self = this,
                user = geddy.model.User.create(params);

        // Non-blocking uniqueness checks are hard
        geddy.model.User.first({
            usernameEmail: user.usernameEmail
        }, function(err, data) {
            if (data) {
                params.errors = {
                    usernameEmail: 'This usernameEmail is already in use.'
                };
                self.transfer('add');
            } else {
                if (user.isValid()) {
                    user.password = cryptPass(user.password);
                }
                user.save(function(err, data) {
                    if (err) {
                        self.respond({
                            params: params,
                            success: false
                        });
                    } else {
                        // Check what data contains - is it the user model?
                        console.log(data);
                        self.respond({
                            params: params,
                            success: true,
                            result: data
                        });
                    }
                });
            }
        });

    };

    me.show = function(req, resp, params) {
        var self = this;

        var User = geddy.model.User;
        User.first(params.id, function(err, user) {
            if (!user) {
                var err = new Error();
                err.statusCode = 400;
                params.errors = err;
                self.respond({
                    params: params,
                    success: false
                });
            } else {
                __.each(User.fieldExcusionArray, function(field) {
                    if (__.has(user, field)) {
                        delete user[field];
                    }
                });
                self.respond({
                    params: params,
                    success: true,
                    result: user.toObj()
                });
            }
        });
    };

    me.update = function(req, resp, params) {
        var self = this;

        geddy.model.User.first(params.id, function(err, user) {
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

            user.save(function(err, data) {
                if (err) {
                    params.errors = err;
                    // Check what data contains - is it the user model?
                    console.log(data);
                    self.respond({
                        params: params,
                        success: false
                    });
                } else {
                    // Check what data contains - is it the user model?
                    console.log(data);
                    self.respond({
                        params: params,
                        success: true,
                        result: data
                    });
                }
            });
        });
    };

    me.destroy = function(req, resp, params) {
        var self = this;

        geddy.model.User.remove(params.id, function(err, data) {
            if (err) {
                params.errors = err;
                // Check what data contains - is it the user model?
                console.log(data);
                self.respond({
                    params: params,
                    success: false
                });
            } else {
                // Check what data contains - is it the user model?
                console.log(data);
                self.respond({
                    params: params,
                    success: true,
                    result: data
                });
            }
        });
    };

};

exports.Users = Users;