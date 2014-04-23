// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.PhotoMessageInputContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'Ext.Img'
    ],
    xtype: 'photomessageinputcontainer',
    id: 'photoMessageInputContainer',
    config: {
        // isWindow config just means what is explained in the beginning
        // This is an easy way to query for any and all windows and do
        // further processing with them. Usually this is used to hide all
        // of such windows
        isWindow: true,
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'photo-message-input-container',
        floating: true,
        centered: true,
        fullscreen: true,
        layer: 1,
        depthBasedOnOffset: true,
        modal: true,
        hidden: true,
        querySelectorsForComponentsToBeHiddenToOptimizeLayer: [
        ],
        querySelectorsForComponentsToBeBlurredToOptimizeLayer: [
            '#pageUserRoot',
            '#userGroupContainer',
            '#userEditGroupContainer'
        ],
        items: [
            {
                xtype: 'image',
                itemId: 'photoToBePosted',
                cls: 'photo-to-be-posted',
//                This should really have a set width and height
                width: '100%',
                flex: 2,
                src: ''
            },
            {
                xtype: 'coreformpanel',
                itemId: 'messageFormPanel',
                cls: 'message-form-panel',
                flex: 1,
                layout: {
                    type: 'vbox',
                    pack: 'start',
                    align: 'stretch'
                },
                items: [
                    {
                        xtype: 'textareafield',
                        itemId: 'messageTextareaField',
                        cls: 'message-textarea-field',
                        flex: 1,
                        maxLength: X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS(),
                        placeHolder: 'Haha'
                    }
                ]
            },
            {
                xtype: 'toolbar',
                itemId: '',
                docked: 'bottom',
                layout: {
                    type: 'hbox',
                    pack: 'justify',
                    align: 'stretch'
                },
                defaults: {
                    flex: 1
                },
                items: [
                    {
                        itemId: '',
                        cls: 'messagebox-button',
                        text: 'Post',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#photoMessageInputContainer').
                                        revertOptimizedLayeredEffect().
                                        hide(X.config.Config.getHIDE_ANIMATION_WITHOUT_EASING_CONFIG());
                            }
                        }
                    },
                    {
                        itemId: '',
                        cls: 'messagebox-button',
                        text: 'Cancel',
                        listeners: {
                            tap: function(button, e, eOpts) {
                                button.up('#photoMessageInputContainer').
                                        revertOptimizedLayeredEffect().
                                        hide(X.config.Config.getHIDE_ANIMATION_WITHOUT_EASING_CONFIG());
                            }
                        }
                    }
                ]
            }
        ]
    },
    onShow: function() {
        var me = this;
//        Easing doesn't seem to work
        Ext.getCmp('cameraTriggerPanel').
                hide(X.config.Config.getHIDE_ANIMATION_WITHOUT_EASING_CONFIG());
        me.callParent(arguments);
    },
    onHide: function() {
        var me = this;
        Ext.getCmp('cameraTriggerPanel').
                show(X.config.Config.getSHOW_ANIMATION_CONFIG());
        me.callParent(arguments);
    }
});