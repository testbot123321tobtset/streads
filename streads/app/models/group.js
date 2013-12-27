var Group = function() {
    var me = this;
    
    me.defineProperties({
        title: {
            type: 'string',
            required: true
        },
        createdById: {
            type: 'string',
            required: true
        },
        description: {
            type: 'text'
        }
    });
    
    me.hasMany('Users', {
        through: 'Groupships'
    });
};

exports.Group = Group;