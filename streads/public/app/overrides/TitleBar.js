Ext.define('overrides.TitleBar', {
    override: 'Ext.TitleBar',
    config: {
        height: 50,
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            }
        ]
    },
    onInitialize: function(me) {
        me.element.on('swipe', function(event) {
            if (event.direction === 'down') {
                me.up('corecontainer').
                        hide({
                            type: 'slideOut',
                            direction: 'down',
                            easing: 'cubic-bezier(0,.23,0,1)',
                            duration: 800
                        });
            }
        });
    }
});