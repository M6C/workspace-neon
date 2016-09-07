Ext.define('Workspace.common.grid.data.StoreFileExplorer', {
	// REQUIRED

	extend: 'Ext.data.Store'
	,
    clearOnLoad: true,
	autoSync: true
	,
	constructor: function(config) {
		//modify config in some way

		//Defini le proxy dans le constructeur pour avoir autant d'instance que de Store
		config.proxy = Ext.create('Ext.data.proxy.Ajax', {
	        url: '/WorkSpace/action.servlet?event=JsonFileExplorer',
			method: 'GET',
	        reader: {
	            type: 'json'
	        },
	        extraParams: {
	        	application: '',
	        	path: ''
	        }
	    });
		this.superclass.constructor.call(this, config);
	}
	,
	root: {
        nodeType: 'async',
        draggable: false,
        id: 'root',
	    expanded: true,
	    text: 'Current'
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.grid.data.StoreFileExplorer');});
