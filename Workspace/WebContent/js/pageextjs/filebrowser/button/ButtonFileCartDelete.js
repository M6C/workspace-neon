Ext.define('Workspace.filebrowser.button.ButtonFileCartDelete', {
	// REQUIRED
	requires: ['Workspace.filebrowser.constant.ConstantImage']
	,
	extend: 'Ext.button.Button'
	,
	alias: 'widget.buttonFileCartDelete',
	alternateClassName: 'WorkspaceFilebrowserButtonFileCartDelete'
	,
    initComponent : function(){
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.filebrowser.constant.ConstantImage');

		Ext.apply(me, {
			icon: Workspace.filebrowser.constant.ConstantImage.BUTTON_CART_DELETE_URL
		});
	},
    handler: function(button, e) {
        var mainCenterPanel = Ext.getCmp('mainCenterPanel');
        var mainCenterTab = mainCenterPanel.getActiveTab();

        var mainEstPanel = Ext.getCmp('mainEstPanel');
        var mainEstTab = mainEstPanel.getActiveTab();

        if (!Ext.isEmpty(mainCenterTab)) {
            var items = Ext.isDefined(mainEstTab.data) ? mainEstTab.data.getRange() : null;
        	var len = (items==null) ? 0 : items.length;
        	if (len>0) {
	        	Ext.Msg.confirm('Delete '+len+' item(s)', 'Delete', function(btn, text){
	        	    if (btn == 'yes'){

	                	// Création d'une nouvelle collection avec recopie des data
	                	var col = new Ext.util.MixedCollection(true, 
	                		function(item) {
	                			return item.id;//item.getKey();
	                		});
	                	col.addAll(mainEstTab.data.getRange());

	                	col.each(function (item, index, length) {

		                	var fileName = item.id;
		    		        console.info('Workspace.filebrowser.button.ButtonFileCartDelete success delete:'+fileName);

		                	var requestUrl = '/WorkSpace/action.servlet?event=FileBrowserDelete';
		    	  			Ext.Ajax.request({
		    	  			   url: requestUrl,
		    	  			   params: {fileName:fileName},
		    	  			   success: function(result, request){
		    	  				   Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.button.ButtonFileCartDelete', 'success', 'Success Deleting \''+text+'\'');

			        		    	var mainEstPanel = Ext.getCmp('mainEstPanel');
			        		        var mainEstTab = mainEstPanel.getActiveTab();
			        		        var mainEstGrid = mainEstTab.items.items[0].panel;
			        		        var mainEstStore = mainEstGrid.store;
			        		        var dataModel = mainEstStore.data.getByKey(item.id);

			        		        // Supprime une donnée
			        		        mainEstGrid.data.removeAtKey(item.id);//item.getKey());
			    		        	// Raffaichissement du store et donc de la grid
			    		        	mainEstStore.remove(dataModel);

		    	  				   // Rechargement de la grid
		    	  				   var grid = mainCenterTab.items.items[0];
		    	  				   grid.refresh();
		    	  			   },
		    	  			   failure: function (result, request) {
		    		  			   var jsonData = Ext.decode(result.responseText);
		    		  			   var message = jsonData.message;
		    	  				   Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.button.ButtonFileCartDelete', 'failure', 'Error Deleting reason:\''+message+'\'');
		    	  			   }
		    	  			});

	                	});

	        	    }
	        	});
            }
            else {
    	        var text = 'No Deleting because no item to compress.';
    	        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.button.ButtonFileCartDelete', 'error', text);
            }
        }
        else {
	        var text = 'No Deleting because no destination panel find.';
	        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.button.ButtonFileCartDelete', 'error', text);
        }
    }

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.button.ButtonFileCartDelete');});