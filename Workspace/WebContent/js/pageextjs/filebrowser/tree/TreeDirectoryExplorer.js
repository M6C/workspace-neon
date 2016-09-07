Ext.define('Workspace.filebrowser.tree.TreeDirectoryExplorer', {
	// REQUIRED
	requiers: ['Workspace.filebrowser.grid.GridFileExplorer',
	           'Workspace.filebrowser.panel.center.function.AddTab']
	,
	extend: 'Workspace.common.tree.TreeDirectoryExplorerExtjs4'
	,
	alias: 'widget.filebrowserTreeDirectoryExplorer',
	alternateClassName: 'WorkspaceFilebrowserTreeDirectoryExplorer'
	,
	listeners: {
		//scope: this, //yourScope
		'beforeitemdblclick' : function(view, record, item, index, event, eOpts ) {
			if (record.raw.contentType=='directory') {
				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
	
				Workspace.filebrowser.panel.center.function.AddTab.call(record.raw);
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.tree.TreeDirectoryExplorer');});
