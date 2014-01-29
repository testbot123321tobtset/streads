Ext.define('X.store.Groups', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Group',
        storeId: 'GroupsStore',
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: false
    }
});
