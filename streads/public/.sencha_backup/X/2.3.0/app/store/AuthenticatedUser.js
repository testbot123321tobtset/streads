Ext.define('X.store.AuthenticatedUser', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.AuthenticatedUser',
        storeId: 'AuthenticatedUserStore',
        autoLoad: false,
        autoSync: false,
        mustBeEmptiedOnApplicationShutDown: false
    }
});
