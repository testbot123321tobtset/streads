var geddy = require('geddy'),
        env = process.env.NODE_ENV || 'development',
        port = process.env.PORT || 4000;

geddy.start({
    environment: env
});