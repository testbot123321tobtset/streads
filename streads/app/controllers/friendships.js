var __ = require('underscore');
var AH = require('../helpers/application');
var UH = require('../helpers/user');

var Friendships = function() {
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
                    // check 1 whether friendship already exists
                    //check if logged in user is a friender
                    Friendship.first({
                        frienderUserId: frienderId,
                        friendUserId: friendId
                    }, function(frienderAssociationErr, frienderAssociation) {
                        if (!frienderAssociationErr && __.isObject(frienderAssociation)) {
                            console.log("Friender Friendship already exists");
                        } else { 
                            // check 2 whether friendship already exists
                            //check if logged in user is a friend
                            Friendship.first({
                                frienderUserId: friendId,
                                friendUserId: frienderId
                            }, function(friendAssociationErr, friendAssociation) {
                                if (!friendAssociationErr && __.isObject(friendAssociation)) {
                                    console.log("Friend Friendship already exists");
                                } else {
                                    //if no associations found
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
        me.checkIfAuthenticatedUserExists( function(err, userObj){
        if (__.isObject(me.authenticatedUser)) {
            console.log("returning athenticated user");
            console.log("dumping user: "+me.authenticatedUser);
            self.respond(AH.getSuccessResponseObject(params, me.authenticatedUser));
        }
        else {
            self.respond(AH.getFailureResponseObject(params, err, AH.getResponseMessage('couldnt return user object with friendslist')));
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

