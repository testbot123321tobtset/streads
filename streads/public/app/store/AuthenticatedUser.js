Ext.define('X.store.AuthenticatedUser', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.AuthenticatedUser',
        storeId: 'AuthenticatedUserStore',
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: false
    }
});
