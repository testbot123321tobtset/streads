Ext.define('X.view.plugandplay.CameraTriggerPanel', {
    extend: 'X.view.core.Panel',
    requires: [
    ],
    xtype: 'cameratriggerpanel',
    id: 'cameraTriggerPanel',
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
        cls: 'camera-trigger-panel',
        zIndex: 20,
        items: [
            {
                xtype: 'tabbar',
                docked: 'bottom',
                layout: {
                    pack: 'center',
                    align: 'center'
                },
                items: [
                    {
                        itemId: 'cameraTriggerButton',
                        cls: 'camera-trigger-button',
                        iconCls: 'camerafilled',
                        title: 'Shoot'
                    }
                ]
            }
        ],
        listeners: [
            {
                fn: 'onCameraTriggerButtonTap',
                event: 'tap',
                delegate: '#cameraTriggerButton'
            }
        ]
    },
    onCameraTriggerButtonInitialize: function(button, eOpts) {
        var me = this;
        me.element.on('doubletap', function(event, node, options, eOpts) {
            me.fireEvent('doubletap', me, event, node, options, eOpts);
        });
        return me;
    },
    onCameraTriggerButtonTap: function() {
        var me = this;
        me.close();
        return me;
    },
    open: function() {
        var me = this;
        me.show(X.config.Config.getSHOW_BY_POP_ANIMATION_CONFIG());
        Ext.Viewport.fireEvent('cameratriggerpanelopen', {
            photoMessageInputContainer: me
        });
        return me;
    },
    close: function() {
        var me = this;
        me.hide(X.config.Config.getHIDE_BY_POP_ANIMATION_CONFIG());
        Ext.Viewport.fireEvent('cameratriggerpanelclose', {
            photoMessageInputContainer: me
        });
        return me;
    }
});