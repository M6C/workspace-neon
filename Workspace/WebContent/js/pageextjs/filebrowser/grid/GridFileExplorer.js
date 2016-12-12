Ext.define('Workspace.filebrowser.grid.GridFileExplorer', {
	extend: 'Workspace.common.grid.GridFileExplorerExtjs4'
		,
		alias: 'widget.filebrowserGridFileExplorer',
		alternateClassName: 'WorkspaceFilebrowserGridFileExplorer'
		,
		initComponent : function(){
			var me = this;

			var sm = new Ext.selection.RowModel({
				mode: 'MULTI'
			});

			Ext.apply(me, {
			    selModel: sm
			    ,
				plugins: [
			 	     Ext.create('Ext.grid.plugin.CellEditing', {
			 	    	clicksToEdit: 2
			 			,
			 	    	onEditComplete : function(editor, value, startValue, eOpts) {
			 				// Explicit load required library (Mandatory for extending this class)
			 				Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer');

			 	    	 	Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer.call(editor, value, startValue, eOpts);
			 	     	}
			         })
				]
				,
				listeners: {
					'itemdblclick': function(grid, record, item, index, e, eOpts ) {
						console.info('Workspace.common.grid.GridFileExplorer itemdblclick');
					}
					,
					'celldblclick': function(iView, iCellEl, iColIdx, iStore, iRowEl, iRowIdx, iEvent) {
						console.info('Workspace.common.grid.GridFileExplorer celldblclick iColIdx:' + iColIdx);
						if (iColIdx == 0) {
							var zRec = iView.getRecord(iRowEl);
							if (zRec.data.contentType != 'directory') {
								Ext.create('Workspace.filebrowser.window.WindowEditor', {
									title:zRec.raw.path,
									panelId:zRec.raw.path,
									width:1000,
									height:600,
								}).show();
							} else {
								if (me.root) {
	                				// Explicit load required library (Mandatory for extending this class)
	                				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
	                	
	                				Workspace.filebrowser.panel.center.function.AddTab.call(zRec.raw);
								} else {
	            					var gridStore = me.getStore();
	            					gridStore.getProxy().extraParams.path = zRec.raw.path;
	            					me.refresh();
	            					me.up('panel').setTitle(zRec.raw.path);
								}
							}
						}
				    }
				}
		    });

		    me.callParent(arguments);
		}
		,
		applyDragAndDrop: function(me) {
			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');
			Workspace.common.draganddrop.ApplyDragAndDropCopyMove.apply(me);
		}
//		,
//		getRowClass: function (view, record) {
//			var mainEstPanel = Ext.getCmp('mainEstPanel');
//			mainEstPanel.items.each(function (item, index, length) {
//		        var mainEstTab = item;
//		        var mainEstGrid = mainEstTab.items.items[0].panel;
//		        if (Ext.isDefined(mainEstGrid.data) &&
//		        	mainEstGrid.data.containsKey(record.data.id)) {
//			        return 'background-color:red';
//		        }
//		        return 'background-color:green';
//			});
//			
//			return 'x-grid3-row-collapsed';
//		}
		,
		hideHeaders : false
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileExplorer');});