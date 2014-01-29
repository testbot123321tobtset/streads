/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

var Application = function() {
    var me = this;
    
    // CORS
    me.before(function() {
        var self = this;
        self.response.resp.setHeader('Access-Control-Allow-Origin', '*');
        self.response.resp.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
        self.response.resp.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');

        if (self.params['query'] && typeof self.params['query'] !== 'object') {
            self.params.query = JSON.parse(self.params.query);
        }
        if (self.params['sort'] && typeof self.params['sort'] !== 'object') {
            self.params.sort = JSON.parse(self.params.sort);
        }
    });
    
    me.options = function(req, resp, params) {
        if (req.method.toLowerCase() === 'options') {
            resp.setHeaders(200, {
                'Content-Type': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Max-Age': 5184000   //2 months
            });
            resp.finish();
            return;
        }
    };
};

exports.Application = Application;