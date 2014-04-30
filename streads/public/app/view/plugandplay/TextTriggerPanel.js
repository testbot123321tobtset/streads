Ext.define('X.view.plugandplay.TextTriggerPanel', {
    extend: 'X.view.core.Panel',
    requires: [
    ],
    xtype: 'texttriggerpanel',
    id: 'textTriggerPanel',
    config: {
        layout: {
            type: 'vbox',
            pack: 'center',
            align: 'stretch'
        },
        bottom: 0,
        left: '0.12em',
        // This right is not zero, because the icon we use here is not a perfect square
        // but a rectangle, and so it appears closer to the right than to the bottom
        // So we push it a bit toward the left, so it appears to be at an equal distance
        // from the right and the bottom
        cls: 'text-trigger-panel',
        zIndex: 20,
        items: [
            {
                xtype: 'button',
                itemId: 'textTriggerButton',
                cls: 'rounded-button text-trigger-button',
                iconCls: 'textfilled'
//                ,
//                listeners: {
//                    This doesn't work inside of the delegate listeners
//                    initialize: function(button, eOpts) {
//                        button.up('#textTriggerPanel').onTextTriggerButtonInitialize(button, eOpts);
//                    }
//                }
            }
        ],
        listeners: [
            {
                fn: 'onTextTriggerButtonTap',
                event: 'tap',
                delegate: '#textTriggerButton'
            }
        ]
    },
    onTextTriggerButtonInitialize: function(button, eOpts) {
        var me = this;
        me.element.on('doubletap', function(event, node, options, eOpts) {
            me.fireEvent('doubletap', me, event, node, options, eOpts);
        });
        return me;
    },
    onTextTriggerButtonTap: function() {
        var me = this;
        me.close();
        return me;
    },
    open: function() {
        var me = this;
        Ext.Viewport.fireEvent('texttriggerpanelopen', {
            textMessageInputContainer: me
        });
        return me;
    },
    close: function() {
        var me = this;
        Ext.Viewport.fireEvent('texttriggerpanelclose', {
            textMessageInputContainer: me
        });
        return me;
    }
});