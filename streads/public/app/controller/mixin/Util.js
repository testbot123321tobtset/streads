Ext.define('X.controller.mixin.Util', {
    /*
     * Other common functions
     */
    resetAuthenticatedEntity: function() {
        X.isUser = false;
        X.authenticated = false;
        X.authenticatedEntity = false;
        return this;
    },
    /*
     * Application related
     */
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
     *      condition: function,
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
                var taskLimit = Ext.isNumber(task.limit) ? task.limit : 10000;
                var noOfTimesToBeRun = taskLimit / taskDelay;
                var count = 0;
                Ext.create('Ext.util.DelayedTask', function() {
                    if (!taskCondition() && count < noOfTimesToBeRun) {
                        if (X.config.Config.getDEBUG()) {
                            console.log('Debug: X.store.Application: runTask(): Is running: Run # - ' + count + ', Runs left - ' + (noOfTimesToBeRun - count));
                        }
                        me.runTask(task);
                    }
                    else {
                        if (X.config.Config.getDEBUG()) {
                            console.log('Debug: X.store.Application: runTask(): Has stopped running: Run # - ' + count + ', Runs left - ' + (noOfTimesToBeRun - count));
                        }
                        taskFn.call(taskScope)
                    }
                    count++;
                }, taskScope).delay(taskDelay);
            }
        }
    },
    isMongoDbObjectId: function(string) {
        // Regular expression that checks for hex value
        var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
        if (Ext.isString(string) && string !== '') {
            return checkForHexRegExp.test(string);
        }
        return false;
    },
    /*
     * UI related
     */
    /*
     * Typically, we have a large number of dynamic views. If we were to keep all of them rendered
     * we'd risk causing the browser to run out of memory, especially on older devices. If we destroy them as
     * soon as we're done with them, the app can appear sluggish. Instead, we keep a small number of rendered
     * views in a viewCache so that we can easily reuse recently used views while destroying those we haven't
     * used in a while.
     */
    createView: function(item) {
        var xtype = item.xtype,
                cache = Ext.isArray(X.viewCache) ? X.viewCache : [],
                ln = cache.length,
                limit = 10,
                view, i = 0, j, oldView;

        for (; i < ln; i++) {
            if (cache[i].xtype === xtype) {
                if (X.config.Config.getDEBUG()) {
                    console.log('Debug: X.controller.mixin.Util.createView(): View fetched from view cache: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                return cache[i];
            }
        }
        
        if (ln >= limit) {
            for (i = 0, j = 0; i < ln; i++) {
                oldView = cache[i];
                if (!oldView.isPainted()) {
                    oldView.destroy();
                } else {
                    cache[j++] = oldView;
                }
            }
            cache.length = j;
        }
        
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: INTENSIVE OPERATION WARNING: X.controller.mixin.Util.createView(): View not found in view cache. Will create now. Requested xtype - ' + xtype + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        view = Ext.create('widget.' + xtype);
        cache.push(view);
        if (X.config.Config.getDEBUG()) {
            view.on('painted', function() {
                console.log('Debug: ' + xtype + '.painted: ' + Ext.Date.format(new Date(), 'H:i:s'));
            });
        }
        
        X.viewCache = cache;

        return view;
    },
    destroyGivenView: function(options) {
        var me = this;
        
        var cache = X.viewCache;
        var cacheLength = cache.length;
        if(Ext.isObject(options) && Ext.isArray(cache) && cacheLength > 0) {
            var view = Ext.isObject(options.view) ? options.view : false;
            if (Ext.isObject(view)) {
                var id = view.getId();
                var cacheCounter = 0;
                while(cacheCounter < cacheLength) {
                    var thisViewFromCache = cache[cacheCounter];
                    if(id === thisViewFromCache.getId()) {
                        if (X.config.Config.getDEBUG()) {
                            console.log('Debug: X.controller.mixin.Util.destroyGivenView(): View with id: ' + id + ' will be removed from cache and destroyed: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                        }
                        cache = Ext.Array.remove(cache, thisViewFromCache);
                        X.viewCache = cache;
                        thisViewFromCache.destroy();
                        break;
                    }
                    cacheCounter++;
                }
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
        
        return me;
    },
    /*
     * Iterate over all of the floating sheet components and make sure they're hidden when we
     * navigate to a new view. This stops things like Picker overlays staying visible when you hit
     * the browser's back button
     */
    hideSheets: function() {
        Ext.each(Ext.ComponentQuery.query('sheet, #editorPanel'), function(sheet) {
            if (sheet instanceof Ext.Menu) {
                Ext.Viewport.hideMenu(sheet);
            } else {
                sheet.setHidden(true);
            }
        });
    },
    hideAllWindows: function() {
        var me = this;
        if (X.config.Config.getDEBUG()) {
            console.log('Debug: X.controller.mixin.Util.hideAllWindows(): Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        var allCores = Ext.ComponentQuery.query('corecontainer, corepanel');
        Ext.each(allCores, function(thisUi) {
            if (Ext.isFunction(thisUi.getIsWindow) && thisUi.getIsWindow()) {
                if (X.config.Config.getDEBUG()) {
                    console.log('Debug: X.controller.mixin.Util.hideAllWindows(): Querying: ' + thisUi.getXTypes() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                }
                if (!thisUi.isHidden()) {
                    if (X.config.Config.getDEBUG()) {
                        console.log('Debug: X.controller.mixin.Util.hideAllWindows(): Hiding: ' + thisUi.getXTypes() + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                    }
                    thisUi.hide(X.config.Config.getHideAnimationConfig());
                }
            }
        });
        return me;
    },
    /*
     * Utilities
     */
    getUrlHash: function() {
        return location.hash.substr(1);
    },
    isWebApp: function() {
        if (document.URL.indexOf('http') !== -1) {
            return true;
        }
        return false;
    }
});