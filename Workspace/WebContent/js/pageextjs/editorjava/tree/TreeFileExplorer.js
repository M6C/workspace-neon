Ext.define('Workspace.editorjava.tree.TreeFileExplorer', {
	requires: [
  	     'Workspace.editorjava.aceeditor.command.CommandFindResource'
  	],
	extend: 'Workspace.widget.tree.WidgetTreeExplorer'
	,
	alias: 'widget.editorjavaTreeFileExplorer',
	alternateClassName: 'WorkspaceEditorJavaTreeFileExplorer'
	,
    enableKeyEvents: true
	,
	// Overrided
	onActionOpen(view, record, item, index, event, eOpts) {
		console.info('Workspace.editorjava.tree.TreeFileExplorer actionItem');

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
		Workspace.editorjava.panel.center.function.AddTabAce.call(record.raw);
	},
	// Can be overrided
	onItemKeyDown: function(view, record, item, index, event, eOpts) {
		console.info('Workspace.editorjava.tree.TreeFileExplorer onItemKeyDown');
		var superMethod = this.superclass.onItemKeyDown;
		if (event.ctrlKey && event.shiftKey && event.keyCode == Ext.EventObject.R) {
		    Workspace.editorjava.aceeditor.command.CommandFindResource.openFindResource();
		    event.stopEvent();
		} else {
		    superMethod(view, record, item, index, event, eOpts);
		}
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tree.TreeFileExplorer');});