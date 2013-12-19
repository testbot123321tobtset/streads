Ext.define('X.model.User', {
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
                    return record.get('firstName') + ' ' + record.get('lastName');
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
            appendId: true,
            url: '/users',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
            }
        }
    }
});
