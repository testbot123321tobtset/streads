Ext.define('X.controller.mixin.Common', {
    // Options format:
    // {
    //      operation: <operation object>,
    //      model: <model>,
    //      message: string (optional),
    //      fn: function (optional – this will be sent as a callback to the window UX if any)
    // }
    // Name of the function responsible for generating user feedback gets generated using the following format:
    // generate<title-cased model name><title-cased 'Successfully'/'Failed' depending on whether operation was successful><title-cased action name in past tense e.g. 'Destroyed' for destroy function>Window
    commitOrRejectModelAndGenerateUserFeedbackOnSavingModel: function(options) {
        var me = this;
        if (me.getDebug()) {
            console.log('Debug: X.controller.mixin.Factory: commitOrRejectModelAndGenerateUserFeedbackOnSavingModel(): Options: ');
            console.log(options);
            console.log('Debug: Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
        }
        var silent = (Ext.isObject(options) && Ext.isBoolean(options.silent)) ? options.silent : false;
        var model = Ext.isObject(options.model) ? options.model : false,
                modelFullClassName = model.modelName,
                modelName = modelFullClassName.substr(modelFullClassName.lastIndexOf('.') + 1);
        var operation = Ext.isObject(options.operation) ? options.operation : false;
        if(operation && model) {
            var action = operation.getAction(),
                    camelizedActionName = action.title(),
                    actionNameInPastTense = (camelizedActionName === 'Destroy') ? (camelizedActionName + 'ed') : (camelizedActionName + 'd');
            var wasSuccessful = operation.wasSuccessful(),
                    successfullyOrFailedString = wasSuccessful ? 'Successfully' : 'Failed';
            var generateWindowFunctionName = 'generate' + modelName + successfullyOrFailedString + actionNameInPastTense + 'Window';
            if (me.getDebug()) {
                console.log('Debug: X.controller.mixin.Factory: commitOrRejectModelAndGenerateUserFeedbackOnSavingModel(): action: ' + action + ', wasSuccessful: ' + wasSuccessful + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
                console.log('Debug: X.controller.mixin.Factory: Might call function name: ' + generateWindowFunctionName + ': Timestamp: ' + Ext.Date.format(new Date(), 'H:i:s'));
            }
            // Actually do stuff
            // For instance, this will fire destroyedgroup
            Ext.Viewport.fireEvent((actionNameInPastTense + modelName).toLowerCase(), options);
            if(wasSuccessful) {
                model.commit();
            }
            else {
                model.reject();
            }
            !silent && me[generateWindowFunctionName].call(me, options);
        }
        return me;
    }
});
