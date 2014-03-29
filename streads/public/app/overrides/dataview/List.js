Ext.define('overrides.dataview.List', {
    override: 'Ext.dataview.List',
    config: {
        listeners: [
            {
                fn: 'onDisclose',
                event: 'disclose'
            }
        ]
    },
    onDisclose: function(me, record, target, index, e, eOpts) {
        var isSelected = me.isSelected(record);
        if(isSelected) {
            me.deselect(record);
        }
        else {
            var selectedRecords = me.getSelection();
            selectedRecords.push(record);
            me.select(selectedRecords);
        }
    }
});