// http://docs.sencha.com/touch/2.3.0/#!/api/Ext.Component-method-setRecord
Ext.define('overrides.Component', {
    override: 'Ext.Component',
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
    }
});