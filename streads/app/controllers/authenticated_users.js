var AuthenticatedUsers = function() {
    var me = this;
    
    me.respondsWith = [
        'json', 'xml'
    ];

    me.index = function(req, resp, params) {
        this.respond({
            params: params
        });
    };

    me.add = function(req, resp, params) {
        this.respond({
            params: params
        });
    };

    me.create = function(req, resp, params) {
        // Save the resource, then display index page
        this.redirect({
            controller: this.name
        });
    };

    me.show = function(req, resp, params) {
        this.respond({
            params: params
        });
    };

    me.edit = function(req, resp, params) {
        this.respond({
            params: params
        });
    };

    me.update = function(req, resp, params) {
        // Save the resource, then display the item page
        this.redirect({
            controller: this.name,
            id: params.id
        });
    };

    me.remove = function(req, resp, params) {
        this.respond({
            params: params
        });
    };

};

exports.AuthenticatedUsers = AuthenticatedUsers;