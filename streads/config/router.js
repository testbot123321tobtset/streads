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


var router = new geddy.RegExpRouter();

// CORS
router.match('/*path(.:format)', 'OPTIONS').
        to({
            controller: 'Application',
            action: 'options'
        });

// We default to index.html in public directory, so we can load Sencha Touch
router.get('/').
        to('Main.index');

// Basic routes
// router.match('/moving/pictures/:id', 'GET').to('Moving.pictures');
//
// router.match('/farewells/:farewelltype/kings/:kingid', 'GET').to('Farewells.kings');
//
// Can also match specific HTTP methods only
// router.get('/xandadu').to('Xanadu.specialHandler');
// router.del('/xandadu/:id').to('Xanadu.killItWithFire');
//
// Resource-based routes
// router.resource('hemispheres');
//
// Nested Resource-based routes
// router.resource('hemispheres', function(){
//   this.resource('countries');
//   this.get('/print(.:format)').to('Hemispheres.print');
// });
// 
// r.resource('SnowDogs');
// is equivalent to the following:
// 
// index doesn't need an id; it displays all items
// r.match('/snow_dogs(.:format)','GET').to({controller: 'SnowDogs', action: 'index'});
// 
// The 'add' action loads the Web form that POSTs to the 'create' endpoint
// If you're only using Geddy as an API backend, 'add' action is probably not relevant to you
// r.match('/snow_dogs/add(.:format)','GET').to({controller: 'SnowDogs', action: 'add'});
// 
// show needs an id; it displays only the requested item
// r.match('/snow_dogs/:id(.:format)','GET').to({controller: 'SnowDogs', action: 'show'});
// 
// The 'edit' action loads the Web form that PUTs to the 'update' endpoint
// If you're only using Geddy as an API backend, 'edit' action is probably not relevant to you
// r.match('/snow_dogs/:id/edit(.:format)','GET').to({controller: 'SnowDogs', action: 'edit'});
// 
// r.match('/snow_dogs(.:format)','POST').to({controller: 'SnowDogs', action: 'create'});
// 
// r.match('/snow_dogs/:id(.:format)','PUT').to({controller: 'SnowDogs', action: 'update'});
// 
// r.match('/snow_dogs/:id(.:format)','DELETE').to({controller: 'SnowDogs', action: 'destroy'});

router.post('/login').
        to('Auth.local');
router.post('/auth/local').
        to('Auth.local');
router.get('/auth/twitter').
        to('Auth.twitter');
router.get('/auth/twitter/callback').
        to('Auth.twitterCallback');
router.get('/auth/facebook').
        to('Auth.facebook');
router.get('/auth/facebook/callback').
        to('Auth.facebookCallback');
router.get('/auth/yammer').
        to('Auth.yammer');
router.get('/auth/yammer/callback').
        to('Auth.yammerCallback');

router.match('/users(.:format)', 'POST').
        to({
            controller: 'Users',
            action: 'create'
        });
router.match('/user', 'GET').
        to({
            controller: 'Users',
            action: 'showMe'
        });
router.match('/user', 'PUT').
        to({
            controller: 'Users',
            action: 'update'
        });
router.match('/logout', 'GET').
        to({
            controller: 'Users',
            action: 'logout'
        });
router.match('/user/logout', 'GET').
        to({
            controller: 'Users',
            action: 'logout'
        });
        
router.match('/user/groups(.:format)', 'GET').
        to({
            controller: 'Groups',
            action: 'index'
        });
router.match('/user/groups/:id', 'GET').
        to({
            controller: 'Groups',
            action: 'getMyGroupData'
        });
router.match('/user/groups(.:format)', 'POST').
        to({
            controller: 'Groups',
            action: 'create'
        });
router.match('/user/groups/:id(.:format)', 'PUT').
        to({
            controller: 'Groups',
            action: 'update'
        });
router.match('/user/groups/:id(.:format)','DELETE').
        to({
            controller: 'Groups',
            action: 'destroy'
        });
         

// routing for creating/destroying friendhips
router.post('/friendships(.:format)').
        to({
            controller:'Friendships',
            action:'create'
        });
router.del('/friendships/:id(.:format)').
        to({
            controller: 'Friendships',
            action: 'destroy'
        });
router.resource('users');
//test code
//router.resource('friendships');
//router.resource('groupships');
//router.resource('groups');
exports.router = router;
