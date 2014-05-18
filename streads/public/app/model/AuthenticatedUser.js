Ext.define('X.model.AuthenticatedUser', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'id'
            },
            {
                name: 'createdAt',
                type: 'date',
                dateFormat: 'c',
                persist: false
            },
            {
                name: 'updatedAt',
                type: 'date',
                dateFormat: 'c',
                persist: false
            },
            {
                name: 'usernameEmail',
                type: 'string'
            },
            {
                name: 'firstName',
                type: 'string'
            },
            {
                name: 'lastName',
                type: 'string'
            },
            {
                name: 'fullName',
                type: 'string',
                convert: function(value, record) {
                    return (Ext.isString(record.get('firstName')) && Ext.isString(record.get('lastName'))) ? record.get('firstName') + ' ' + record.get('lastName') : null;
                },
                persist: false
            }
        ],
        hasMany: [
            {
//                This is a list of groups that the authenticated user has created
//                There can also be groups that the authenticated user had not created but is a part of
                model: 'X.model.Group'
            },
            {
                model: 'X.model.Friend'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'id'
            },
            {
                type: 'email',
                field: 'usernameEmail'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: false,
            url: X.config.Config.getAPI_ENDPOINT() + 'user',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
            },
            exception: function(proxy, response, operation, eOpts) {
                Ext.Viewport.fireEvent('authenticateduserproxyexception', {
                    proxy: proxy,
                    response: response,
                    operation: operation
                });
            }
        }
    },
//    Websocket
    joinRoom: function(xSocket) {
        var me = this;
        if(X.config.Config.getDEBUG()) {
            console.log('Debug: X.model.AuthenticatedUser.joinRoom(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        xSocket = Ext.isObject(xSocket) ? xSocket : X.Socket;
        if(Ext.isObject(xSocket)) {
            xSocket.emit('enterRoom', {
                roomName: me.get('id')
            });
            return me;
        }
        
        return false;
    }
});
