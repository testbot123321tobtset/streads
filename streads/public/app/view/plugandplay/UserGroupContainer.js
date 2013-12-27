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
        ],
        // Easing types: 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out' (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Anim-cfg-easing)
        showAnimationConfig: {
            type: 'slideIn',
            direction: 'left',
            easing: 'ease-in'
        },
        hideAnimationConfig: {
            type: 'slideOut',
            direction: 'right',
            easing: 'ease-out'
        }
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.hide(me.getHideAnimationConfig());
        return me;
    },
    getBackButton: function() {
        var me = this;
        return me.down('#userGroupContainerToolbar #backButton');
    }
});