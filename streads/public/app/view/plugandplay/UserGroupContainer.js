Ext.define('X.view.plugandplay.UserGroupContainer', {
    extend: 'X.view.core.Container',
    requires: [
    ],
    xtype: 'usergroupcontainer',
    id: 'userGroupContainer',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'user-group-container',
        centered: true,
        fullscreen: true,
        hidden: true,
        items: [
            {
                xtype: 'toolbar',
                itemId: 'userGroupContainerToolbar',
                cls: 'user-group-container-toolbar',
                docked: 'top',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        ui: 'back',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userGroupContainer').onBackButtonTap();
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: '#forwardButton',
                        ui: 'forward'
                    }
                ]

            },
            {
                xtype: 'corecontainer',
                itemId: 'feedContainer',
                cls: 'user-group-container-feed-container',
                html: 'This container will have this group\'s feed',
                flex: 1
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
        return me.down('#userGroupContainerToolbar #backButton');
    }
});