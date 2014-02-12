Ext.define('overrides.TabPanel', {
    override: 'Ext.TabPanel',
    config: {
        layout: {
            type: 'card',
            animation: {
                type: 'pop',
                duration: 300
            }
        }
    }
});