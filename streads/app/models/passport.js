var Passport = function() {
    var me = this;
    
    me.defineProperties({
        authType: {
            type: 'string'
        },
        key: {
            type: 'string'
        }
    });
    
    me.belongsTo('User');
};

Passport = geddy.model.register('Passport', Passport);