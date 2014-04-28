var __ = require('underscore');
var AH = require('../application');

exports.checkIfAuthenticatedUserExists = function(myScope, controller, next) {
    console.log("In UH:checkIfAuthenticatedUserExists ");
    var me = this;
    var self = myScope;
    controller.error = false;
    controller.message = false;
    controller.authenticatedUser = false;
    var User = geddy.model.User;
    User.first({
        id: self.session.get('userId')
    }, function(err, user) {
        if (err) {
            controller.error = err;
        }
        else {
            if (__.isObject(user)) {
                console.log("found user");
                __.each(User.fieldShowExclusionArray, function(field) {
                    if (__.has(user, field)) {
                        delete user[field];
                    }
                });
                User.includeFriends(user);
//                console.log(user);
                //include friendsList for the authenticated user only
//                user.put(user.includeFriends());
                controller.authenticatedUser = user;
                console.log("controller.authenticatedUser: "+controller.authenticatedUser);
                controller.message = false;
            }
            else {
                controller.authenticatedUser = false;
                controller.message = AH.getResponseMessage('noAuthenticatedUserFound');
            }
        }
        next();
    });
};