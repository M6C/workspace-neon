Ext.define('Workspace.common.draganddrop.event.OnDropExplorer',  {
	requires: ['Workspace.common.draganddrop.function.CopyMove']
	,
	statics: {

		call : function(grid, node, data, overModel, dropPosition, eOpts) {
		    console.info('Workspace.common.draganddrop.event.OnDropExplorer.call OnDropExplorer');
		    var me = Workspace.common.draganddrop.event.OnDropExplorer;

		    var nb = data.records.length;
		    var itemPathSrc = nb + ' files';
		    if (nb == 1) {
			    var itemPathSrc = 'from:' + data.records[0].internalId;//raw.id;//raw.getKey();
		    }
		    var itemPathDst = node.viewRecordId;//mainCenterTab.id;
			var dropAction = data.copy ? 'copy' : 'move';
        	Ext.Msg.confirm('Confirm', dropAction + ' ' + itemPathSrc + ' to:' + itemPathDst + ' ?', function(btn, text){
        	    if (btn == 'yes'){
        		    Workspace.common.draganddrop.function.CopyMove.request(grid, node, data, me.callBackSuccess, me.callBackFailure);
        	    } else {
        	        me.callBackSuccess(grid, node, data);
        	        return false;
        	    }
        	});

		    return true;
		}
		,
		callBackSuccess(grid, node, data) {
			var treeviewDirectory = grid;
			var treeDirectory = treeviewDirectory.ownerCt;
			Ext.each(treeviewDirectory.all.elements, function(element) {
				Ext.each(data.records, function(record) {
					if (record.internalId == element.viewRecordId) {
			        	element.remove(true);
			        	var d = treeviewDirectory.store.data.get(element.viewRecordId);
			        	treeviewDirectory.store.data.remove(d);
					}
				});
			});
			treeviewDirectory.store.sync();
	    	treeviewDirectory.refresh();

//			Ext.each(data.records, function(record) {
//	        	var d = treeviewDirectory.store.data.get(record.viewRecordId);
//	        	treeviewDirectory.store.data.remove(d);
//			});
//			treeviewDirectory.store.sync();
//	    	treeviewDirectory.refresh();

//	    	treeDirectory.getRootNode().removeAll();
//	    	treeDirectory.setRootNode(Ext.data.NodeInterface.create({
//	            nodeType: 'async',
//	            draggable: false,
//	            id: 'root',
//	    	    expanded: true,
//	    	    text: 'Current'
//	    	}));
//	    	treeDirectory.getStore().load();

//			var treeParams = treeDirectory.getStore().getProxy().extraParams;
//	    	treeDirectory.getStore().load(new Ext.data.Operation({
//	    		action : 'read',
//	    		params: treeParams
//	    	}));

////	    var nb = data.records.length;
////	    for(i=0 ; i<nb ; i++) {
////			var record = data.records[i];
////	    	treeDirectory.remove(record.id);
////	    	treeDirectory.remove(record.internalId);
////	    }
//	    	treeDirectory.remove(node.id);
//	    	treeDirectory.remove(node.internalId);


//		    var nb = data.records.length;
//		    for(i=0 ; i<nb ; i++) {
//				var record = data.records[i];
//				var raw = record.raw;
//	
//				var mainEstPanel = Ext.getCmp('mainEstPanel');
//		        var mainEstTab = mainEstPanel.getActiveTab();
//		        var mainEstGrid = mainEstTab.items.items[0].panel;
//		        var mainEstStore = mainEstGrid.store;
//		        var dataModel = mainEstStore.data.getByKey(raw.id);
//	
//		        // Supprime une donnee
//		        //mainEstGrid.data.removeAtKey(raw.id);//item.getKey());
//	        	// Raffaichissement du store et donc de la grid
//	        	mainEstStore.remove(dataModel);
//		    }
		}
		,
		callBackFailure(grid, node, data) {
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.draganddrop.event.OnDropExplorer');});