Ext.define('overrides.TabPanel', {
    override: 'Ext.TabPanel',
    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'slide',
                //easing: 'ease-in',
                duration: 300
            }
        },
        showAnimation: {
            type: 'slideIn',
            //easing: 'ease-in',
            duration: 300
        },
        hideAnimation: {
            type: 'slideOut',
            //easing: 'ease-out',
            duration: 300
        }
    }
});