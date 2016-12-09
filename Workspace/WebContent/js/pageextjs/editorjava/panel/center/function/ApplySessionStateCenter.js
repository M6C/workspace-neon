Ext.define('Workspace.editorjava.panel.center.function.ApplySessionStateCenter', {
	singleton : true,
	options : {}
	,
	apply: function(panel) {
	    console.debug('Workspace.editorjava.panel.center.function.ApplySessionStateCenter apply');

	    Ext.Loader.syncRequire('Workspace.common.panel.function.ApplySessionStateTabPanel');
	    Workspace.common.panel.function.ApplySessionStateTabPanel.apply(panel, 'Workspace.editorjava.panel.PanelCenter');
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.ApplySessionStateCenter');});