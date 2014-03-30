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
                frienderId = self.session.get("userId"),                
                emailsStr = params['emails'];
        var emails = emailsStr.split(';');
        console.log("emails: "+emails);
        // Start loop through all emails
        emails.forEach(function(emailId){
            var friendId;
            console.log("emailId: "+emailId);
            User.first({
                usernameEmail: emailId
            }, function(userFromEmailIdErr, userFromEmailId) {
                if (!__.isObject(userFromEmailId) || userFromEmailIdErr) {
                       console.log("User doesnt exist");
                } else {
                    friendId = userFromEmailId.id;
                    // checks whether friendship already exists
                    Friendship.first({
                        frienderUserId: frienderId,
                        friendUserId: friendId
                    }, function(frienderAssociationErr, frienderAssociation) {
                        if (!frienderAssociationErr && __.isObject(frienderAssociation)) {
                            console.log("Friender Friendship already exists");
                        } else { 
                            Friendship.first({
                                frienderUserId: friendId,
                                friendUserId: frienderId
                            }, function(friendAssociationErr, friendAssociation) {
                                if (!friendAssociationErr && __.isObject(friendAssociation)) {
                                    console.log("Friend Friendship already exists");
                                } else {
                                    //create a friendship object and set to approved
                                    var friendship = Friendship.create({
                                        frienderUserId: frienderId,
                                        friendUserId: friendId,
                                        approved: true
                                    });
                                    friendship.save(function (saveErr, friendshipObj) {
                                        if(saveErr){
                                            console.log("error saving friendship");
                                        }else{
                                            if(__.isObject(friendshipObj))
                                                console.log("success saving friendship");
                                        }
                                    });
//                                    var loggedInUser = geddy.model.User;
//                                    loggedInUser.first({
//                                        id:frienderId
//                                    },function(frienderUserErr, frienderUser){
//                                       if(!frienderUserErr && __.isObject(frienderUser)) {
//                                           //add new Friend association for the user
//                                           frienderUser.addFriend(friendship);
//                                           frienderUser.save(function(saveErr, savedFriendObject){
//                                               if(saveErr){
//                                                   console.log("error saving friendship");
//                                               }else{
//                                                   if(__.isObject(savedFriendObject))
//                                                    console.log("success saving friendship");
//                                               }
//                                           });
//                                       }
//                                    });
                                }
                            });
                        }
                    });
                }
            });
        }); 
        // End loop through all emails
        
        //Return Authenticted user back to client
        var returnAuthenticatedUser = geddy.model.User;
        returnAuthenticatedUser.first({
            id:frienderId
        },function(userDataErr,userData){
            if(userDataErr){
                self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('userNotRetrievedAfterAddingFriends')));
            }else{
                
                userData.includeFriends({
                    fn: function(){
                        me.authenticatedUser = userData;
                        //console.log(me.authenticatedUser);
                        self.respond(AH.getSuccessResponseObject(params, me.authenticatedUser));
                    }
                });
            }            
        });
        
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

