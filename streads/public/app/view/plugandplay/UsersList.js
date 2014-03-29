Ext.define('X.view.plugandplay.UsersList', {
    extend: 'Ext.dataview.List',
    xtype: 'userslist',
    config: {
        itemId: 'usersList',
        cls: 'users-list',
        itemTpl: '{formattedName}',
        deselectOnContainerClick: true,
        onItemDisclosure: true,
        infinite: true,
        grouped: true,
        mode: 'MULTI'
    }
});
