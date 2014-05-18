var __ = require('underscore');
var AH = require('../helpers/application');

var Group = function() {
    var me = this;
    
    me.defineProperties({
        title: {
            type: 'string',
            required: true
        },
        createdById: {
            type: 'string',
            required: true
        },
        description: {
            type: 'text'
        }
    });
    
    me.hasMany('Users', {
        through: 'Groupships'
    });
    
//    Silent here means that use this function only if you are not banking on it to send your client any response
//    Also, if it fails, nothing is reported back to the caller
    me.silentlyDestroy = function() {
        var Group = geddy.model.Group;
        Group.remove(me.id, function(meAfterRemoveErr) {
            if (!__.isObject(meAfterRemoveErr)) {
                var Groupship = geddy.model.Groupship;
                Groupship.all({
                    groupId: me.id
                }, function(groupshipsToBeDeletedErr, groupshipsToBeDeleted) {
                    if (!__.isObject(groupshipsToBeDeletedErr) && __.isObject(groupshipsToBeDeleted)) {
                        groupshipsToBeDeleted.forEach(function(thisGroupshipToBeDeleted) {
                            Groupship.remove(thisGroupshipToBeDeleted.id);
                        });
                    }
                });
            }
        });
    };
};

exports.Group = Group;