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
	},
	getSelectedItem: function() {
		var ret = null;
	    var treeDirectory = Ext.getCmp('treeDirectory');
        var selection = treeDirectory.getSelectionModel().selected;
        if (selection.getCount() == 1) {
        	ret = selection.get(0);
        }
        return ret;
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});
