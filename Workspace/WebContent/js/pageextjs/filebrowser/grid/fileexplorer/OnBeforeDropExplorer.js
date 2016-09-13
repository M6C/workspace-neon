Ext.define('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer',  {
	// REQUIRED

	statics: {

		call : function(grid, nodeEl, data) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call OnBeforeDropExplorer');

		    var ret = true;
		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		    var mainCenterTab = mainCenterPanel.getActiveTab();

		    if (!Ext.isEmpty(mainCenterTab)) {
			    var itemPathDst = mainCenterTab.id;
			    var nb = data.records.length;
			
			    console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call OnBeforeDropExplorer to:'+itemPathDst+' data.records.length:'+data.records.length);
			
			    for(i=0 ; i<nb ; i++) {
					var raw = data.records[i].data;//data.records[i].raw;
					var dropAction = data.copy ? 'copy' : 'move';
					var itemPathSrc = raw.id;//raw.getKey();
	
					console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call OnBeforeDropExplorer itemPathSrc:'+itemPathSrc);
			
				    if (Workspace.tool.UtilString.isNotEqualPath(itemPathDst, itemPathSrc)) {

				    	console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call success move/copy to:'+itemPathDst+' from:'+itemPathSrc);
			
				        Ext.Ajax.request({
			    		    url: DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserCopyMove',
			    		    params: {
			        			pathSrc:itemPathSrc, pathDst:itemPathDst, operation:dropAction
			    		    },
			    		    success: function(response){
			    		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call', 'success', 'Success  to:'+itemPathDst+' from:'+itemPathSrc);
	
			    				// Rechargement de la grid
			    		    	grid.refresh();
	
		        		    	var mainEstPanel = Ext.getCmp('mainEstPanel');
		        		        var mainEstTab = mainEstPanel.getActiveTab();
		        		        var mainEstGrid = mainEstTab.items.items[0].panel;
			    		        var mainEstStore = mainEstGrid.store;
			    		        var dataModel = mainEstStore.data.getByKey(raw.id);

			    		        // Supprime une donn�e
			    		        mainEstGrid.data.removeAtKey(raw.id);//item.getKey());
					        	// Raffaichissement du store et donc de la grid
					        	mainEstStore.remove(dataModel);
			    		    },
			    		    failure: function(response){
			    		    	raw.bodyStyle='background:#fcc;';

			    		    	var text = response.responseText;
						        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call', 'failure', 'Failure item:'+raw.id+' cause:'+text);
			    		    }
			    		});
				    }
				    else {
				    	var text = 'No move/copy because destination path and source path can not be same. itemPathDst:'+itemPathDst+', itemPathSrc:'+itemPathSrc;
				        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call', 'error', text);
				        ret = false;
				    }
				}
            }
            else {
		        var text = 'No move/copy because ne destination panel find.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call', 'error', text);
            }
	    	
	    	return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer');});