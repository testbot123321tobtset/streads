Ext.define('X.view.plugandplay.UserGroupAddFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet'
    ],
    xtype: 'usergroupaddformpanel',
    id: 'userGroupAddFormPanel',
    config: {
        cls: 'user-group-add-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'groupAddTitleAndDescriptionFormFieldSet',
                cls: 'group-add-title-and-description-form-fieldset',
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        itemId: 'titleTextfield',
                        cls: 'title-textfield',
                        placeHolder: 'Title',
                        name: 'title'
                    },
                    {
                        xtype: 'textareafield',
                        itemId: 'descriptionTextareafield',
                        cls: 'description-textareafield',
                        placeHolder: 'Description',
                        name: 'description'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'groupAddMembersFormFieldSet',
                cls: 'group-add-members-form-fieldset',
                title: 'Add Members',
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        itemId: 'titleXTextfield',
                        cls: 'title-textfield',
                        placeHolder: 'List all contacts here',
                        name: 'title'
                    }
                ]
            }
        ]
    },
    resetAllFields: function() {
        var me = this;
        me.resetTitleField().resetDescriptionField();
        return me;
    },
    resetTitleField: function() {
        var me = this;
        me.down('#titleTextfield').setValue('');
        return me;
    },
    resetDescriptionField: function() {
        var me = this;
        me.down('#descriptionTextareafield').setValue('');
        return me;
    }
});