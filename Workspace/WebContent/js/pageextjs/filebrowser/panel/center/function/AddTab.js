Ext.define('Workspace.filebrowser.panel.center.function.AddTab',  {
	// REQUIRED

	statics: {

		call : function(raw) {
		    console.info('Workspace.filebrowser.panel.center.function.AddTab.call OnBeforeDropCart');
//		    var ret = true;

			if (raw.contentType=='directory') {

				var mainCenterPanel=Ext.getCmp('mainCenterPanel');
				var panelId=raw.id;//raw.getKey();
				var gridId = 'gridFileExplorer_'+panelId;

				console.info('Workspace.filebrowser.tree.TreeDirectoryExplorer beforeitemdblclick:'+panelId);

				var panel=mainCenterPanel.getComponent(panelId);
				if (!Ext.isDefined(panel)) {
					mainCenterPanel.insert(
						0,
						{
							title: panelId,
							id: panelId,
							//elements: 'body,tbar',
							closable:true,
							layout: 'fit',
							defaults     : { flex : 1 }//auto stretch
							,
						    items: [
								Ext.create('Workspace.filebrowser.grid.GridFileExplorer', {
									id: gridId
								})
						    ]
						}
					);
					panel = Ext.getCmp(panelId);

					var grid = panel.getComponent(gridId);

					// Chargement des données
					var gridStore = grid.getStore();
					gridStore.getProxy().extraParams.path = raw.path;
					gridStore.getProxy().extraParams.application = raw.application;
					grid.refresh();
				}

				mainCenterPanel.setActiveTab(panel);
//
//				var grid = panel.getComponent(gridId);
//
//				// Chargement des données
//				var gridStore = grid.getStore();
//				gridStore.getProxy().extraParams.path = raw.path;
//				gridStore.getProxy().extraParams.application = raw.application;
//				grid.refresh();

//				return false;
			}
			else {
			}

//		    return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.center.function.AddTab');});