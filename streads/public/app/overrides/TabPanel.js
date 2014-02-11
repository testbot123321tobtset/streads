Ext.define('overrides.TabPanel', {
    override: 'Ext.TabPanel',
    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'fade',
                duration: 300
            }
        }
    }
});