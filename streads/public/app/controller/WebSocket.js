Ext.define('X.controller.WebSocket', {
    extend: 'X.controller.Main',
    requires: [
    ],
    config: {
        before: {
        },
        routes: {
        },
        control: {
            viewport: {
                xsocketconnection: 'onXSocketConnection',
//                Store events
                authenticateduserstoreload: 'onAuthenticatedUserStoreLoad'
            }
        },
        refs: {
        }
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log('Debug: X.controller.WebSocket.init()');
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log('Debug: X.controller.WebSocket.launch()');
        }
    },
    onXSocketConnection: function() {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.WebSocket.onXSocketConnection(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
//        Set this extra param on Groups store proxy, so when the server emits pushes to all sockets in a group\'s room, 
//        we are able to avoid pushing to the socket that made the update to the particular group. This is important,
//        because when a push happens, we simply ask the groups store to reload, and if the socket that initiated the
//        update gets the push, then it\'ll just reload again, which is a waste of everything
//        Ext.getStore('GroupsStore').getProxy().setExtraParam('websocketId', X.Socket.socket.sessionid);
        Ext.Ajax.setExtraParams({
            websocketId: X.Socket.socket.sessionid
        });
        
        return me;
    },
    onAuthenticatedUserStoreLoad: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.WebSocket.onAuthenticatedUserStoreLoad(): Options passed as argument: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        
        options = Ext.isObject(options) ? options : false;
        if(Ext.isObject(options)) {
            var authenticatedUserStore = Ext.isObject(options.authenticatedUserStore) ? options.authenticatedUserStore : Ext.getStore('AuthenticatedUserStore').getAt(0);
            var authenticatedUser = Ext.isObject(options.authenticatedUser) ? options.authenticatedUser : authenticatedUserStore.getAt(0);
            
//            If the authenticated user has not connected its websocket to the server yet
            if (Ext.isObject(authenticatedUser) && ((!('websocketConnected' in authenticatedUser)) || ('websocketConnected' in authenticatedUser && !Ext.isBoolean(authenticatedUser.websocketConnected)))) {
                if (me.getDebug()) {
                    console.log('Debug: X.controller.WebSocket.onAuthenticatedUserStoreLoad(): Will connect to websocket: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                
//                Connect socket
//                For more information about implementing rooms: https://github.com/LearnBoost/socket.io/wiki/Rooms
                X.Socket = io.connect(X.XConfig.getAPI_ENDPOINT());
                var xSocket = X.Socket;

//                Exposed events: https://github.com/LearnBoost/socket.io/wiki/Exposed-events
                xSocket.on('connect', function() {
                    authenticatedUser.websocketConnected = true;
                    Ext.Viewport.fireEvent('xsocketconnection');
                });
                xSocket.on('disconnect', function() {
                    authenticatedUser.websocketConnected = false;
                });
                xSocket.on('error', function() {
                    authenticatedUser.websocketConnected = false;
                });
//                'message' event is just a debug event that you could use to send messages from server
//                Don't use 'message' event for any other events
                xSocket.on('message', function(message) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.WebSocket.onAuthenticatedUserStoreLoad(): Socket received event: message: This should really be a debug message!: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        console.log(message);
                    }
                });
                
//                Custom events
                xSocket.on('updategroup', function(data) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.WebSocket.launch(): X.Socket received an event \'updategroup\': Will fire event \'xsocketupdategroup\' on Ext.Viewport: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    Ext.Viewport.fireEvent('xsocketupdategroup', data);
                });
                xSocket.on('deletegroup', function(data) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.WebSocket.launch(): X.Socket received an event \'deletegroup\': Will fire event \'xsocketdeletegroup\' on Ext.Viewport: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    console.log('(((((((((((((((((((((((((');
                    Ext.Viewport.fireEvent('xsocketdeletegroup', data);
                });
                xSocket.on('creategroup', function(data) {
                    if (me.getDebug()) {
                        console.log('Debug: X.controller.WebSocket.launch(): X.Socket received an event \'creategroup\': Will fire event \'xsocketcreategroup\' on Ext.Viewport: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    console.log('*********************');
                    Ext.Viewport.fireEvent('xsocketdeletegroup', data);
                });
            }
        }
        
        return me;
    }
});
