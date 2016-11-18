Ext.define('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove', {
	extend: 'Workspace.poc.draganddrop.common.function.ApplyDragAndDrop'
	,
	statics: {

		apply : function(cmp, onBeforeDrop, onDrop) {
		    console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove apply');

		    var me = Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove;

		    Ext.Loader.syncRequire('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop');
			Workspace.poc.draganddrop.common.function.ApplyDragAndDrop.apply(cmp, me.onBeforeDrop, me.onDrop);
		}
		,
		onBeforeDrop : function(cmp, node, data) {
			console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onBeforeDrop');

//			Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer');
//		    return Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call(cmp, node, data);
		}
		,
		onDrop : function(cmp, node, data, overModel, dropPosition, option) {
			console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onDrop');

//		    Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnDropExplorer');
//		    var ret = Workspace.filebrowser.grid.fileexplorer.OnDropExplorer.call(cmp, node, data, overModel, dropPosition, option);
			var ret = true;

//		    if (ret) {
//		    	overModel.store.load();
//		    }

			var treeDirectory = Ext.getCmp('treeDirectory');
	    	treeDirectory.getRootNode().removeAll();
//	    	treeDirectory.setRootNode(Ext.data.NodeInterface.create({
//	            nodeType: 'async',
//	            draggable: false,
//	            id: 'root',
//	    	    expanded: true,
//	    	    text: 'Current'
//	    	}));
	    	treeDirectory.getStore().load();

//			var treeParams = treeDirectory.getStore().getProxy().extraParams;
//	    	treeDirectory.getStore().load(new Ext.data.Operation({
//	    		action : 'read',
//	    		params: treeParams
//	    	}));

////		    var nb = data.records.length;
////		    for(i=0 ; i<nb ; i++) {
////				var record = data.records[i];
////		    	treeDirectory.remove(record.id);
////		    	treeDirectory.remove(record.internalId);
////		    }
//	    	treeDirectory.remove(node.id);
//	    	treeDirectory.remove(node.internalId);


//		    var application = Ext.getCmp('project').value;
//			var tree = Ext.getCmp("treeDirectory");
//			tree.removeAll();
//			tree.getStore().getProxy().extraParams.path = tree.getStore().getProxy().extraParams.path;
//			tree.getStore().getProxy().extraParams.application = application;//Ext.getCmp('project').value;//record.data.project;
//			tree.getStore().getProxy().extraParams.contentType = 'directory';
//			tree.getStore().load();
//			tree.getView().refresh();
//			tree.getView().getStore().load();

		    return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove');});