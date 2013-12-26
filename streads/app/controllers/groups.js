var __ = require('underscore');
var AH = require('../helpers/application');

var Groups = function() {
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
            }
        });
    };

    me.before(me.checkIfAuthenticatedUserExists, {
        async: true
    });

    // Authenticated: only the authenticated user can create a group
    me.create = function(req, resp, params) {
        var self = this;

        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var Group = geddy.model.Group,
                    group = Group.create(params);
            if (group.isValid()) {
                group.save(function(err, data) {
                    if (err) {
                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('groupForAuthenticatedUserCouldNotBeCreated')));
                    } else {
                        self.respond(AH.getSuccessResponseObject(params, data));
                    }
                });
            }
        }
    };

    me.getMyGroupData = function(req, resp, params) {
        var self = this;
        
        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var id = params.id || false;
            if (id) {
                var user = me.authenticatedUser;
                user.getGroups(function(err, groups) {
                    if (!err) {
                        var found = false;
                        groups.forEach(function(thisGroup) {
                            if (thisGroup.id === id) {
                                found = true;
                                self.respond(AH.getSuccessResponseObject(params, thisGroup));
                            }
                        });
                        if(!found) {
                            self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noSuchGroupFoundForAuthenticatedUser')));
                        }
                    }
                    else {
                        self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noGroupsFoundForAuthenticatedUser')));
                    }
                });
            }
            else {
                self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noGroupIdFoundInRequestForAuthenticatedUser')));
            }
        }
    };
};

exports.Groups = Groups;

