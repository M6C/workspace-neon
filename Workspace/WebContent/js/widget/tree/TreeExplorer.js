Ext.define('Workspace.widget.tree.TreeExplorer', {
	
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.widgetTreeExplorer',
	alternateClassName: 'WorkspaceWidgetTreeExplorer'
	,
	// Must be override
	onActionItem(view, record, item, index, event, eOpts) {
		console.info('Workspace.widget.tree.TreeExplorer onActionItem do nothing');
	}
	,
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');
		Workspace.common.draganddrop.ApplyDragAndDropCopyMove.apply(me);
	}
	,
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
				var key = e.keyCode;
				if (key==Ext.EventObject.ENTER) {// code:13
					me.onActionItem(view, record, item, index, event, eOpts);
				}
			});
		}
		,
		'itemdblclick' : function(view, record, item, index, event, eOpts) {
		    var me = this;
			me.onActionItem(view, record, item, index, event, eOpts);
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.widget.tree.TreeExplorer');});