var Friendship = function() {
    var me = this;

    me.belongsTo('Friender', {
        model: 'User'
    });
    me.belongsTo('Friend', {
        model: 'User'
    });

};

exports.Friendship = Friendship;