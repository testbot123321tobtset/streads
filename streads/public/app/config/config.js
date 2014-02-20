Ext.define('X.config.Config', {
    singleton: true,
    config: {
        // Server Config
        API_ENDPOINT: 'http://deepakkghosh.streads.jit.su/',
//        API_ENDPOINT: 'http://localhost:4000/',
        
        // TO DO: Update these URLs when you have the UIs
        DEFAULT_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_SIGNUP_PAGE: 'user/signup',
        DEFAULT_USER_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_LOGOUT_PAGE: 'user/logout',
        DEFAULT_USER_PAGE: 'user/profile/groups/feeds',
        MESSAGES: {
            // Bad news
            ALERT: 'Something seems to be wrong!',
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
            GROUP_SUCCESSFULLY_DESTROYED: 'This group was successfully destroyed.'
        },
        CUSTOMER_SERVICE_EMAIL_ADDRESS: 'test@test.com',
        DEBUG: true,
        BOOTUP_DEBUG: false,
        DETAILED_DEBUG: false,
        
        // UI
        EAGERGENERATECOMPONENTS: [
            'usergroupcontainer',
            'usereditgroupcontainer'
        ],
        // When you change any of these settings, make sure you change overrides as well
        // E.g. overrides.TabPanel
        defaultToolbarHeight: 46,
        // Animations
        defaultAnimationDuration: 300,
        // Easing types: 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out' (http://docs.sencha.com/touch/2.3.1/#!/api/Ext.Anim-cfg-easing)
        defaultAnimationEasing: 'ease',
        showAnimationConfig: {
            type: 'pop',
            easing: 'ease',
            duration: 300
        },
        hideAnimationConfig: {
            type: 'popOut',
            //direction: 'right',
            easing: 'ease',
            duration: 300
        },
        showAnimationConfigWithNoDirection: {
            type: 'pop',
            easing: 'ease',
            duration: 300
        },
        hideAnimationConfigWithNoDirection: {
            type: 'popOut',
            easing: 'ease',
            duration: 300
        },
        animationConfig: {
            type: 'pop',
            easing: 'ease',
            duration: 300
        }
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    }
});