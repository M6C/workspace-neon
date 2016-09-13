Ext.define('Workspace.filebrowser.plugin.addTabNew.function.New',  {
	// REQUIRED

	statics: {

		call : function(typeNew) {
		    console.info('Workspace.filebrowser.plugin.addTabNew.function.New.call');

		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
	        var mainCenterTab = mainCenterPanel.getActiveTab();

            if (!Ext.isEmpty(mainCenterTab)) {
	            var itemPathDst = mainCenterTab.id;
	        	Ext.Msg.prompt('Create directory in \''+itemPathDst+'\'', 'Please enter a name:', function(btn, text){
	        	    if (btn == 'ok' && text != ''){
	    		        var fileName = text;
	    		    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserNew';
	    	  			Ext.Ajax.request({
	    	  			   url: requestUrl,
	    	  			   params: {type:typeNew, pathDst:itemPathDst, name:fileName},
	    	  			   success: function(result, request){
	    	  				   Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.plugin.addTabNew.function.New', 'success', 'Success creating \''+text+'\' in \''+itemPathDst+'\'');

	    	  				   // Rechargement de la grid
	    	  				   var grid = mainCenterTab.items.items[0];
	    	  				   grid.refresh();

	    	  				   // Rechargement du tree si besoin
	    	  				   var application = Ext.getCmp('project').value;
	    	  				   if ('['+application+']'==itemPathDst) {
	    	  						var tree = Ext.getCmp("treeDirectory");
	    	  						tree.getStore().load(
    	  								new Ext.data.Operation({
    	  									action:'read'
    	  								})
    	  							);
	    	  				   }
	    	  			   },
	    	  			   failure: function (result, request) {
	    		  			   var jsonData = Ext.decode(result.responseText);
	    		  			   var message = jsonData.message;
	    	  				   Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.plugin.addTabNew.function.New', 'failure', 'Error creating \''+text+'\' reason:\''+message+'\'');
	    	  			   }
	    	  			});
	        	    }
	        	});
            }
            else {
    	        var text = 'No destination panel find.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.plugin.addTabNew.function.New', 'error', text);
            }
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.plugin.addTabNew.function.New');});