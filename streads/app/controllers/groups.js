var __ = require('underscore');
var AH = require('../helpers/application');
var UH = require('../helpers/user');

var Groups = function() {
    var me = this;

    me.respondsWith = [
        'json'
    ];

    me.checkIfAuthenticatedUserExists = function(next) {
        UH.checkIfAuthenticatedUserExists(this, me, next);
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
            if (__.isString(params.id)) {
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
                        var User = geddy.model.User;
                        User.first({
                            id: authenticatedUserId
                        }, function(fetchFromDbAuthenticatedUserErr, fetchedFromDbAuthenticatedUser) {
                            if (__.isObject(fetchFromDbAuthenticatedUserErr) || !__.isObject(fetchedFromDbAuthenticatedUser)) {
                                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('noAuthenticatedUserFound')));
                            }
                            else {
                                var group = Group.create(params);
                                var owner = fetchedFromDbAuthenticatedUser;
                                owner.addGroup(group);
                                owner.save(function(ownerSaveErr, ownerSaveData) {
                                    if (!__.isObject(ownerSaveErr) && __.isObject(ownerSaveData)) {
                                        me.authenticatedUser = ownerSaveData;
//                                        Success
                                        self.respond(AH.getSuccessResponseObject(params, ownerSaveData));
//                                        Websocket
                                        var websocketIdThatRequested = params.websocketId;
                                        var websocketThatRequested = geddy.io.sockets.socket(websocketIdThatRequested);
//                                        For all members of this group, identify all of their sockets and emit event
//                                        The way to do that would be to first, have every user as they log in to join a room of their own,
//                                        then broadcast to these rooms (that we can query by user.id as room name)
                                        group.getUsers(function(usersForGroupErr, usersForGroup) {
                                            usersForGroup.forEach(function(thisUserForGroup) {
                                                websocketThatRequested.broadcast.to(thisUserForGroup.id).
                                                        emit('creategroup', {
                                                            groupId: group.id,
                                                            updaterId: me.authenticatedUser.id
                                                        });
                                            });
                                        });
                                    }
                                    else {
                                        self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('groupForAuthenticatedUserCouldNotBeCreated')));
                                    }
                                });
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
    me.index = function(req, resp, params) {
        var self = this;

        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var user = me.authenticatedUser;
            user.getGroups(function(err, groups) {
                if (__.isObject(err)) {
                    self.respond(AH.getFailureResponseObject(params, err));
                }
                else if (!__.isObject(groups)) {
                    self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noGroupsFoundForAuthenticatedUser')));
                }
                else {
//                    Success
                    self.respond(AH.getSuccessResponseObject(params, groups));
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
//                                Success
                                self.respond(AH.getSuccessResponseObject(params, thisGroup));
                            }
                        });
                        if (!found) {
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
    me.update = function(req, resp, params) {
        var self = this;
        if (!__.isObject(me.authenticatedUser)) {
            self.respond(AH.getFailureResponseObject(params, me.error, me.message));
        }
        else {
            var Group = geddy.model.Group;
            var givenGroupId = params.id;
            if (!__.isString(givenGroupId)) {
                self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noGroupIdFoundInRequestForAuthenticatedUser')));
            }
            else {
                Group.first({
                    id: givenGroupId
                }, function(err, groupToBeUpdated) {
                    if (__.isObject(err)) {
                        self.respond(AH.getFailureResponseObject(params, err));
                    }
                    else if (!__.isObject(groupToBeUpdated)) {
                        self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noSuchGroupFoundForAuthenticatedUser')));
                    }
                    else {
                        groupToBeUpdated.updateAttributes(params);
                        groupToBeUpdated.save(function(savedGroupErr, savedGroup) {
                            if (__.isObject(savedGroupErr)) {
                                self.respond(AH.getFailureResponseObject(params, savedGroupErr));
                            }
                            else if (!__.isObject(savedGroup)) {
                                self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('groupForAuthenticatedUserCouldNotBeUpdated')));
                            }
                            else {
//                                Success
                                self.respond(AH.getSuccessResponseObject(params, savedGroup));
//                                Websocket
//                                geddy.io.sockets.in(givenGroupId).emit('update', data)
                                var websocketIdThatRequested = params.websocketId;
                                var websocketThatRequested = geddy.io.sockets.socket(websocketIdThatRequested);
//                                Broadcast to every socket in this group except the socket that just updated the group
                                websocketThatRequested.broadcast.to(givenGroupId).
                                        emit('updategroup', {
                                            groupId: givenGroupId,
                                            updaterId: me.authenticatedUser.id
                                        });
                            }
                        });
                    }
                });
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
            if (!__.isString(givenGroupId)) {
                self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noGroupIdFoundInRequestForAuthenticatedUser')));
            }
            else {
                Group.first({
                    id: givenGroupId
                }, function(err, groupToBeDeleted) {
                    if (__.isObject(err)) {
                        self.respond(AH.getFailureResponseObject(params, err));
                    }
                    else if (!__.isObject(groupToBeDeleted)) {
                        self.respond(AH.getFailureResponseObject(params, false, AH.getResponseMessage('noSuchGroupFoundForAuthenticatedUser')));
                    }
                    else {
//                        Delete the group first, then on success, delete all groupships
                        Group.remove(groupToBeDeleted.id, function(groupAfterDeleteErr) {
                            if (__.isObject(groupAfterDeleteErr)) {
                                self.respond(AH.getFailureResponseObject(params, groupAfterDeleteErr));
                            }
                            else {
//                                Success
                                self.respond(AH.getSuccessResponseObject(params));
//                                Websocket
                                var websocketIdThatRequested = params.websocketId;
                                var websocketThatRequested = geddy.io.sockets.socket(websocketIdThatRequested);
//                                Broadcast to every socket in this group except the socket that just updated the group
                                console.log('************************');
                                websocketThatRequested.broadcast.to(givenGroupId).
                                        emit('deletegroup', {
                                            groupId: givenGroupId,
                                            deleterId: me.authenticatedUser.id
                                        });
//                                Delete groupships
                                var Groupship = geddy.model.Groupship;
                                Groupship.all({
                                    groupId: givenGroupId
                                }, function(groupshipToBeDeletedErr, groupshipsToBeDeleted) {
                                    if (!__.isObject(groupshipToBeDeletedErr) && __.isObject(groupshipsToBeDeleted)) {
                                        groupshipsToBeDeleted.forEach(function(thisGroupshipToBeDeleted) {
                                            Groupship.remove(thisGroupshipToBeDeleted.id);
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        }
    };
};

exports.Groups = Groups;

