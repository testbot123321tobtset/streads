Ext.define('X.controller.mixin.DeviceContact', {
    /*
        iPhone device contact looks like:
        {
            addresses: null
            birthday: null
            categories: null
            displayName: null
            emails: [
                {
                    id: 0
                    pref: false
                    type: "home"
                    value: "johndoe@apple.com"
                }
            ]
            id: 1682
            ims: null
            name: {
                familyName: "Doe"
                formatted: "John Doe"
                givenName: "John"
                honorificPrefix: null
                honorificSuffix: null
                middleName: null
            }
            nickname: null
            note: null
            organizations: null
            phoneNumbers: null
            photos: null
            rawId: null
            urls: null
        }
    
        Formatted contact looks like:
        {
            familyName: "Doe",
            formatted: "John Doe",
            givenName: "John"
            emails: [
                {
                    type: 'home',
                    value: 'johndoe@apple.com'
                }
            ]
        }
     */
    getFormattedContactFromGivenDeviceContacts: function(contacts) {
        var me = this;
        var formattedContacts = [];
        if (Ext.isArray(contacts) && !Ext.isEmpty(contacts)) {
            var noOfContacts = contacts.length;
            for (var i = 0; i < noOfContacts; i++) {
                var thisFormattedContact = me.getFormattedContactFromGivenDeviceContact(contacts[i]);
                if(Ext.isObject(thisFormattedContact) && !Ext.isEmpty(thisFormattedContact)) {
                    formattedContacts.push(thisFormattedContact);
                }
            }
        }
        if(!Ext.isEmpty(formattedContacts)) {
            return formattedContacts;
        }
        return false;
    },
    getFormattedContactFromGivenDeviceContact: function(contact) {
        var me = this;
        var formattedContact = {};
        Ext.Object.each(contact, function(key, value) {
            if (key === 'name' && Ext.isObject(value) && !Ext.isEmpty(value)) {
                formattedContact.familyName = Ext.isString(value.familyName) ? value.familyName : false;
                formattedContact.formattedName = Ext.isString(value.formatted) ? value.formatted : false;
                formattedContact.givenName = Ext.isString(value.givenName) ? value.givenName : false;
                
                formattedContact.emails = false;
                if (key === 'emails' && Ext.isArray(value) && !Ext.isEmpty(value)) {
                    formattedContact.emails = [
                    ];
                    Ext.each(value, function(thisEmail) {
                        if (Ext.isObject(thisEmail)) {
                            var formattedEmail = {};
                            formattedEmail.type = Ext.isString(thisEmail.type) ? thisEmail.type : false;
                            formattedEmail.value = Ext.isString(thisEmail.value) ? thisEmail.value : false;
                            formattedContact.emails.push(formattedEmail);
                        }
                    });
                }
            }
        });
        if(!Ext.isEmpty(formattedContact)) {
            return formattedContact;
        }
        return false;
    }
});
