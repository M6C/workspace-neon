Ext.define('Workspace.common.tree.data.StoreFileExplorerExtjs4', {
	// REQUIRED

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
	,
    proxy: {
        type: 'ajax',
        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonFileExplorer',
		method: 'GET',
        reader: {
            type: 'json'
        }
    }
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
			if (!operation.node.isRoot()) {
				console.info('Workspace.common.tree.data.StoreFileExplorerExtjs4 beforeload:'+operation.node.internalId);
				store.getProxy().extraParams.path = operation.node.internalId;
			}
	    }
	}
	,
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'Current'
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.tree.data.StoreFileExplorerExtjs4');});
