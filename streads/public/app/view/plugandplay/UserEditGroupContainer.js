// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.UserEditGroupContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'X.view.plugandplay.UserGroupEditFormPanel'
    ],
    xtype: 'usereditgroupcontainer',
    id: 'userEditGroupContainer',
    config: {
        // isWindow config just means what is explained in the beginning
        // This is an easy way to query for any and all windows and do
        // further processing with them. Usually this is used to hide all
        // of such windows
        isWindow: true,
        layout: {
            type: 'fit'
        },
        cls: 'user-edit-group-container',
        centered: true,
        fullscreen: true,
        items: [
            {
                xtype: 'titlebar',
                itemId: 'userEditGroupContainerToolbar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-bottom x-docked-bottom-that-is-top x-full-width user-edit-group-container-toolbar',
                height: X.config.Config.getDefaultToolbarHeight(),
                defaults: {
                    height: X.config.Config.getDefaultToolbarHeight()
                },
                layout: {
                    type: 'hbox',
                    align: 'center',
                    pack: 'center'
                },
                title: 'Edit',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        cls: 'back-button',
                        iconCls: 'close',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userEditGroupContainer').onBackButtonTap();
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'usergroupeditformpanel',
                scrollable: true
            }
        ],
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            },
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
//    onInitialize: function() {
//        var me = this;
//        var element = me.element;
//        element.on('swipe', function(event, node, options, eOpts) {
//            me.fireEvent('elementswipe', event, node, options, eOpts);
//        });
//    },
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
        return me.down('#userEditGroupContainerToolbar #backButton');
    },
    setTitleToGroupTitle: function() {
        var me = this;
        me.down('#userEditGroupContainerToolbar').setTitle(me.getRecord().get('title'));
    }
});