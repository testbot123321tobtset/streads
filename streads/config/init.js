var init = function(cb) {
    var me = this;
    
    var environment = geddy.config.environment;
    
    // Add uncaught-exception handler in prod-like environments
    if (environment !== 'development') {
        process.addListener('uncaughtException', function(err) {
            var msg = err.message;
            if (err.stack) {
                msg += '\n' + err.stack;
            }
            if (!msg) {
                msg = JSON.stringify(err);
            }
            geddy.log.error(msg);
        });
    }
    
//    Websockets
    geddy.on('started', function() {
        geddy.io.sockets.on('connection', function(socket) {
            if (environment === 'development') {
                geddy.log.info('config.init: Websocket connected with id: ' + socket.id + ': The socket itself is as follows:');
                console.log(socket);
                geddy.log.info('config.init: All sockets are as follows:');
                console.log(geddy.io.sockets);
            }
            socket.on('disconnect', function() {
                if (environment === 'development') {
                    geddy.log.notice('config.init: Websocket disconnected');
                }
            });
            socket.on('enterRoom', function(data) {
                if (environment === 'development') {
                    geddy.log.notice('config.init: Someone joined the room: ' + data.roomName);
                    geddy.log.info('config.init: All rooms are as follows:');
                    console.log(geddy.io.sockets.manager.rooms);
                }
                socket.join(data.roomName);
            });
        });
    });
    cb();
};

exports.init = init;