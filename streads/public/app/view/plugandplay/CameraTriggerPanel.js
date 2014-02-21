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
        // This right is not zero, because the icon we use here is not a perfect square
        // but a rectangle, and so it appears closer to the right than to the bottom
        // So we push it a bit toward the left, so it appears to be at an equal distance
        // from the right and the bottom
        right: '0.2em',
        cls: 'camera-trigger-panel',
        zIndex: 10,
        items: [
            {
                xtype: 'button',
                itemId: 'cameraTriggerButton',
                cls: 'rounded-button camera-trigger-button',
                iconCls: 'camerafilled',
                listeners: {
                    initialize: function(button, eOpts) {
                        button.element.on('doubletap', function(event, node, options, eOpts) {
                            Ext.Viewport.fireEvent('cameratriggerbuttondoubletap', {
                                cameraTriggerPanel: button.up('#cameraTriggerPanel'),
                                cameraTriggerButton: button
                            });
                        });
                    },
                    tap: function(button, eOpts) {
                        Ext.Viewport.fireEvent('cameratriggerbuttontap', {
                            cameraTriggerPanel: button.up('#cameraTriggerPanel'),
                            cameraTriggerButton: button
                        });
                    }
                }
            }
        ]
    }
});