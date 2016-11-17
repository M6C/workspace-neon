Ext.define('Workspace.poc.draganddrop.data.StoreFileExplorer', {

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
		,
        extraParams: {
        	application: '',
        	path: ''
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
}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.data.StoreFileExplorer');});
