Ext.define('Workspace.filebrowser.tree.TreeFileExplorer', {
	// REQUIRED
	requiers: ['Workspace.filebrowser.grid.GridFileExplorer']
	,
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.filebrowserTreeFileExplorer',
	alternateClassName: 'WorkspaceFilebrowserTreeFileExplorer'
	,
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');
		Workspace.common.draganddrop.ApplyDragAndDropCopyMove.apply(me);
	}
	,
    listeners: {
        //scope: this, //yourScope
		'itemdblclick' : function(view, record, item, index, event, eOpts ) {
			if (record.raw.contentType=='directory') {
				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
	
				Workspace.filebrowser.panel.center.function.AddTab.call(record.raw);
				return false;
//
//				var mainCenterPanel=Ext.getCmp('mainCenterPanel');
//				var panelId=record.raw.id;//record.raw.getKey();
//				var gridId = 'gridFileExplorer_'+panelId;
//
//				console.info('Workspace.filebrowser.tree.TreeFileExplorer beforeitemdblclick:'+panelId);
//
//				var panel=mainCenterPanel.getComponent(panelId);
//				if (!Ext.isDefined(panel)) {
//					mainCenterPanel.insert(
//						0,
//						{
//							title: panelId,
//							id: panelId,
//							//elements: 'body,tbar',
//							closable:true,
//							layout: 'fit',
//							defaults     : { flex : 1 }//auto stretch
//							,
//						    items: [
//								Ext.create('Workspace.filebrowser.grid.GridFileExplorer', {
//									id: gridId
//								})
//						    ]
//						}
//					);
//					panel = Ext.getCmp(panelId);
//				}
//				mainCenterPanel.setActiveTab(panel);
//
//				var grid = panel.getComponent(gridId);
//
//				// Chargement des donn�es
//				var gridStore = grid.getStore();
//				gridStore.getProxy().extraParams.path = record.raw.path;
//				gridStore.getProxy().extraParams.application = record.raw.application;
//				gridStore.load(
//					new Ext.data.Operation({
//						action:'read'
//					})
//				);
//
//				return false;
			}
			else {
			}
	    }
	}
//	,
//    initComponent : function(){
//		var me = this;
//		Ext.apply(me, {
//            items : [
//            ]
//        });
//	    me.callParent(arguments);
//	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.tree.TreeFileExplorer');});
