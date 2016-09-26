Ext.define('Workspace.editorjava.request.JsonEditSaveFile',  {
	extend: 'Ext.Ajax.request'
	,
	method:'POST',
	url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditSaveFile',
	callback:function(options, success, response) { 

		if (pnlEdit.build) {
			Workspace.common.window.WindowWaiting.updateText('Building process...');
			var application = Ext.getCmp('project').value;
			Ext.Ajax.request({
				method:'POST',
				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject',
				callback:function(opts, success, response) {
					// Explicit load required library (Mandatory for extending this class)
					Ext.Loader.syncRequire('Workspace.common.window.WindowResultText');

					Workspace.common.window.WindowWaiting.hide("Building complete.", 1);

					var option = {response: response};
					Ext.create('Workspace.common.window.WindowTextCompile', option).show();
				},
				params:{application:application,target:'compile',className:className}
			});
		}
		else {
			Workspace.common.window.WindowWaiting.hide("Saving complete.", 1);
		}
	},
	//params:{filename:panelId,content:value}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSave');});