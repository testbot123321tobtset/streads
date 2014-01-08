Ext.define('X.view.plugandplay.UserAccountInfoPanel', {
    extend: 'Ext.Container',
    xtype: 'useraccountinfopanel',
    requires: [
        'X.view.ux.ToggleableButton',
        'X.view.plugandplay.UserAccountFormPanel'
    ],
    id: 'userAccountInfoPanel',
    config: {
        layout: {
            type: 'vbox',
            align: 'stretch',
            pack: 'start'
        },
        cls: 'user-account-info-panel',
        scrollable: true,
        items: [
            //            {
            //                itemId: 'userDisplayName',
            //                cls: 'highlighted-header-panel user-account-display-name-panel',
            //                tpl: new Ext.XTemplate(
            //                        '<tpl if="typeof(firstName) === \'string\' && firstName !== \'\'">',
            //                        '{firstName} ',
            //                        '</tpl>',
            //                        '<tpl if="typeof(lastName) === \'string\' && lastName !== \'\'">',
            //                        '{lastName}',
            //                        '</tpl>',
            //                        '<tpl if="!this.nameExists(firstName, lastName)">',
            //                        '{usernameEmail}',
            //                        '</tpl>',
            //                        {
            //                            nameExists: function(firstName, lastName) {
            //                                return (typeof (firstName) === 'string' && firstName !== '') || (typeof (lastName) === 'string' && lastName !== '');
            //                            }
            //                        }
            //                )
            //            },
            {
                itemId: 'profilePanel',
                cls: 'user-account-profile-panel',
                flex: 1,
                layout: {
                    type: 'vbox',
                    align: 'stretch',
                    pack: 'start'
                },
                items: [
                    {
                        xtype: 'useraccountformpanel',
                        flex: 1
                    }
                ]
            },
            {
                itemId: 'image-upload-button',
                xtype:"button",
                text: "Upload",
                ui: 'confirm',
                listeners: {
                    tap: function() {
                        alert("You tapped me");
                    }
                }, 
                handler: function(){
                    var input = Ext.Viewport.down("fileinput").input;
                    var image = Ext.Viewport.down("image");
                    var files = input.dom.files;
                    if (files.length) {
                        request.binaryData = files[0];

                        //size is in bytes
                        if(request.binaryData.size <= 2097152) {
                            Ext.Ajax.request(request);
                        } else {
                            Ext.Msg.alert("JPG Must be less then 2MB");
                        }
                    }else {
                        Ext.Msg.alert("Please Select a JPG");
                    }
                }
            },
            {
                xtype: 'panel',
                id: "output",
                scrollable: true,
                flex:1
            }
        ],
        listeners: [
            {
                fn: 'onUserDisplayNameUpdateData',
                event: 'updatedata',
                delegate: '#userDisplayName',
                buffer: 1
            }
        ]
    },
    // We need this because form panel does not update itself when a record
    // gets updated from elsewhere in the app whereas a simple panel does
    // So we listen for updatedata event on a simple panel userDisplayName and 
    // use that to update the form panel
    // Params to this function if you ever need them: userDisplayNamePanel, newData, eOpts
    onUserDisplayNameUpdateData: function() {
        var me = this;
        var userAccountFormPanel = me.down('useraccountformpanel');
        if (Ext.isObject(userAccountFormPanel)) {
            userAccountFormPanel.setRecord(userAccountFormPanel.getRecord());
        }
        return me;
    }
});