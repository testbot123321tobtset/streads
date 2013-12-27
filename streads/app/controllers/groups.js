var __ = require('underscore');
var AH = require('../helpers/application');

var Groups = function() {
    var me = this;

    me.respondsWith = [
        'json'
    ];

    me.checkIfAuthenticatedUserExists = function(next) {
        AH.checkIfAuthenticatedUserExists(this, me, next);
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
            var authenticatedUserId = me.authenticatedUser.id;
            // Make sure this is the authenticated user
            params.createdById = authenticatedUserId;
            if(__.isString(params.id)) {
                // Ext sends an id by default, and this id corresponds to the DOM id at the time the request was made
                // But we want this id to be Mongo id, so delete it, and Mongo will generate one by default
                delete params['id'];
            }
            var Group = geddy.model.Group;
            Group.first({
                createdById: authenticatedUserId,
                title: params.title
            }, function(err, data) {
                if (!err) {
                    if (!data) {
                        var owner = me.authenticatedUser;
                        var group = Group.create(params);
                        owner.addGroup(group);
                        owner.save(function(ownerSaveErr, ownerSaveData) {
                            if (!ownerSaveErr) {
                                self.respond(AH.getSuccessResponseObject(params, ownerSaveData));
                            }
                            else {
                                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('groupForAuthenticatedUserCouldNotBeCreated')));
                            }
                        });
                    }
                    else {
                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('groupTitleIsAlreadyTakenByTheCreator')));
                    }
                }
                else {
                    self.respond(AH.getFailureResponseObject(params, err));
                }
            });
        }
    };
    me.addGivenGroupToGivenUserAsGivenRole = function(options) {
        var self = this;
        
        var role = __isString(option.role) ? option.role : 'member';
        if(__.isObject(option.group) && __.isObject(option.user) && __isString(option.role)) {
            var group = option.group,
                    user = option.user;
            group.createdById = me.authenticatedUser.id;
            user.addGroup(group);
            user.save(function(err, data) {
                if (err) {
                    self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('groupForAuthenticatedUserCouldNotBeCreated')));
                }
                else {
                    group.getUsers(function(err, data) {
                                    console.log(data);
                                });
                    
                    self.respond(AH.getSuccessResponseObject(params, data));
                }
            });
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
    // Authenticated
    me.destroy = function(req, resp, params) {
        var self = this;
        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var Group = geddy.model.Group;
            var givenGroupId = params.id;
            if(!__.isString(givenGroupId)) {
                self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noGroupIdFoundInRequestForAuthenticatedUser')));
            }
            else {
                Group.first({
                    id: givenGroupId
                }, function(err, groupToBeDeleted) {
                    if(__.isObject(err)) {
                        self.respond(AH.getFailureResponseObject(params, err));
                    }
                    else if(!__.isObject(groupToBeDeleted)) {
                        self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noSuchGroupFoundForAuthenticatedUser')));
                    }
                    else {
                        var Groupship = geddy.model.Groupship;
                        Groupship.first({
                            groupId: givenGroupId,
                            userId: me.authenticatedUser.id
                        }, function(groupshipToBeDeletedErr, groupshipToBeDeletedData) {
                            if(__.isObject(groupshipToBeDeletedErr)) {
                                self.respond(AH.getFailureResponseObject(params, err));
                            }
                            else if(!__.isObject(groupshipToBeDeletedData)) {
                                self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noSuchGroupFoundForAuthenticatedUser')));
                            }
                            else {
                                me.destroyGivenGroupAndAllThroughAssociations({
                                    params: params,
                                    group: groupToBeDeleted,
                                    groupship: groupshipToBeDeletedData
                                });
                            }
                        });
                    }
                });
            }
        }
    };
    // No error checking done on options, so make sure it has everything the function needs
    me.destroyGivenGroupAndAllThroughAssociations = function(options) {
        var self = this;
        var Group = geddy.model.Group;
        var Groupship = geddy.model.Groupship;
        var owner = me.authenticatedUser,
                ownerId = owner.id;
        var groupToBeDeleted = options.group;
        var groupshipToBeDeleted = options.groupship;
        Groupship.remove(groupshipToBeDeleted.id, function(groupshipToBeDeletedErr, groupshipToBeDeletedData) {
            if (__.isObject(groupshipToBeDeletedErr)) {
                self.respond(AH.getFailureResponseObject(options.params, groupshipToBeDeletedErr));
            }
            else {
                Group.remove(groupToBeDeleted.id, function(groupToBeDeletedErr, groupToBeDeletedData) {
                    if (__.isObject(groupToBeDeletedErr)) {
                        self.respond(AH.getFailureResponseObject(options.params, groupToBeDeletedErr));
                    }
                    else {
                        self.respond(AH.getSuccessResponseObject(options.params, false, groupToBeDeletedData));
                    }
                });
            }
        });
    };
};

exports.Groups = Groups;

