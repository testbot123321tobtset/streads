Ext.define('X.view.core.Container', {
    extend: 'Ext.Container',
    xtype: 'corecontainer',
    autoDestroy: false,
    config: {
        listeners: [
            {
                fn: 'onShow',
                event: 'show'
            },
            {
                fn: 'onSwipeDown',
                event: 'swipedown'
            },
            {
                fn: 'onUpdateData',
                event: 'updatedata'
            }
        ]
    },
    onShow: function() {
        return this;
    },
    onSwipeDown: function(me, e) {
        me.hide(X.config.Config.getHideAnimationConfig());
        return me;
    },
    onUpdateData: function() {
        return this;
    }
});
