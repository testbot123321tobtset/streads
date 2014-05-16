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
            console.log("Debug: X.controller.WebSocket.init()");
        }
    },
    launch: function() {
        var me = this;
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.WebSocket.launch()");
        }
//        Connect Websockets
//        For more information about implementing rooms: https://github.com/LearnBoost/socket.io/wiki/Rooms
        X.Socket = io.connect(X.XConfig.getAPI_ENDPOINT());
        X.Socket.on('connect', function(data) {
            Ext.Viewport.fireEvent('xsocketconnection');
        });
    },
    onXSocketConnection: function() {
        return this;
    }
});
