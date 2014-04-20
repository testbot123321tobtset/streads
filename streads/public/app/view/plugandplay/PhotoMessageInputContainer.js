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
            pack: 'center',
            align: 'stretch'
        },
        cls: 'photo-message-input-container',
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
                flex: 4,
                src: 'http://placehold.it/250x400'
            },
            {
                xtype: 'container',
                flex: 1,
                html: 'Haha'
            }
        ]
    }
});