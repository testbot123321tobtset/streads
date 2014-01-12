// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.UserGroupContainer', {
    extend: 'X.view.core.Container',
    requires: [
    ],
    xtype: 'usergroupcontainer',
    id: 'userGroupContainer',
    config: {
        // isWindow config just means what is explained in the beginning
        // This is an easy way to query for any and all windows and do
        // further processing with them. Usually this is used to hide all
        // of such windows
        isWindow: true,
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
                flex: 1,
                tpl: new Ext.XTemplate('{title}')
            }
        ],
        listeners: [
            {
                fn: 'onShow',
                event: 'show'
            },
            {
                fn: 'onUpdateData',
                event: 'updatedata'
            }
        ]
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.hide(X.config.Config.getHideAnimationConfig());
        return me;
    },
    onShow: function() {
        var me = this;
        me.setTitleToGroupTitle();
    },
    onUpdateData: function() {
        var me = this;
        me.setTitleToGroupTitle();
    },
    getBackButton: function() {
        var me = this;
        return me.down('#userGroupContainerToolbar #backButton');
    },
    setTitleToGroupTitle: function() {
        var me = this;
        me.down('#userGroupContainerToolbar').setTitle(Ext.String.ellipsis(me.getRecord().get('title'), 10));
    }
});