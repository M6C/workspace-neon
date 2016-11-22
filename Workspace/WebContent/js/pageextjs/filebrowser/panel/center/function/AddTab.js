Ext.define('Workspace.filebrowser.panel.center.function.AddTab',  {

	statics: {

		call : function(raw, closable = true) {
		    console.info('Workspace.filebrowser.panel.center.function.AddTab.call OnBeforeDropCart');

			if (raw.contentType=='directory') {

				var mainCenterPanel=Ext.getCmp('mainCenterPanel');
				var panelId=raw.id;//raw.getKey();
				var gridId = 'gridFileExplorer_'+panelId;

				console.info('Workspace.filebrowser.tree.TreeDirectoryExplorer beforeitemdblclick:'+panelId);

				var panel=mainCenterPanel.getComponent(panelId);
				if (!Ext.isDefined(panel)) {
					var grid = Ext.create('Workspace.poc.draganddrop.GridFileExplorer', {
						id: gridId
					});

					mainCenterPanel.insert(
					0,
					{
						xtype:'panel',
						title: panelId,
						id: panelId,
						//elements: 'body,tbar',
						closable:closable,
						layout: 'fit',
						defaults: { flex : 1 },//auto stretch
					    items: [
							grid
					    ]
					});

					panel=mainCenterPanel.getComponent(panelId);

					// Chargement des donnees
					var gridStore = grid.getStore();
					gridStore.getProxy().extraParams.path = raw.path;
					gridStore.getProxy().extraParams.application = raw.application;
					grid.refresh();
				} else {
					var grid = panel.getComponent(gridId);
					var gridStore = grid.getStore();
					grid.refresh();
				}

				mainCenterPanel.setActiveTab(panel);
			}
			else {
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.center.function.AddTab');});