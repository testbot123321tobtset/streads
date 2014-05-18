var __ = require('underscore');
var AH = require('../application');

exports.checkIfAuthenticatedUserExists = function(myScope, controller, next) {
    var me = this;
    var self = myScope;
    controller.error = false;
    controller.message = false;
    controller.authenticatedUser = false;
    var User = geddy.model.User;
    var mySession = self.session,
            mySessionId = mySession.id,
            userIdFromSession = mySession.get('userId');
    User.first({
        id: userIdFromSession
    }, function(err, user) {
        if (err) {
            controller.error = err;
        }
        else {
            if (__.isObject(user)) {

                var userFromSession = user;

                __.each(User.fieldShowExclusionArray, function(field) {
                    if (__.has(userFromSession, field)) {
                        delete userFromSession[field];
                    }
                });
                User.includeFriends(userFromSession);
//                console.log(user);
                //include friendsList for the authenticated user only
//                user.put(user.includeFriends());

                controller.authenticatedUser = userFromSession;
                controller.message = false;

//              Websocket
//              See if the authenticated user in session had its socket initiated – initiate only if it hasn't been done before
//              Do not do socket.on('disconnect', function() {}); and socket.on('enterRoom', function(data) {}); multiple times
//              on the same socket
                var environment = geddy.config.environment;
                geddy.io.set('authorization', function(handshakeData, callback) {
                    var cookieString = handshakeData.headers.cookie;
                    if (__.isString(cookieString) && cookieString.length > 0) {
                        var cookieObject = geddy.uri.objectify(cookieString);
                        var passportSessionIdKey = geddy.config.sessions.key;
                        var sessionIdFromWebsocket = cookieObject[passportSessionIdKey];
                        var sessionIdFromServer = mySessionId;
                        if (sessionIdFromWebsocket === sessionIdFromServer) {
                            if (environment === 'development') {
                                geddy.log.info('/controllers/users.showMe(): Websocket is authenticated with session id: ' + sessionIdFromWebsocket);
                            }
                            callback(null, true);
                        }
                        else {
                            if (environment === 'development') {
                                geddy.log.warning('/controllers/users.showMe(): Websocket is unauthenticated with session id: ' + sessionIdFromWebsocket + ', and found session id found in server: ' + sessionIdFromServer);
                            }
                            callback(null, false);
                        }
                    }
                });
            }
            else {
                controller.authenticatedUser = false;
                controller.message = AH.getResponseMessage('noAuthenticatedUserFound');
            }
        }
        next();
    });
};