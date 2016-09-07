Ext.define('Workspace.filebrowser.grid.GridFileExplorer', {
	// REQUIRED
	requires: ['Workspace.filebrowser.panel.center.function.AddTab',
	           'Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer',
	           'Workspace.filebrowser.grid.fileexplorer.OnDropExplorer',
	           'Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer']
	,
	extend: 'Workspace.common.grid.GridFileExplorerExtjs4'
	,
	alias: 'widget.filebrowserGridFileExplorer',
	alternateClassName: 'WorkspaceFilebrowserGridFileExplorer'
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			plugins: [
		 	     Ext.create('Ext.grid.plugin.CellEditing', {
		 	    	clicksToEdit: 2
//			 	   	,
//			 	    initComponent : function(){
//			 			var me = this;
//
//			 			me.on(
//			 			);
//
//			 			me.callParent(arguments);
//		 	     	}
		 			,
		 	    	onEditComplete : function(editor, value, startValue, eOpts) {
		 				// Explicit load required library (Mandatory for extending this class)
		 				Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer');

		 	    	 	Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer.call(editor, value, startValue, eOpts);
		 	     	}
//NE FONCTIONNE PAS
//			 	    ,
//			 	    listeners : {
//			 	  		'validateedit' : function(editor, e, eOpts) {
//			 				console.info('Workspace.filebrowser.grid.GridFileExplorer on validateedit ['+e.rowIdx+','+e.colIdx+'] \''+e.originalValue+'\'->\''+e.value+'\'');
//			 				return e.colIdx==0;
//			 			}
//			 	    }
		           }
		 	     )
		     ]
	    });

		me.callParent(arguments);
	}
//,
//getRowClass: function (view, record) {
//	var mainEstPanel = Ext.getCmp('mainEstPanel');
//	var cls = view.getRowClass(record);
//	return cls;
//}
	,
	getRowClass: function (view, record) {
    	var mainEstPanel = Ext.getCmp('mainEstPanel');
    	mainEstPanel.items.each(function (item, index, length) {
	        var mainEstTab = item;
	        var mainEstGrid = mainEstTab.items.items[0].panel;
	        if (Ext.isDefined(mainEstGrid.data) &&
	        	mainEstGrid.data.containsKey(record.data.id)) {
		        return 'background-color:red';
	        }
	        return 'background-color:green';
    	});
    	
		return 'x-grid3-row-collapsed';
	}
	,
	listeners : {
		//scope: this, //yourScope
		'beforeitemdblclick' : function(view, record, item, index, event, eOpts ) {
			if (/*index==0 &&*/ record.raw.contentType=='directory') {
				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');

				var raw = {
					contentType:record.raw.contentType, 
					application:record.raw.application,
					id:'['+record.raw.application+']'+record.raw.path, 
					path:/*'['+record.raw.application+']'+*/record.raw.path
				};
				Workspace.filebrowser.panel.center.function.AddTab.call(raw);
			}
		}
//NE FONCTIONNE PAS
//		,
//		'validateedit' : function(editor, e, eOpts) {
//			console.info('Workspace.filebrowser.grid.GridFileExplorer on validateedit ['+e.rowIdx+','+e.colIdx+'] \''+e.originalValue+'\'->\''+e.value+'\'');
//			return e.colIdx==0;
//		}
	}
	,
	onDrop : function(node, data, overModel, dropPosition, eOpts) {
		console.info('Workspace.filebrowser.grid.GridFileExplorer OnDrop');
		var me = this;
	    me.callParent(arguments);

	    // Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer');

	    return Workspace.filebrowser.grid.fileexplorer.OnDropExplorer.call(node, data, overModel, dropPosition, eOpts);
	}
	,
	onBeforeDrop : function(nodeEl, data) {
		var me = this;
	    me.callParent(arguments);

	    // Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnEditCompleteExplorer');

	    return Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call(me, nodeEl, data);
	}
	,
	hideHeaders : true
}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.GridFileExplorer');});