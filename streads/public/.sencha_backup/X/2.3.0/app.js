/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when it performs code generation tasks such as generating new
 models, controllers or views and when running 'sencha app upgrade'.
 
 Ideally changes to this file would be limited and most work would be done
 in other places (such as Controllers). If Sencha Cmd cannot merge your
 changes and its generated code, it will produce a 'merge conflict' that you
 will need to resolve manually.
 */

/*
 * Each Application can define a launch function, which is called as soon as 
 * all of your app's classes have been loaded and the app is ready to launch. 
 * This is usually the best place to place any app startup logic, 
 * typically creating the main view structure for your app.
 * 
 * In addition to the Application launch function, there are two other places 
 * where you can place app startup logic. First, each Controller is able to 
 * define an init function, which is called before the Application launch 
 * function. Second, if you are using Device Profiles, each Profile can 
 * define a launch function, which is called after the Controller init 
 * functions, but before the Application launch function.
 * 
 * Note Only the active Profile has its launch function called - for example 
 * if you define profiles for Phone and Tablet and then launch the app on a 
 * tablet, only the Tablet Profile's launch function is called.
 * 
 * The launch order is:
 * 
 * Controller#init functions called
 * Profile#launch function called
 * Application#launch function called
 * Controller#launch functions called
 * 
 * When using Profiles, it is common to place most of the bootup logic 
 * inside the Profile launch function, because each Profile has a different 
 * set of views that need to be constructed at startup.
 */

/*
 * All available iconCls for Buttons
 @include icon('calendar');
 @include icon('action');
 @include icon('add');
 @include icon('arrow_down');
 @include icon('arrow_left');
 @include icon('arrow_right');
 @include icon('arrow_up');
 @include icon('compose');
 @include icon('delete');
 @include icon('organize');
 @include icon('refresh');
 @include icon('reply');
 @include icon('search');
 @include icon('settings');
 @include icon('star');
 @include icon('trash');
 @include icon('maps');
 @include icon('locate');
 @include icon('home');
 @include icon('bookmarks');
 @include icon('download');
 @include icon('favorites');
 @include icon('info');
 @include icon('more');
 @include icon('time');
 @include icon('user');
 @include icon('team');
 */
Ext.application({
    name: 'X',
    profiles: ['Phone'],
    requires: [
        'Ext.MessageBox',
        'X.config.Config'
    ],
    models: [
        'User',
        'AuthenticatedUser',
        'Group'
    ],
    stores: [
        'Users',
        'AuthenticatedUser',
        'Groups'
    ],
    controllers: [
        'phone.Main',
        'Boot',
        'Users',
        'Groups'
    ],
    views: [
        'page.Login',
        'page.user.Root'
    ],
    icon: {
        '57': 'resources/icons/Icon.png',
        '72': 'resources/icons/Icon~ipad.png',
        '114': 'resources/icons/Icon@2x.png',
        '144': 'resources/icons/Icon~ipad@2x.png'
    },
    isIconPrecomposed: true,
    startupImage: {
        '320x460': 'resources/startup/320x460.jpg',
        '640x920': 'resources/startup/640x920.png',
        '768x1004': 'resources/startup/768x1004.png',
        '748x1024': 'resources/startup/748x1024.png',
        '1536x2008': 'resources/startup/1536x2008.png',
        '1496x2048': 'resources/startup/1496x2048.png'
    },
    launch: function() {
        // Easy access to config object
        X.XConfig = X.config.Config;
        if (X.XConfig.getDEBUG() && X.XConfig.getBOOTUP_DEBUG()) {
            console.log('Debug: Ext.application.launch(): ' + Ext.Date.format(new Date(), 'H:i:s'));
            alert('Debug: Ext.application.launch(): ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        // Destroy the #appLoadingIndicator element
        Ext.fly('circleG').destroy();

        // http://docs.sencha.com/touch/2.3.0/#!/api/Ext.Component-method-setRecord
        Ext.define('X.override.Component', {
            override: 'Ext.Component',
            setRecordRecursive: function(record) {
                if (typeof this.setRecord === 'function') {
                    this.setRecord(record);
                }
                if (typeof this.getItems === 'function') {
                    this.getItems().each(function(item) {
                        this.setRecordRecursive.apply(item, [record]);
                    });
                }
            }
        });
        
        // Standardize animations across all relevant components
        Ext.define('X.override.TabPanel', {
            override: 'Ext.TabPanel',
            config: {
                layout: {
                    type: 'card',
                    animation: X.config.Config.getAnimationConfig()
                },
                showAnimation: X.config.Config.getShowAnimationConfigWithNoDirection(),
                hideAnimation: X.config.Config.getHideAnimationConfigWithNoDirection()
            }
        });
        
        Ext.apply(String.prototype, (function() {
            function uc(str, p1) {
                return p1.toUpperCase();
            }
            function lc(str, p1) {
                return p1.toLowerCase();
            }
            var camelRe = /-([a-z])/g,
                    titleRe = /((?:\s|^)[a-z])/g,
                    capsRe = /^([a-z])/,
                    decapRe = /^([A-Z])/,
                    leadAndTrailWS = /^\s*([^\s]*)?\s*/,
                    result;

            return {
                leftPad: function(val, size, ch) {
                    result = String(val);
                    if (!ch) {
                        ch = " ";
                    }
                    while (result.length < size) {
                        result = ch + result;
                    }
                    return result;
                },
                camel: function(s) {
                    return this.replace(camelRe, uc);
                },
                title: function(s) {
                    return this.replace(titleRe, uc);
                },
                decapitalize: function() {
                    return this.replace(decapRe, lc);
                },
                startsWith: function(prefix) {
                    return this.substr(0, prefix.length) === prefix;
                },
                endsWith: function(suffix) {
                    var start = this.length - suffix.length;
                    return (start > -1) && (this.substr(start) === suffix);
                },
                equalsIgnoreCase: function(other) {
                    return (this.toLowerCase() === other.toLowerCase());
                },
                // Remove leading and trailing whitespace
                normalize: function() {
                    return leadAndTrailWS.exec(this)[1] || '';
                }
            };
        })());
        
        Ext.Msg.defaultAllowedConfig.width = '100%';
    },
    onUpdated: function() {
        Ext.Msg.confirm(
                'Application Update',
                'This application has just successfully been updated to the latest version. Reload now?',
                function(buttonId) {
                    if (buttonId === 'yes') {
                        window.location.reload();
                    }
                }
        );
    }
});
