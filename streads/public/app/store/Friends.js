Ext.define('X.store.Friends', {
    extend: 'X.store.Application',
    config: {
        model: 'X.model.Friend',
        storeId: 'FriendsStore',
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: false
    }
});
