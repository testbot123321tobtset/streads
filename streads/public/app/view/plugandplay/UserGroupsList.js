Ext.define('X.view.plugandplay.UserGroupsList', {
    extend: 'Ext.dataview.List',
    requires: [
        'X.view.core.Panel'
    ],
    xtype: 'usergroupslist',
    config: {
        itemId: 'userGroupsList',
        cls: 'user-groups-list',
        itemTpl: '{title}',
        deselectOnContainerClick: true,
        onItemDisclosure: true
    }
});
