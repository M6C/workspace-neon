//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndBuild',  {

	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
	callback:function(options, success, response) { 
        var me = this;

		if (me.build) {
			Workspace.common.window.WindowWaiting.updateText('Building process...');
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
				params:{application:me.application,target:'compile',className:me.className}
			});
		}
		else {
			Workspace.common.window.WindowWaiting.hide("Saving complete.", 1);
		}
	},
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndBuild');});