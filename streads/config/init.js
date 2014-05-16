var init = function(cb) {
    // Add uncaught-exception handler in prod-like environments
    if (geddy.config.environment !== 'development') {
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
    
//    Websocket
//    Geddy's lifecycle events: http://geddyjs.org/reference#global
    geddy.on('started', function() {
        geddy.io.sockets.on('connection', function(socket) {
            geddy.log.info('Websocket connected with id: ' + socket.id);
            socket.on('disconnect', function() {
                geddy.log.notice('Websocket disconnected');
            });
            socket.on('enterRoom', function(data) {
                socket.join(data.roomName);
//                geddy.log.notice("Someone joined the room: " + data.roomName);
            });
        });
    });
    cb();
};

exports.init = init;