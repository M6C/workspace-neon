Ext.define('Workspace.filebrowser.grid.fileexplorer.function.CopyMove',  {

	statics: {

		call : function(grid, itemPathDst, data) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.call CopyMove');

		    var me = this;
		    var ret = me.check(grid, itemPathDst, data);
		    if (ret) {
		    	me.request(grid, itemPathDst, data);
		    }
	    	
	    	return ret;
		}
		,
		check : function(grid, itemPathDst, data) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check CopyMove');

		    var ret = true;

			var dropAction = data.copy ? 'copy' : 'move';
		    if (!Ext.isEmpty(itemPathDst)) {
			    var nb = data.records.length;
			
			    console.info('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check CopyMove to:'+itemPathDst+' data.records.length:'+data.records.length);
			
			    for(i=0 ; i<nb ; i++) {
					var raw = data.records[i].raw;//data.records[i].data;
					var itemPathSrc = raw.id;//raw.getKey();
	
					console.info('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check CopyMove itemPathSrc:'+itemPathSrc);
			
				    if (Workspace.tool.UtilString.isNotEqualPath(itemPathDst, itemPathSrc)) {
				    	console.info('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check success ' + dropAction + ' from:'+itemPathSrc+ ' to:'+itemPathDst);
				    }
				    else {
				    	var text = 'No ' + dropAction + ' because destination path and source path can not be same. from:'+itemPathSrc + ' to:'+itemPathDst;
				        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check', 'error', text);
				        ret = false;
				    }
				}
            }
            else {
		        var text = 'No ' + dropAction + ' because ne destination panel find.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check', 'error', text);
            }
	    	
	    	return ret;
		}
		,
		request : function(grid, itemPathDst, data) {
		    var ret = false;
			
		    var nb = data.records.length;
			
			var dropAction = data.copy ? 'copy' : 'move';
		    console.info('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.request ' + dropAction + ' to:'+itemPathDst+' data.records.length:'+data.records.length);

		    for(i=0 ; i<nb ; i++) {
				var raw = data.records[i].raw;//data.records[i].data;
				var itemPathSrc = raw.id;//raw.getKey();

		        Ext.Ajax.request({
	    		    url: DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserCopyMove',
	    		    params: {
	        			pathSrc:itemPathSrc, pathDst:itemPathDst, operation:dropAction
	    		    },
	    		    success: function(response){
	    		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.request', 'success', 'Success ' + dropAction+' from:'+itemPathSrc + ' to:'+itemPathDst);
	
	    				// Rechargement de la grid
//	    		    	grid.refresh();
	    		    	grid.getStore().load();

	    		    	var mainEstPanel = Ext.getCmp('mainEstPanel');
	    		        var mainEstTab = mainEstPanel.getActiveTab();
	    		        var mainEstGrid = mainEstTab.items.items[0].panel;
	    		        var mainEstStore = mainEstGrid.store;
	    		        var dataModel = mainEstStore.data.getByKey(raw.id);
	
	    		        // Supprime une donn�e
	    		        //mainEstGrid.data.removeAtKey(raw.id);//item.getKey());
			        	// Raffaichissement du store et donc de la grid
			        	mainEstStore.remove(dataModel);
	
			        	ret = true;
	    		    },
	    		    failure: function(response){
	    		    	raw.bodyStyle='background:#fcc;';
	
	    		    	var text = response.responseText;
				        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.request', 'failure', 'Failure ' + dropAction + ' item:'+raw.id+' cause:'+text);
	    		    }
	    		});
		    }
	    	
	    	return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.fileexplorer.function.CopyMove');});