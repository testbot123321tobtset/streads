var Image =  function () {
   var me = this; 
   me.defineProperties ({
        fileType: {
            type: 'string'
        },
        createDate: {
            type: 'string'
        },
        locationURL: {
            type: 'string'
        },
        createdBy: {
            type: 'string'
        },
        fileSize: {
            type: 'integer'
        }
    });
    
    //Add in to set relationsip to a message
     //me.belongsTo('Message');
};

exports.Image = Image;