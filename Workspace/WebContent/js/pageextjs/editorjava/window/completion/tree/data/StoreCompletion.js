Ext.define('Workspace.editorjava.window.completion.tree.data.StoreCompletion', {
	// REQUIRED

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
		method: 'GET',
        reader: {
            type: 'json'
        }
    }
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion beforeload:'+operation.node.internalId);
			store.getProxy().extraParams.caretPos = store.pos;
			store.getProxy().extraParams.source = store.txt;
	    }
//		,
//		'expand' : function(node, eOpts) {
//			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion expand');
//		}
//		,
//		'load' : function(store, node, records, successful, eOpts) {
//			console.info('Workspace.editorjava.window.completion.tree.data.StoreCompletion load');
//		}
	}
	,
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'root'
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.data.StoreCompletion');});
