Ext.define('Workspace.widget.TreeExplorer', {
	
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.widgetTreeExplorer',
	alternateClassName: 'WorkspaceWidgetTreeExplorer'
	,
	// Must be override
	onActionItem() {
		console.info('Workspace.widget.TreeExplorer actionItem do nothing');
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
			console.info('Workspace.widget.TreeExplorer add');
		    var me = this;
			component.on('itemkeydown', function(view, record, item, index, e, eOpts) {
				var key = e.keyCode;
				if (key==Ext.EventObject.ENTER) {// code:13
					me.actionItem();
				}
			});
		}
		,
		'itemdblclick' : function(view, record, item, index, event, eOpts ) {
		    var me = this;
			me.actionItem();
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.widget.TreeExplorer');});