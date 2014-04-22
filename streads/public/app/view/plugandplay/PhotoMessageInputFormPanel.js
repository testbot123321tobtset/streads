// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.PhotoMessageInputFormPanel', {
    extend: 'X.view.core.Container',
    requires: [
        'Ext.Img'
    ],
    xtype: 'photomessageinputformpanel',
    id: 'photoMessageInputFormPanel',
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
        cls: 'photo-message-input-form-panel',
        floating: true,
        centered: true,
        fullscreen: true,
        layer: 1,
        depthBasedOnOffset: true,
        modal: true,
        querySelectorsForComponentsToBeHiddenToOptimizeLayer: [
        ],
        querySelectorsForComponentsToBeBlurredToOptimizeLayer: [
            '#pageUserRoot'
        ],
        items: [
            {
                xtype: 'image',
                width: '100%',
                flex: 1,
                src: ''
            },
            {
                xtype: 'textareafield',
                maxRows: 4,
                maxLength: X.config.Config.getTEXT_MESSAGE_MAXIMUM_CHARACTERS(),
                placeHolder: 'Haha'
            },
            {
                xtype: 'button',
                text: 'Find friends from your device\'s address book',
                ui: 'confirm'
            }
        ]
    },
    onShow: function() {
        var me = this;
        Ext.getCmp('cameraTriggerPanel').
                hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        me.callParent(arguments);
    },
    onHide: function() {
        var me = this;
        Ext.getCmp('cameraTriggerPanel').
                show(X.config.Config.getSHOW_ANIMATION_CONFIG());
        me.callParent(arguments);
    }
});