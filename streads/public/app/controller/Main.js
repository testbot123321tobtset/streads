/* 
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('X.controller.Main', {
    extend: 'Ext.app.Controller',
    requires: [
        'X.view.plugandplay.CameraTriggerPanel'
    ],
    mixins: {
        util: 'X.controller.mixin.Util',
        common: 'X.controller.mixin.Common',
        factory: 'X.controller.mixin.Factory',
        page: 'X.controller.mixin.Page',
        user: 'X.controller.mixin.User',
        group: 'X.controller.mixin.Group',
        deviceContact: 'X.controller.mixin.DeviceContact'
    },
    config: {
        debug: false,
        bootupDebug: false,
        detailedDebug: false,
        refs: {
        },
        control: {
        },
        routes: {
        }
    },
    init: function() {
        var me = this;
        me.setDebug(X.config.Config.getDEBUG());
        me.setBootupDebug(X.config.Config.getBOOTUP_DEBUG());
        me.setDetailedDebug(X.config.Config.getDETAILED_DEBUG());
        if (me.getDebug() && me.getBootupDebug()) {
            console.log("Debug: X.controller.Main.init()");
        }
        
        // Viewport listeners: this seems like a better way to reliably listen
        // to events on viewport compared to having these in 'control' object
        Ext.Viewport.on({
            painted: {
                fn: 'onViewportPainted',
                scope: me,
                single: true
            },
            orientationchange: {
                fn: 'onOrientationchange',
                scope: me
            }
        });
    },
    onViewportPainted: function(viewportElement, eOpts) {
        var me = this;
        me.generateCameraTriggerPanel();
        return me;
    },
    onOrientationchange: function() {
        var me = this;
        if (me.getDebug()) {
            console.log("Debug: X.controller.Main.onOrientationchange()");
        }
    }
});
