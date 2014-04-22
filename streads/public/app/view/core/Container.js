Ext.define('X.view.core.Container', {
    extend: 'Ext.Container',
    xtype: 'corecontainer',
    autoDestroy: false,
    config: {
        listeners: [
            {
                fn: 'onInitialize',
                event: 'initialize'
            },
            {
                fn: 'onPainted',
                event: 'painted'
            },
            {
                fn: 'onShow',
                event: 'show'
            },
            {
                fn: 'onBeforeHide',
                event: 'beforehide'
            },
            {
                fn: 'onHide',
                event: 'hide'
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
    onInitialize: function() {
        var me = this;
        me.onBefore('hide', function() {
            me.fireEvent('beforehide', me);
        });
        return me;
    },
    onPainted: function() {
        var me = this;
        return me;
    },
    onShow: function() {
        var me = this;
        return me;
    },
    onBeforeHide: function() {
        var me = this;
        return me;
    },
    onHide: function() {
        var me = this;
        return me;
    },
    onSwipeDown: function(me, e) {
        me.revertOptimizedLayeredEffect().
                hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        return me;
    },
    onUpdateData: function() {
        return this;
    },
    onBackButtonTap: function(button, e, eOpts) {
        var me = this;
        me.revertOptimizedLayeredEffect().
                hide(X.config.Config.getHIDE_ANIMATION_CONFIG());
        return me;
    },
    onDeleteButtonTap: function(button, e, eOpts) {
        return this;
    },
    revertOptimizedLayeredEffect: function() {
        var me = this;
        var querySelectorsForComponentsToBeShown = Ext.isFunction(me.getQuerySelectorsForComponentsToBeHiddenToOptimizeLayer) ? me.getQuerySelectorsForComponentsToBeHiddenToOptimizeLayer() : false;
        var querySelectorsForComponentsToBeUnblurred = Ext.isFunction(me.getQuerySelectorsForComponentsToBeBlurredToOptimizeLayer) ? me.getQuerySelectorsForComponentsToBeBlurredToOptimizeLayer() : false;
        var viewport = Ext.Viewport;
        if (Ext.isArray(querySelectorsForComponentsToBeShown) && !Ext.isEmpty(querySelectorsForComponentsToBeShown)) {
            Ext.each(querySelectorsForComponentsToBeShown, function(thisComponentQuerySelector) {
                Ext.each(viewport.query(thisComponentQuerySelector), function(thisComponent) {
                    thisComponent.show();
                });
            });
        }
        if (Ext.isArray(querySelectorsForComponentsToBeUnblurred) && !Ext.isEmpty(querySelectorsForComponentsToBeUnblurred)) {
            Ext.each(querySelectorsForComponentsToBeUnblurred, function(thisComponentQuerySelector) {
                Ext.each(viewport.query(thisComponentQuerySelector), function(thisComponent) {
                    thisComponent.removeCls('blurred-background');
                });
            });
        }
        return me;
    }
});
