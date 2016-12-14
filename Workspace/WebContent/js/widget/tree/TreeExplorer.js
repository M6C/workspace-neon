Ext.define('Workspace.widget.tree.TreeExplorer', {
	requires: [
  	     'Workspace.common.tool.Delete'
  	],
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.widgetTreeExplorer',
	alternateClassName: 'WorkspaceWidgetTreeExplorer'
	,
	// Must be overrided
	onActionOpen(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.TreeExplorer onActionOpen do nothing');
	},
	// Can be overrided
	onActionDelete(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.TreeExplorer onActionDelete');
		Workspace.common.tool.Delete.doRequest(view.getSelectionModel());
	},
	// Can be overrided
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');
		Workspace.common.draganddrop.ApplyDragAndDropCopyMove.apply(me);
	}
	,
    enableKeyEvents:true,
	listeners: {
		'load' : function(store, records, successful, operation, eOpts) {
			if (successful) {
				var view = this.getView();
				var node = records;
				if (node.parentNode == undefined && node.firstChild != undefined) {
					view.select(node.firstChild);
				}
				view.focus();
			}
		}
		,
		'add' : function ( container, component, index, eOpts ) {
			console.info('Workspace.widget.tree.TreeExplorer add');
		    var me = this;
			component.on('itemkeydown', function(view, record, item, index, event, eOpts) {
				var key = event.keyCode;
				switch (key) {
					case Ext.EventObject.ENTER: 	// code:13
						me.onActionOpen(view, record, item, index, event, eOpts);
						break;
	
					case Ext.EventObject.DELETE: 	// code:46
					case Ext.EventObject.BACKSPACE: // code:8
						me.onActionDelete(view, record, item, index, event, eOpts);
						break;

					default:
						break;
				}
			});
		}
		,
		'itemdblclick' : function(view, record, item, index, event, eOpts) {
		    var me = this;
			me.onActionOpen(view, record, item, index, event, eOpts);
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.widget.tree.TreeExplorer');});