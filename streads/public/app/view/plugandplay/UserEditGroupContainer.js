Ext.define('X.view.plugandplay.UserEditGroupContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'X.view.plugandplay.UserGroupEditFormPanel'
    ],
    xtype: 'usereditgroupcontainer',
    id: 'userEditGroupContainer',
    config: {
        layout: {
            type: 'fit'
        },
        cls: 'user-edit-group-container',
        centered: true,
        fullscreen: true,
        items: [
            {
                xtype: 'toolbar',
                itemId: 'userEditGroupContainerToolbar',
                cls: 'user-edit-group-container-toolbar',
                docked: 'top',
                height: X.config.Config.getDefaultToolbarHeight(),
                defaults: {
                    height: X.config.Config.getDefaultToolbarHeight()
                },
                title: 'Edit',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        cls: 'back-button',
                        ui: 'back',
                        text: 'Back',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userEditGroupContainer').onBackButtonTap();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'usergroupeditformpanel'
            }
        ]
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.hide(X.config.Config.getHideAnimationConfig());
        return me;
    },
    getBackButton: function() {
        var me = this;
        return me.down('#userEditGroupContainerToolbar #backButton');
    }
});