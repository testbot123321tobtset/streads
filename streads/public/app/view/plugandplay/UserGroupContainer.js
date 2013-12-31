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
        floating: true,
        centered: true,
        fullscreen: true,
        items: [
            {
                xtype: 'toolbar',
                itemId: 'userGroupContainerToolbar',
                cls: 'user-group-container-toolbar',
                docked: 'top',
                height: X.config.Config.getDefaultToolbarHeight(),
                defaults: {
                    height: X.config.Config.getDefaultToolbarHeight()
                },
                title: 'Feed',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        cls: 'back-button',
                        ui: 'back',
                        text: 'Back',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userGroupContainer').onBackButtonTap();
                            }
                        }
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        itemId: 'storiesButton',
                        cls: 'stories-button',
                        ui: 'action',
                        text: 'Stories'
                    },
                    {
                        xtype: 'button',
                        itemId: 'moreButton',
                        cls: 'x-button-boring more-button',
                        ui: 'normal',
                        text: 'Edit'
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