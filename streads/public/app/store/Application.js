Ext.define('X.store.Application', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.util.DelayedTask'
    ],
    config: {
        autoLoad: false,
        mustBeEmptiedOnApplicationShutDown: true,
        listeners: {
            beforeload: function(store, operation, options) {
                this.onBeforeLoad(store, operation, options);
            },
            load: function(store, records, successful, options) {
                this.onLoad(store, records, successful, options);
            }
        }
    },
    onBeforeLoad: function() {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onBeforeLoad(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        return me;
    },
    onLoad: function() {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': onLoad(): Found ' + (me.getAllCount() || 'no') + ' records: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }

        if (me.mustBeEmptiedOnApplicationShutDown && !me.isLoaded()) {
            X.storesToBeEmptiedOnApplicationShutdown.push(me);
        }
        return me;
    },
    // Assumes that the store is either loading or has already loaded
    // This will not attempt to load a store if found to be otherwise
    waitWhileLoadingAndCallbackOnLoad: function(callbackOnLoad) {
        var me = this;
        if (me.isLoading()) {
            if (X.config.Config.getDEBUG()) {
                console.log('Debug: X.store.Application: ' + me.getStoreId() + ': waitWhileLoadingAndCallbackOnLoad(): Is running because this store is still loading');
            }
            me.runTask({
                fn: function() {
                    if (X.config.Config.getDEBUG()) {
                        console.log('Debug: X.store.Application: ' + me.getStoreId() + ': waitWhileLoadingAndCallbackOnLoad(): Will now execute callback function');
                    }
                    me.executeCallback(callbackOnLoad);
                },
                condition: function() {
                    return me.isLoaded();
                },
                delay: 100,
                scope: me
            });
            return me;
        }
        else if (me.isLoaded()) {
            if (X.config.Config.getDEBUG()) {
                console.log('Debug: X.store.Application: ' + me.getStoreId() + ': waitWhileLoadingAndCallbackOnLoad(): Will not run because this store has already loaded once');
            }
            return false;
        }
    },
    executeCallback: function(callback) {
        var me = this;
        callback = Ext.isObject(callback) ? callback : false;
        if (callback) {
            var callbackFn = Ext.isFunction(callback.fn) ? callback.fn : false;
            if (callbackFn) {
                var callbackScope = Ext.isObject(callback.scope) ? callback.scope : me;
                return callbackFn.call(callbackScope);
            }
        }
        return false;
    },
    /*
     * task is of the format:
     * {
     *      fn: function,
     *      scope: object,
     *      delay: number
     * }
     */
    runTask: function(task) {
        var me = this;
        task = Ext.isObject(task) ? task : false;
        if (task) {
            var taskFn = Ext.isFunction(task.fn) ? task.fn : false;
            var taskCondition = Ext.isFunction(task.condition) ? task.condition : false;
            if (taskFn && taskCondition) {
                var taskScope = Ext.isObject(task.scope) ? task.scope : me;
                var taskDelay = Ext.isNumber(task.delay) ? task.delay : 100;
                Ext.create('Ext.util.DelayedTask', function() {
                    if (!taskCondition()) {
                        if (X.config.Config.getDEBUG()) {
                            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': runTask(): Is running');
                        }
                        me.runTask(task);
                    }
                    else {
                        if (X.config.Config.getDEBUG()) {
                            console.log('Debug: X.store.Application: ' + me.getStoreId() + ': runTask(): Has stopped running');
                        }
                        taskFn.call(taskScope)
                    }
                }, taskScope).delay(taskDelay);
            }
        }
    }
});
