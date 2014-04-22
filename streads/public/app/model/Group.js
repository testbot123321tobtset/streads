Ext.define('X.model.Group', {
    extend: 'X.model.Application',
    config: {
        fields: [
            {
                name: 'id'
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
                name: 'createdById',
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
            },
            {
                type: 'presence',
                field: 'title',
                message: 'We need you to, at the very least, give this group a title.'
            },
            {
                type: 'presence',
                field: 'createdById',
                message: ''
            }
        ],
        proxy: {
            type: 'rest',
            idParam: 'id',
            appendId: true,
            url: X.config.Config.getAPI_ENDPOINT() + 'user/groups',
            batchActions: true,
            reader: {
                type: 'json',
                rootProperty: 'result'
            },
            exception: function(proxy, response, operation, eOpts) {
                Ext.Viewport.fireEvent('groupproxyexception', {
                    proxy: proxy,
                    response: response,
                    operation: operation
                });
            }
        }
    }
});
