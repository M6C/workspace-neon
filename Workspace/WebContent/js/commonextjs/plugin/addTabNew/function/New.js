Ext.define('Workspace.common.plugin.addTabNew.function.New',  {
	requires: [
	     'Workspace.common.tool.Pop'
	]
   	,
	statics: {

		call : function(typeNew) {
		    console.info('Workspace.common.plugin.addTabNew.function.New.call');

		    var me = this;
		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		    var item = mainCenterPanel.getSelectedItem();

		    if (!Ext.isDefined(item)) {
    	        var text = 'No item find.';
				Workspace.common.tool.Pop.error(me, text);
		        return;
		    }
        	if (item.contentType != 'directory') {
    	        var text = 'Selected item is not a directory.';
				Workspace.common.tool.Pop.error(me, text);
		        return;
        	}

	        var itemPathDst = null;
	        if (!Ext.isEmpty(item.path)) {
	            itemPathDst = item.path;
	        } else if (!Ext.isEmpty(item.application)) {
	            itemPathDst = '[' + item.application + ']';
	        }
            if (Ext.isEmpty(itemPathDst)) {
    	        var text = 'No destination panel find.';
				Workspace.common.tool.Pop.error(me, text);
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
    	  				   var text = 'Success creating \''+text+'\' in \''+itemPathDst+'\'';
    	  				   Workspace.common.tool.Pop.success(me, text);

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
    		  			   var text = 'Error creating reason:\''+message+'\''
    						Workspace.common.tool.Pop.failure(me, text);
    	  			   }
    	  			});
        	    }
        	});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.plugin.addTabNew.function.New');});