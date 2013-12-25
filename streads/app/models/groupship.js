var Groupship = function() {
    var me = this;
    
    me.belongsTo('User');
    me.belongsTo('Group');
};

exports.Groupship = Groupship;