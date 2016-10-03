Ext.define('Workspace.editorjava.window.completion.tree.data.StoreCompletionMemory', {

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'memory'
        ,
		reader: {
//			root: 'data',
            type: 'json'
        }
    }
	,
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'root'
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.data.StoreCompletionMemory');});
