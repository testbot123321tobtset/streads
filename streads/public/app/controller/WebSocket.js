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
                xsocketconnection: 'onXSocketConnection'
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
//        Connect Websockets
//        For more information about implementing rooms: https://github.com/LearnBoost/socket.io/wiki/Rooms
        X.Socket = io.connect(X.XConfig.getAPI_ENDPOINT());
        
//        List all event handlers on the socket here
        X.Socket.on('connect', function() {
            X.Socket.id = X.Socket.socket.sessionid;
            if (me.getDebug()) {
                console.log('Debug: X.controller.WebSocket.launch(): X.Socket connected with id aka sessionid: ' + X.Socket.id + ': Will fire event \'xsocketconnection\' on Ext.Viewport: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            Ext.Viewport.fireEvent('xsocketconnection');
        });
        X.Socket.on('updategroup', function(data) {
            if (me.getDebug()) {
                console.log('Debug: X.controller.WebSocket.launch(): X.Socket received an event \'updategroup\': Will fire event \'xsocketupdategroup\' on Ext.Viewport: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            Ext.Viewport.fireEvent('xsocketupdategroup', data);
        });
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
        Ext.getStore('GroupsStore').getProxy().setExtraParam('websocketId', X.Socket.socket.sessionid);
        
        return me;
    }
});
