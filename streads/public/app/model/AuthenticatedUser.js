Ext.define('X.model.AuthenticatedUser', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'id',
                type: 'string'
            },
            {
                name: 'createdAt',
                type: 'date',
                dateFormat: 'c',
                persist: false
            },
            {
                name: 'updatedAt',
                type: 'date',
                dateFormat: 'c',
                persist: false
            },
            {
                name: 'usernameEmail',
                type: 'string'
            },
            {
                name: 'firstName',
                type: 'string'
            },
            {
                name: 'lastName',
                type: 'string'
            },
            {
                name: 'fullName',
                type: 'string',
                convert: function(value, record) {
                    return (Ext.isString(record.data.firstName) && Ext.isString(record.data.lastName)) ? record.data.firstName + ' ' + record.data.lastName : null;
                },
                persist: false
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'id'
            },
            {
                type: 'email',
                field: 'usernameEmail'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: false,
            url: '/user',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
            }
        }
    }
});
