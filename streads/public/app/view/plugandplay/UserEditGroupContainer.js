// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.UserEditGroupContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'X.view.plugandplay.UserGroupEditFormPanel',
        'X.view.plugandplay.UserGroupsList'
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
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        cls: 'user-edit-group-container',
        floating: true,
        centered: true,
        fullscreen: true,
        layer: 2,
        layerUnderneathItemId: 'userGroupContainer',
        depthBasedOnOffset: true,
        modal: true,
        querySelectorsForComponentsToBeHiddenToOptimizeLayer: [
            '#pageUserRoot'
        ],
        querySelectorsForComponentsToBeBlurredToOptimizeLayer: [
            '#userGroupContainer'
        ],
        items: [
            {
                xtype: 'titlebar',
                itemId: 'userEditGroupContainerToolbar',
                docked: 'top',
                top: 0,
                cls: 'x-stretched x-docked-top x-full-width user-edit-group-container-toolbar',
                title: 'Edit',
                items: [
                    {
                        xtype: 'button',
                        itemId: 'backButton',
                        cls: 'button-stacked back-button',
                        iconCls: 'arrowdown',
                        text: 'Close',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userEditGroupContainer').onBackButtonTap(button, e, eOpts);
                            }
                        }
                    },
                    {
                        xtype: 'button',
                        itemId: 'deleteButton',
                        cls: 'button-stacked delete-button',
                        align: 'right',
                        iconCls: 'minus',
                        text: 'Delete',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#userEditGroupContainer').onDeleteButtonTap(button, e, eOpts);
                            }
                        }
                    }
                ]
            },
            {
                xtype: 'usergroupeditformpanel',
                flex: 1,
                scrollable: true
            }
        ]
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.callParent(arguments);
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
        return me.down('#userEditGroupContainerToolbar #backButton');
    },
    setTitleToGroupTitle: function() {
        var me = this;
        me.down('#userEditGroupContainerToolbar').setTitle(me.getRecord().get('title'));
    }
});