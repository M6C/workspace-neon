Ext.define('Workspace.common.plugin.addTabNew.function.New',  {
	requires: ['Workspace.common.tool.Pop']
   	,
	statics: {

		call : function(typeNew) {
		    console.info('Workspace.common.plugin.addTabNew.function.New.call');

		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		    var item = mainCenterPanel.getSelectedItem();

		    if (!Ext.isDefined(item) || !Ext.isDefined(item.raw)) {
    	        var text = 'No item find.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.common.plugin.addTabNew.function.New', 'error', text);
				Workspace.common.tool.Pop.info(text);
		        return;
		    }
        	if (item.raw.contentType != 'directory') {
    	        var text = 'Selected item is not a directory.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.common.plugin.addTabNew.function.New', 'error', text);
				Workspace.common.tool.Pop.info(text);
		        return;
        	}

	        var itemPathDst = item.raw.path;
            if (Ext.isEmpty(itemPathDst)) {
    	        var text = 'No destination panel find.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.common.plugin.addTabNew.function.New', 'error', text);
				Workspace.common.tool.Pop.info(text);
		        return;
            }

        	Ext.Msg.prompt('Create directory in \''+itemPathDst+'\'', 'Please enter a name:', function(btn, text){
        	    if (btn == 'ok' && text != ''){
    		        var fileName = text;
    		    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=FileBrowserNew';
    	  			Ext.Ajax.request({
    	  			   url: requestUrl,
    	  			   params: {type:typeNew, pathDst:itemPathDst, name:fileName},
    	  			   success: function(result, request){
    	  				   Ext.getCmp('mainSouthPanel').log('Workspace.common.plugin.addTabNew.function.New', 'success', 'Success creating \''+text+'\' in \''+itemPathDst+'\'');

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
    	  				   Ext.getCmp('mainSouthPanel').log('Workspace.common.plugin.addTabNew.function.New', 'failure', 'Error creating \''+text+'\' reason:\''+message+'\'');
    	  			   }
    	  			});
        	    }
        	});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.plugin.addTabNew.function.New');});