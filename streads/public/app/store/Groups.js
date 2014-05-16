Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: false
    },
//    Event handlers
    onLoad: function() {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Groups: onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
//        The socket only joins all its groups/rooms once when the store loads the first time. This assumes that
//        all joining and leaving rooms from this point forward are synchronized based on subsequent events on the
//        socket: fos instance, when a room is deleted, all sockets attached to the room are automatically detached from
//        the room on the server side
//        This one time synchronization (when the store loads first also signalling the first time the application boots) 
//        is only to get things started
        if (!Ext.isBoolean(me.getIsFirstLoad())) {
            me.runTask({
                fn: function() {
                    if (X.config.Config.getDEBUG()) {
                        console.log('Debug: X.store.Groups: onLoad(): Will now join rooms by calling joinRooms(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }

                    me.joinRooms();
                },
                condition: function() {
                    return ('Socket' in X && Ext.isObject(X.Socket));
                },
                delay: 1000,
                runLimit: 5,
                scope: me
            });
        }
        
        me.callParent(arguments);
    },
//    Helper methods
//    Websocket
    joinRooms: function(xSocket) {
        var me = this;
        console.log('Debug: X.store.Groups.joinRooms(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        
        xSocket = Ext.isObject(xSocket) ? xSocket : X.Socket;
        if(Ext.isObject(xSocket)) {
            if (me.getAllCount() > 0) {
                var groupIdsBeforeLoad = me.getIdsOfRecordsBeforeLoad();
                if (Ext.isArray(groupIdsBeforeLoad) && groupIdsBeforeLoad.length > 0) {
                    me.each(function(thisGroup) {
                        var thisGroupId = thisGroup.get('id');
                        if(Ext.Array.indexOf(groupIdsBeforeLoad, thisGroupId) !== -1) {
                            thisGroup.joinRoom(xSocket);
                        }
                    });
                }
                else {
                    me.each(function(thisGroup) {
                        thisGroup.joinRoom(xSocket);
                    });
                }
            }
            return me;
        }
        
        return false;
    }
});
