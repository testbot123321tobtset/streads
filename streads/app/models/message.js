var Message =  function () {
   var me = this; 
   me.defineProperties ({
        messageType: { //text or image
            type: 'string',
            required: true
        },
        createDate: {
            type: 'string'
        },
        createdBy: {
            type: 'string'
        },
        fileSize: {
            type: 'integer'
        },
        locationURL: {
            type: 'string'
        },
        messageText: {
            type: 'string'
        }
    });
    
    me.belongsTo('Group');
};

exports.Message = Message;