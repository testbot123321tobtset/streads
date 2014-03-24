Ext.define('X.store.DeviceContacts', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.DeviceContact',
        storeId: 'DeviceContactStore',
        autoLoad: false,
        autoSync: false,
        mustBeEmptiedOnApplicationShutDown: false,
        sorters: 'familyName',
        groupField: 'familyName'
    },
    getEmails: function() {
        var me = this;
        var emails = [];
        me.each(function(thisContact) {
            var thisContactEmails = thisContact.getAllEmails();
            if(Ext.isArray(thisContactEmails)) {
                emails = Ext.Array.merge(emails, thisContactEmails);
            }
        });
        return emails;
    }
});