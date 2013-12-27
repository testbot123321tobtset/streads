Ext.define('X.model.Group', {
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
                name: 'title',
                type: 'string'
            },
            {
                name: 'description',
                type: 'string'
            }
        ],
        validations: [
            {
                type: 'presence',
                field: 'id'
            }
        ],
        hasMany: [
            {
                model: 'X.model.User'
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: true,
            url: '/user/group',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
            }
        }
    }
});
