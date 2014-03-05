Ext.define('overrides.Component', {
    override: 'Ext.Component',
    // http://docs.sencha.com/touch/2.3.0/#!/api/Ext.Component-method-setRecord
    setRecordRecursive: function(record) {
        var me = this;
        if (typeof me.setRecord === 'function') {
            me.setRecord(record);
        }
        if (typeof me.getItems === 'function') {
            me.getItems().
                    each(function(item) {
                        me.setRecordRecursive.apply(item, [
                            record
                        ]);
                    });
        }
    },
    setDimensionsToFillScreen: function() {
        var me = this;
        var referenceComponent = Ext.Viewport;
        if(Ext.isObject(referenceComponent)) {
            var referenceComponentSize = referenceComponent.getSize();
            var referenceComponentWidth = referenceComponentSize.width;
            var referenceComponentHeight = referenceComponentSize.height;
            
            me.setWidth(referenceComponentWidth);
            me.setHeight(referenceComponentHeight);
            return me;
        }
        return false;
    },
    //    This is not being used right now. If used, this will have every window-like element 
    //    render with an offset from the sides and the window itself with a drop shadow to
    //    give the user a sense of spatial context
    setDimensionsBasedOnDepthOffsetRelativeToGivenComponentAdjustingForLayer: function(referenceComponent) {
        var me = this;
        referenceComponent = Ext.isObject(referenceComponent) ? referenceComponent : Ext.Viewport;
        if(Ext.isObject(referenceComponent) && Ext.isNumber(me.getLayer())) {
            var myLayer = me.getLayer();
            var referenceComponentSize = referenceComponent.getSize();
            var referenceComponentWidth = referenceComponentSize.width;
            var referenceComponentHeight = referenceComponentSize.height;
            var layerHorizontalOffset = X.config.Config.getLAYER_HORIZONTAL_OFFSET();
            var layerVerticalOffset = X.config.Config.getLAYER_VERTICAL_OFFSET();
            
            me.setWidth(referenceComponentWidth - (2 * myLayer * layerHorizontalOffset));
            me.setLeft(myLayer * layerHorizontalOffset);
            me.setRight(myLayer * layerHorizontalOffset);
            
            me.setHeight(referenceComponentHeight - (myLayer * layerVerticalOffset));
            me.setTop(myLayer * layerVerticalOffset);
            
            return me;
        }
        return false;
    },
    //    This is not being used right now
    setBlurredBackgroundForDepth: function() {
        var me = this;
        Ext.each(Ext.Viewport.query('corecontainer'), function(thisCoreContainer) {
            if (thisCoreContainer.getId() !== me.getId() && !thisCoreContainer.isHidden() && thisCoreContainer.getZIndex() < me.getZIndex()) {
                thisCoreContainer.addCls('blurred-background');
            }
        });
        Ext.each(Ext.Viewport.query('tabpanel'), function(thisTabPanel) {
            if (!thisTabPanel.isHidden() && thisTabPanel.getZIndex() < me.getZIndex()) {
                thisTabPanel.addCls('blurred-background');
            }
        });
        return me;
    },
    resetBlurredBackgroundForDepth: function() {
        var me = this;
        Ext.each(Ext.Viewport.query('corecontainer'), function(thisCoreContainer) {
            thisCoreContainer.removeCls('blurred-background');
        });
        Ext.each(Ext.Viewport.query('tabpanel'), function(thisTabPanel) {
            thisTabPanel.removeCls('blurred-background');
        });
        return me;
    }
});