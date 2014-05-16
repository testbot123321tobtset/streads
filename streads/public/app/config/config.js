Ext.define('X.config.Config', {
    singleton: true,
    config: {
        // Server Config
//        API_ENDPOINT: 'http://deepakkghosh.streads.jit.su/',
        API_ENDPOINT: 'http://localhost:4000/',
        
        // TO DO: Update these URLs when you have the UIs
        DEFAULT_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_SIGNUP_PAGE: 'user/signup',
        DEFAULT_USER_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_LOGOUT_PAGE: 'user/logout',
        DEFAULT_USER_PAGE: 'user/profile/groups/feeds',
        MESSAGES: {
            // Bad news
            ALERT: 'Something seems to be wrong!',
            CONFIRM: 'We need your permission',
            INVALID_LOGIN: 'Hmm, we couldn\'t log you in. Email us if the problem persists.',
            FAILED_AUTHENTICATION: 'Hmm, we couldn\'t find you in our system. Email us if the problem persists.',
            FAILED_SAVE: 'The data you requested could not be saved. Let us know if the problem persists.',
            REPORT_BUG: 'Email Us',
            FREE_CLUB_LABEL: 'This club is free for all to join!',
            FREE_CLUB_POINTS: 'Free',
            NO_BRAND_WAS_FOUND_TO_LOAD_PROFILE: 'We are sorry, but we couldn\'t find a brand to load it\'s profile. Are you sure you have the correct URL? If you are a registered brand yourself, then try logging in first. If you continue to face problems, please email us and let us know.',
            INVALID_BRAND_FOUND_IN_URL_TO_LOAD_PROFILE: 'We are sorry, but we couldn\'t find the brand referenced in the URL. Are you sure you have the correct URL? If you are sure you have the correct URL but continue to face problems, please email us the offending URL.',
            STATE_FAILURE_DEFAULT_MESSAGE: 'We are sorry, but we may have just run into a rather nasty problem. Try navigating away from this page using the controls in the bottom menu bar. If that doesn\'t work please try refreshing the page. If you were in the middle of something and didn\'t have a chance to save your work, you will have to re-do it after you refresh the page. If you continue to face problems, please email us and let us know.',
            
            // Good news
            SUCCESS: 'It worked!',
            SAVE_SUCCESSFUL: 'Your changes were successfully saved.',
            
            // Message box title
            MESSAGE_BOX_CONFIRM_TITLE: 'Just making sure',
            
            MODEL_SUCCESSFULLY_CREATED: 'This model was successfully created.',
            MODEL_SUCCESSFULLY_UPDATED: 'This model was successfully updated.',
            MODEL_SUCCESSFULLY_DESTROYED: 'This model was successfully destroyed.',
            USER_SUCCESSFULLY_CREATED: 'This user was successfully created.',
            USER_SUCCESSFULLY_UPDATED: 'This user was successfully updated.',
            USER_SUCCESSFULLY_DESTROYED: 'This user was successfully destroyed.',
            GROUP_SUCCESSFULLY_CREATED: 'This group was successfully created.',
            GROUP_SUCCESSFULLY_UPDATED: 'This group was successfully updated.',
            GROUP_FAILED_UPDATED: 'This group failed to update.',
            GROUP_SUCCESSFULLY_DESTROYED: 'This group was successfully destroyed.',
            
            FRIENDSHIP_SUCCESSFULLY_CREATED: 'This friendship was successfully created.',
            
            DEVICE_CONTACTS_ACCESS_REQUEST: 'Giving us access to your device\'s address book will help us automatically find all ' +
                    'your friends whom you can start sharing with right away.<br /><br />We promise we will not contact them on your behalf or otherwise bug you ' +
                    'guys in any way!<br /><br />Do you want to go ahead with it?'
        },
        CUSTOMER_SERVICE_EMAIL_ADDRESS: 'test@test.com',
        DEBUG: true,
        BOOTUP_DEBUG: false,
        DETAILED_DEBUG: false,
        
        // UI
        EAGERGENERATECOMPONENTS: [
            //            'usergroupcontainer',
            //            'usereditgroupcontainer'
        ],
        // Z indices
        ZINDEX_LEVEL_5: 50,
        ZINDEX_LEVEL_4: 49,
        ZINDEX_LEVEL_3: 48,
        ZINDEX_LEVEL_2: 47,
        ZINDEX_LEVEL_1: 46,
        // Should depth be represented by offset either vertically or horizontally
        LAYER_DEPTH_BASED_ON_OFFSET: false,
        // Every new window-like floating container will reduce in dimensions by this much pixels
        LAYER_HORIZONTAL_OFFSET: 0,
        LAYER_VERTICAL_OFFSET: 0,
        // Animations
        // When you change animations, check overrides.TitleBar for consistency
        // Animation types: 'fade', 'fadeOut', 'flip', 'pop', 'popOut', 'slide', 'slideOut' (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.fx.Animation-cfg-type)
        DEFAULT_ANIMATION_DURATION: 800,
        // Easing types: 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out' (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Anim-cfg-easing)
        DEFAULT_ANIMATION_EASING: 'cubic-bezier(0,.23,0,1)',
        ANIMATION_CONFIG: {
            type: 'slide',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        SHOW_ANIMATION_WITH_NO_DIRECTION_CONFIG: {
            type: 'slide',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        HIDE_ANIMATION_WITH_NO_DIRECTION_CONFIG: {
            type: 'slideOut',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        SHOW_ANIMATION_CONFIG: {
            type: 'pop',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        SHOW_ANIMATION_FROM_UP_CONFIG: {
            type: 'slide',
            direction: 'down',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        HIDE_ANIMATION_CONFIG: {
            type: 'popOut',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        HIDE_ANIMATION_FROM_DOWN_CONFIG: {
            type: 'slideOut',
            direction: 'up',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        HIDE_ANIMATION_FROM_DOWN_SLOW_AT_FIRST_CONFIG: {
            type: 'slideOut',
            direction: 'up',
            easing: 'cubic-bezier(.7,0,.7,1)',
            duration: 800
        },
        SHOW_BY_POP_ANIMATION_CONFIG: {
            type: 'pop',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        HIDE_BY_POP_ANIMATION_CONFIG: {
            type: 'popOut',
            easing: 'cubic-bezier(0,.23,0,1)',
            duration: 800
        },
        
        // Phonegap
        // Contact (http://docs.phonegap.com/en/3.3.0/cordova_contacts_contacts.md.html#Contacts)
        PG_FIELDS_REQUIRED_TO_IMPORT_DEVICE_CONTACT: [
            'emails'
            //            'phoneNumbers'
        ],
        PG_READ_DEVICE_CONTACT_FIELDS: [
            'id', 'displayName', 'name', 'nickname', 'phoneNumbers', 'emails', 'photos'
        ],
//        https://github.com/apache/cordova-plugin-camera/blob/master/doc/index.md
        PG_CAMERA: {
            ENCODING_TYPE: 0,
            PICTURE_SOURCE_TYPE: 1,
            DESTINATION_TYPE: 1,
            MEDIA_TYPE: 2
        },
        
//        Messaging
        TEXT_MESSAGE_MAXIMUM_CHARACTERS: 140,
        TEXT_MESSAGE_MAXIMUM_CHARACTERS_MESSAGE_POSTFIX: ' characters left',
        TEXT_MESSAGE_PLACEHOLDER: 'Hoho',
        
//        Labels
        LABELS: {
            SELECT_FRIENDS_TO_ADD_TO_GROUP: 'Choose friends to add',
            SEE_FRIENDS_IN_THE_GROUP: 'Members'
        }
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});
