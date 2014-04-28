// This is meant to be displayed as a window. This means that any other 
// component can call this component and this component should just fill up
// the screen. This is essentially an independent and quasi-floating window
Ext.define('X.view.plugandplay.PhotoMessageInputContainer', {
    extend: 'X.view.core.Container',
    requires: [
        'Ext.Img',
        'X.view.plugandplay.MessageFormPanel'
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
                height: 300,
                width: '100%',
                mode: 'background',
                src: ''
//                src: 'http://tomatofish.com/wp-content/uploads/2013/08/placeholder-tomatofish.jpg'
            },
            {
                xtype: 'messageformpanel',
                flex: 1,
                scrollable: true
            },
            {
                xtype: 'toolbar',
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
                        itemId: 'postMessage',
                        cls: 'messagebox-button',
                        text: 'Post'
                    },
                    {
                        itemId: 'cancelMessage',
                        cls: 'messagebox-button',
                        text: 'Cancel'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onPostMessage',
                event: 'tap',
                delegate: '#postMessage'
            },
            {
                fn: 'onCancelMessage',
                event: 'tap',
                delegate: '#cancelMessage'
            }
        ]
    },
    onPostMessage: function() {
        var me = this;
        me.close();
        return me;
    },
    onCancelMessage: function() {
        var me = this;
        me.close();
        return me;
    },
    open: function() {
        var me = this;
        me.setDimensionsToFillScreen().
                createOptimizedLayeredEffect().
                show(X.config.Config.getSHOW_ANIMATION_CONFIG());
        Ext.Viewport.fireEvent('photomessageinputcontaineropen', {
            photoMessageInputContainer: me
        });
        return me;
    },
    close: function() {
        var me = this;
        me.revertOptimizedLayeredEffect().
                hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        Ext.Viewport.fireEvent('photomessageinputcontainerclose', {
            photoMessageInputContainer: me
        });
        return me;
    }
//    ,
//    setImageUsingBase64Data: function(imageData) {
//        var me = this;
//        if (!Ext.isEmpty(imageData)) {
//            me.down('image').
//                    setSrc('data:image/jpeg;base64,' + imageData);
//        }
//        return me;
//    },
//    setImageUsingFileUrl: function(imageFileUrl) {
//        var me = this;
//        if (Ext.isString(imageFileUrl)) {
//            me.down('image').
//                    setSrc(imageFileUrl);
//
//        }
//        return me;
//    }
});