Ext.define('Workspace.editorjava.window.completion.tree.data.StoreCompletion', {

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
			console.info('<-666->Workspace.editorjava.window.completion.tree.data.StoreCompletion beforeload');//:'+operation.node.internalId);
			var filename = store.filename + "." + Date.now() + ".tmp";

			store.getProxy().extraParams.application = Ext.getCmp('project').value;
			store.getProxy().extraParams.filename = filename;
			store.getProxy().extraParams.caretPos = store.pos;
			store.getProxy().extraParams.deleteFile = 'true';

			var application = Ext.getCmp('project').value;
			Ext.create('Workspace.editorjava.request.JsonEditSaveFile',
			{
				params:{filename:filename,content:store.txt},
				application:application,
    			callback:function(opts, success, response) {
    				store.txt = "";
    				var data = response.responseText;
					store.data = data;
					store.sync();
				}
			}).request(this);
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
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.data.StoreCompletion');});
