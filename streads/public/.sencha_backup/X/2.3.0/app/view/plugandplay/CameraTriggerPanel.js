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
        left: 0,
        bottom: 0,
        cls: 'camera-trigger-panel',
        zIndex: 10,
        items: [
            {
                xtype: 'button',
                itemId: 'cameraTriggerButton',
                cls: 'camera-trigger-button',
                iconCls: 'camera',
                listeners: {
                    initialize: function(button, eOpts) {
                        button.element.on('doubletap', function(event, node, options, eOpts) {
                            Ext.Viewport.fireEvent('cameratriggerbuttondoubletap', {
                                cameraTriggerPanel: button.up('#cameraTriggerPanel'),
                                cameraTriggerButton: button
                            });
                        });
                    }
                }
            }
        ]
    }
});