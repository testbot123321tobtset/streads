Ext.define('X.model.DeviceContact', {
    extend: 'X.model.Application',
    requires: [
        'Ext.data.reader.Json'
    ],
    config: {
        fields: [
            {
                name: 'familyName',
                type: 'string'
            },
            {
                name: 'formattedName',
                type: 'string'
            },
            {
                name: 'givenName',
                type: 'string'
            },
            {
                name: 'phoneNumbers',
                type: 'auto'
            },
            {
                name: 'emails',
                type: 'auto'
            }
        ],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                rootProperty: 'result'
            }
        }
    }
});
