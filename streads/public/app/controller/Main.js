/* 
 * This is an abstract base class that is extended by both the phone and tablet versions. This controller is
 * never directly instantiated, it just provides a set of common functionality that the phone and tablet
 * subclasses both extend.
 */
Ext.define('X.controller.Main', {
    extend: 'Ext.app.Controller',
    mixins: {
        util: 'X.controller.mixin.Util',
        factory: 'X.controller.mixin.Factory',
        page: 'X.controller.mixin.Page',
        user: 'X.controller.mixin.User'
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
    }
});
