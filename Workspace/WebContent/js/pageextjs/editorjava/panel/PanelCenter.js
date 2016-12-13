Ext.define('Workspace.editorjava.panel.PanelCenter', {
	requires: [
  	     'Workspace.editorjava.panel.center.function.AddTabAce'
  	]
  	,
	extend: 'Workspace.widget.panel.PanelCenter'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'PanelCenter'
	,
	// Overrided
	onAddTab(raw) {
		Workspace.editorjava.panel.center.function.AddTabAce.call(raw);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});
