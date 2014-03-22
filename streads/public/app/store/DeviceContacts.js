Ext.define('X.store.DeviceContacts', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.DeviceContact',
        storeId: 'DeviceContactStore',
        autoLoad: false,
        autoSync: false,
        mustBeEmptiedOnApplicationShutDown: false,
        sorters: 'formattedName',
        groupField: 'formattedName'
    }
});