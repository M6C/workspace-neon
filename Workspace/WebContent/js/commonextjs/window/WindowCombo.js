Ext.define('Workspace.common.window.WindowCombo', {
// Warning : Ext.window.MessageBox is ASYNCHRONOUS. Showing a MessageBox will NOT cause the code to stop.
    extend: 'Ext.window.MessageBox',
    initComponent: function () {
            var me = this;
            me.callParent();

            var index = me.promptContainer.items.indexOf(me.textField);
            me.promptContainer.remove(me.textField); 
            me.textField = me._createComboBoxField();
            me.textField.msgButtons = me.msgButtons;
            me.promptContainer.insert(index, me.textField);
    },
    _createComboBoxField: function () {
        var me = this;
        var data = me.value;

        var store = Ext.create('Ext.data.ArrayStore', {
            fields: [{name: 'text',  convert: function(value, record) {
                return record.raw;
            }}],
            data: data
        });

        var combo = Ext.create('Ext.form.field.ComboBox', {
            id: me.id + '-combo',
            typeAhead: true,
    		width:230,
            displayField: 'text',
            valueField: 'text',
            store: store,
            autoSelect: true,
            minChars: 1,
            enableKeyEvents: true,
            editable: false,
            listeners: {
                specialkey: function(field, e) {
                    var val = field.getValue();
                    if (e.getKey() === e.ENTER && !Ext.isEmpty(val)) {
                        var element = field.msgButtons.ok;
                        element.fireEvent('click',element.fireHandler());
                        e.stopEvent();
                    } else if (e.getKey() === e.ESC) {
                        var element = field.msgButtons.cancel;
                        element.fireEvent('click',element.fireHandler());
                        e.stopEvent();
                    }
                }
            },
            callback: me.callback
        });

        if (Ext.isDefined(me.comboConfig)) {
            Ext.apply(combo, me.comboConfig);
        }

        return combo;
    }
}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowCombo');});