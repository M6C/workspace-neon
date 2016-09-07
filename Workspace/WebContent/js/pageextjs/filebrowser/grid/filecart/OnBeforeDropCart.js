Ext.define('Workspace.filebrowser.grid.filecart.OnBeforeDropCart',  {
	// REQUIRED

	statics: {

		call : function(grid, nodeEl, data) {
		    console.info('Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call OnBeforeDropCart');
		    var ret = true;

		    if (!Ext.isDefined(grid.data)) {
		    	grid.data = new Ext.util.MixedCollection();
		    }

		    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		    var mainCenterTab = mainCenterPanel.getActiveTab();
            if (!Ext.isEmpty(mainCenterTab)) {
			    var itemPathDst = mainCenterTab.id;
			    var nb = data.records.length;
	
			    console.info('Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call OnBeforeDropCart itemPathDst:'+itemPathDst+' data.records.length:'+data.records.length);
	
			    for(i=0 ; i<nb ; i++) {
					var rec = data.records[i];
					var recData = rec.data;
					var recRaw = rec.raw;
					var action = data.copy ? 'copy' : 'move';
					var itemPathSrc = recRaw.id;//raw.getKey();
	
					// Always copy
					data.copy = 'copy';
	
			        var text = 'Clipboard \''+itemPathSrc+'\'';
			        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call', 'info', text);
	
				    // Initialisation des données
				    rec.data = recRaw;
				    rec.data.dropAction = action;

					grid.data.add(itemPathSrc, recRaw);
				}
            }
            else {
		        var text = 'No move/copy because ne destination panel find.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.filecart.OnBeforeDropCart.call', 'error', text);
            }

		    return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.filecart.OnBeforeDropCart');});