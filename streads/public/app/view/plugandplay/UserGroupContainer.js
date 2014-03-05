// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.UserGroupContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'Ext.TitleBar'
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
        layer: 1,
        depthBasedOnOffset: true,
        modal: true,
        items: [
            {
                xtype: 'titlebar',
                itemId: 'userGroupContainerToolbar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-top x-full-width user-group-container-toolbar',
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                title: 'Feed',
                items: [
                    {
                        itemId: 'backButton',
                        cls: 'back-button',
                        iconCls: 'close',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userGroupContainer').onBackButtonTap();
                            }
                        },
                        align: 'left'
                    },
                    {
                        itemId: 'storiesButton',
                        cls: 'stories-button',
                        iconCls: 'albumsfilled',
                        align: 'right'
                    },
                    {
                        itemId: 'moreButton',
                        cls: 'more-button',
                        iconCls: 'morefilled',
                        align: 'right'
                    }
                ]
            },
            {
                xtype: 'corecontainer',
                itemId: 'feedContainer',
                cls: 'user-group-container-feed-container',
                flex: 1,
                tpl: new Ext.XTemplate('{title}'),
                scrollable: true
            }
        ]
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        return me;
    },
    onShow: function() {
        var me = this;
        me.setTitleToGroupTitle();
        me.callParent(arguments);
    },
    onUpdateData: function() {
        var me = this;
        me.setTitleToGroupTitle();
        me.callParent(arguments);
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