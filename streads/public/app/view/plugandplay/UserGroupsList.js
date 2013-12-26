Ext.define('X.view.plugandplay.UserGroupsList', {
    extend: 'Ext.dataview.List',
    requires: [
    ],
    xtype: 'usergroupslist',
    config: {
        itemId: 'userGroupsList',
        itemTpl: '{title}',
        onItemDisclosure: function() {
            console.log('haha');
        }
    }
});
