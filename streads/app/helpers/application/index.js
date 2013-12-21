var __ = require('underscore');

exports.getResponseMessage = function(responseMessageType) {
    var responseMessage = '';
    switch (responseMessageType) {
        case 'usernameEmailIsAlreadyTaken':
            responseMessage = 'We know this email! Maybe you want to log right in?';
            break;
        case 'userAuthenticationFailed':
            responseMessage = 'Hmm, we couldn\'t log you in. Let us know, and we\'ll take care of it.';
            break;
        case 'noAuthenticatedUserFound':
            responseMessage = 'Hmm, we couldn\'t find you in our system. Maybe you\'d want to sign up first?';
            break;
        case 'authenticatedUserSuccessfullyLoggedOut':
            responseMessage = 'We hate to see you go! Please come back!';
            break;
        case 'noLoggedInUserFound':
            responseMessage = 'No logged in user found.';
            break;
        case 'authenticatedUserCouldNotBeCreated':
            responseMessage = 'Hmm, we couldn\'t create that account. Let us know, and we\'ll take care of it.';
            break;
        case 'authenticatedUserCouldNotBeUpdated':
            responseMessage = 'Hmm, we couldn\'t update your account. Let us know, and we\'ll take care of it.';
            break;
        case 'authenticatedUserCouldNotBeDeleted':
            responseMessage = 'Hmm, we couldn\'t delete your account. Let us know, and we\'ll take care of it.';
            break;
        case 'postCreateDeniedDueToNonOwner':
            responseMessage = 'You cannot create a post that does not belong to you.';
            break;
        case 'postUpdateDeniedDueToNonOwner':
            responseMessage = 'You cannot update a post that does not belong to you.';
            break;
        case 'postDestroyDeniedDueToNonOwner':
            responseMessage = 'You cannot delete a post that does not belong to you.';
            break;
        default:
            break;
    }
    return responseMessage;
};

exports.getFailureResponseObject = function(params, error, message) {
    var responseObject = {
        params: __.isObject(params) ? params : {},
        success: false
    };
    if (__.isObject(error)) {
        responseObject.params.error = error;
    }
    if (__.isString(message)) {
        responseObject.message = message;
    }

    return responseObject;
};
exports.getSuccessResponseObject = function(params, result, message) {
    var responseObject = {
        success: true
    };
    if (__.isObject(params)) {
        responseObject.params = params;
    }
    if (__.isObject(result)) {
        responseObject.result = result;
    }
    if (__.isString(message)) {
        responseObject.message = message;
    }

    return responseObject;
};