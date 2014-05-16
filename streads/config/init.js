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
//    Geddy's lifecycle events: http://geddyjs.org/reference#global
    geddy.on('started', function() {
        geddy.io.sockets.on('connection', function(socket) {
            geddy.log.info('Websocket connected');
            socket.on('disconnect', function(socket) {
                geddy.log.notice('Websocket disconnected');
            });
        });
    });
    cb();
};

exports.init = init;