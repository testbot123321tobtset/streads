// NOT USED RIGHT NOW!
Ext.define('X.store.UserAccountInfoNestedList', {
    extend: 'Ext.data.TreeStore',
    config: {
        model: 'X.model.UserAccountInfoNestedListItem',
        storeId: 'UserAccountInfoNestedListStore',
        defaultRootProperty: 'items',
        root: {
            items: [
                {
                    text: 'Credit Cards',
                    leaf: true
                }
            ]
        }
    }
});