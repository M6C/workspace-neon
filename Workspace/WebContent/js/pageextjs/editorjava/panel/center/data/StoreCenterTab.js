Ext.define('Workspace.editorjava.panel.center.data.StoreCenterTab', {
	requires: [
  	     'Workspace.editorjava.panel.center.function.AddTabAce'
  	]
  	,
	extend: 'Ext.data.Store'
	,
	storeId : 'sessionStoreId',
	model: 'Workspace.editorjava.model.Tab',
	proxy: {
        type: 'sessionstorage',
        id  : 'sessionStorageCenterTab'
    }
	,
	autoLoad: true
	,
	listeners: {
		'load': function (store, records, successful, operation, option) {
			console.info('Workspace.editorjava.panel.center.data.StoreCenterTab load');
			var me = this;
			me._add(store, records, 0, option);
		}
		,
		'add': function (store, record, index, option) {
			console.info('Workspace.editorjava.panel.center.data.StoreCenterTab add');
			var me = this;
			me._add(store, record, index, option);
//			me.getProxy().setRecord(record);
			record = record;
		}
		,
		'remove': function (store, record, index, option) {
		}
	}
	,
	_add: function (store, records, index, option) {
		if (Ext.isArray(records)) {
			var size = records.length;
			for(var i=0 ; i<size ; i++) {
				record = records[i];
				Workspace.editorjava.panel.center.function.AddTabAce.call(record.raw);
			}
		} else {
			Workspace.editorjava.panel.center.function.AddTabAce.call(records.raw);
		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.data.StoreCenterTab');});