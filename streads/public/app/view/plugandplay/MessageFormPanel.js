Ext.define('X.view.plugandplay.MessageFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet'
    ],
    xtype: 'messageformpanel',
    config: {
        itemId: 'messageFormPanel',
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'message-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'messageFormFieldSet',
                cls: 'message-form-fieldset',
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
            }
        ]
    }
});