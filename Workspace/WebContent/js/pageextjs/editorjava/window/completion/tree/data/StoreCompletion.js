Ext.define('Workspace.editorjava.window.completion.tree.data.StoreCompletion', {
	// REQUIRED

	extend: 'Ext.data.TreeStore'
	,
    clearOnLoad: true,
	autoLoad: true,
	autoSync: true
//	,
//    proxy: {
//        type: 'ajax',
//        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
//		method: 'GET',
//        reader: {
//            type: 'json'
//        }
//    }
	,
	proxy: {
        type: 'memory',
    	reader: {
            type: 'json',
        }
    }
	,
	constructor: function(config) {
		console.info('<-666->Workspace.editorjava.request.JsonEditSaveAndCompletion constructor');
		var application = Ext.getCmp('project').value;
		Ext.create('Workspace.editorjava.request.JsonEditSaveAndCompletion',
		{
			params:{filename:config.filename,content:config.txt,caretPos:config.pos},
			store:this,
			application:application
		}).request(this);
	}
	,
    listeners:{
	    //scope: this, //yourScope
	    'beforeload': function(store, operation, options) {
			console.info('<-666->Workspace.editorjava.window.completion.tree.data.StoreCompletion beforeload');//:'+operation.node.internalId);
//			store.getProxy().extraParams.caretPos = store.pos;
//			store.getProxy().extraParams.source = store.txt;

//			var application = Ext.getCmp('project').value;
//			Ext.create('Workspace.editorjava.request.JsonEditSaveAndCompletion',
//			{
//				params:{filename:store.filename,content:store.txt,caretPos:store.pos},
//				store:store,
//				application:application
//			}).request(this);
//			var application2 = Ext.getCmp('project').value;
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
