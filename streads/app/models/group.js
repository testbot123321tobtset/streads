var Group = function() {
    var me = this;
    
    me.defineProperties({
        title: {
            type: 'string',
            required: true
        },
        description: {
            type: 'text'
        }
    });
    
//    me.hasMany('Groupships');
    me.hasMany('Users', {
        through: 'Groupships'
    });
};

exports.Group = Group;