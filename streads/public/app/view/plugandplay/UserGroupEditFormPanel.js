Ext.define('X.view.plugandplay.UserGroupEditFormPanel', {
    extend: 'X.view.core.FormPanel',
    requires: [
        'Ext.form.FieldSet'
    ],
    xtype: 'usergroupeditformpanel',
    id: 'userGroupEditFormPanel',
    config: {
        layout: {
            type: 'vbox',
            pack: 'start',
            align: 'stretch'
        },
        cls: 'user-group-edit-form-panel',
        items: [
            {
                xtype: 'fieldset',
                itemId: 'groupEditTitleAndDescriptionFormFieldSet',
                cls: 'group-edit-title-and-description-form-fieldset',
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
                        itemId: 'descriptionTextfield',
                        cls: 'description-textfield',
                        placeHolder: 'Description',
                        name: 'description'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                itemId: 'groupEditMembersFormFieldSet',
                cls: 'group-edit-members-form-fieldset',
                defaults: {
                    xtype: 'textfield'
                },
                items: [
                    {
                        itemId: 'titleXTextfield',
                        cls: 'title-textfield',
                        placeHolder: 'List all contacts here',
                        name: 'titleX'
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'deleteButton',
                cls: 'delete-button',
                text: 'Delete',
                ui: 'decline'
            }
        ],
        listeners: [
            {
                fn: 'onGroupDataEdit',
                event: 'change',
                delegate: '#titleTextfield',
                buffer: 1
            },
            {
                fn: 'onGroupDataEdit',
                event: 'change',
                delegate: '#descriptionTextfield',
                buffer: 1
            },
            {
                fn: 'onGroupDataDestroy',
                event: 'tap',
                delegate: '#deleteButton',
                buffer: 1
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
        me.down('#descriptionTextfield').setValue('');
        return me;
    },
    onGroupDataEdit: function(field, newValue, oldValue, eOpts) {
        var me = this;
        var groupRecord = me.getRecord();
        var groupRecordId = groupRecord.get('id');
        var fieldName = field.getName();
        var groupsStore = Ext.getStore('GroupsStore');
        var groupFromGroupsStore = groupsStore.getById(groupRecordId);
        var groupFieldValueFromGroupsStore = groupFromGroupsStore.get(fieldName);
        if(groupFieldValueFromGroupsStore !== newValue) {
            groupRecord.set(fieldName, newValue);
            Ext.Viewport.fireEvent('editgroup', {
                group: groupRecord,
                silent: true
            });
        }
    },
    onGroupDataDestroy: function(field, newValue, oldValue, eOpts) {
        var me = this;
        Ext.Viewport.fireEvent('destroygroup', {
            group: me.getRecord(),
            silent: false,
            typeOfSave: 'destroy'
        });
    }
});