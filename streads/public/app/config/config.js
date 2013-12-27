Ext.define('X.config.Config', {
    singleton: true,
    config: {
        // TO DO: Update these URLs when you have the UIs
        DEFAULT_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_SIGNUP_PAGE: 'user/signup',
        DEFAULT_USER_LOGIN_PAGE: 'user/login',
        DEFAULT_USER_LOGOUT_PAGE: 'user/logout',
        DEFAULT_USER_PAGE: 'user/profile/groups/feed',
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
            SAVE_SUCCESSFUL: 'Your changes were successfully saved.'
        },
        CUSTOMER_SERVICE_EMAIL_ADDRESS: 'test@test.com',
        DEBUG: true,
        BOOTUP_DEBUG: false,
        DETAILED_DEBUG: false
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    },
    isWebApp: function() {
        if (document.URL.indexOf('http') !== -1) {
            return true;
        }
        return false;
    }

});