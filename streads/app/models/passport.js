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

exports.Passport = Passport;