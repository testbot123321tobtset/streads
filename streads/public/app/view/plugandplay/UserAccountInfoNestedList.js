// NOT USED RIGHT NOW!
Ext.define('X.view.plugandplay.UserAccountInfoNestedList', {
    extend: 'Ext.NestedList',
    xtype: 'useraccountinfonestedlist',
    requires: [
    ],
    id: 'userAccountInfoNestedList',
    config: {
        cls: 'user-account-info-nestedlist',
        store: 'UserAccountInfoNestedListStore',
        scrollable: true,
        displayField: 'text',
        fullscreen: true,
        zIndex: 2
    }
});