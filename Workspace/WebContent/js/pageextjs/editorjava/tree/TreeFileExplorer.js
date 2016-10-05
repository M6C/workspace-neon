Ext.define('Workspace.editorjava.tree.TreeFileExplorer', {
	// REQUIRED
//	requiers: ['Workspace.editorjava.grid.GridFileExplorer',
//	           'Workspace.editorjava.panel.center.function.AddTab']
//	,
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.editorjavaTreeFileExplorer',
	alternateClassName: 'WorkspaceEditorJavaTreeFileExplorer'
	,
    listeners: {
        //scope: this, //yourScope
		'beforeitemdblclick' : function(view, record, item, index, event, eOpts ) {
			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTab');
		
			Workspace.editorjava.panel.center.function.AddTab.call(record.raw);
	    }
		,
		'load' : function(store, records, successful, operation, eOpts) {
			if (successful) {
				var view = this.getView();
				var node = view.panel.getRootNode();
				if (node.firstChild != undefined) {
					node = node.firstChild;
				}
				view.select(node);
				view.focus();
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tree.TreeFileExplorer');});
