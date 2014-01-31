var Friendship = function() {
    var me = this;
    
    // https://github.com/mde/model/blob/master/test/fixtures/friendship.js
    // https://github.com/mde/model/blob/master/test/integration/adapters/sql/eager_assn.js#L149
    me.property('approved', 'boolean');

    me.belongsTo('Friender', {
        model: 'User'
    });
    me.belongsTo('Friend', {
        model: 'User'
    });

};

exports.Friendship = Friendship;