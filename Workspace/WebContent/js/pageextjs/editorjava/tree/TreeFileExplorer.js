Ext.define('Workspace.editorjava.tree.TreeFileExplorer', {
	
	extend: 'Workspace.widget.TreeExplorer'
	,
	alias: 'widget.editorjavaTreeFileExplorer',
	alternateClassName: 'WorkspaceEditorJavaTreeFileExplorer'
	,
	// Overrided
	onActionItem() {
		console.info('Workspace.editorjava.tree.TreeFileExplorer actionItem');

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
		Workspace.editorjava.panel.center.function.AddTabAce.call(record.raw);
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tree.TreeFileExplorer');});