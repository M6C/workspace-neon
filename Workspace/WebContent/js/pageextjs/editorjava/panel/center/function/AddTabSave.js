Ext.define('Workspace.editorjava.panel.center.function.AddTabSave',  {
	// REQUIRED
	requires: ['Workspace.common.window.WindowWaiting',
	           'Workspace.common.window.WindowResultText']
	,
	statics: {

		call : function(panelId, panelEditorId) {
		    console.info('Workspace.editorjava.panel.center.function.AddTabSave.call');

			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.common.window.WindowWaiting');

			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
		    var pnl = mainCenterPanel.getComponent(panelId);
			var pnlEdit = pnl.getComponent(panelEditorId);
			pnlEdit.syncValue();
			var value=pnlEdit.getValue();//pnlEdit.getRawValue();
			//value=value.replace(/&\w+;/g,"");
			var className=pnlEdit.className;

			var wndWaiting = Workspace.common.window.WindowWaiting.show();

			Workspace.common.window.WindowWaiting.updateText('Saving process...');
	    	Ext.Ajax.request({
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

								Workspace.common.window.WindowResultText.show(response,function(btn, text){
									Workspace.common.window.WindowWaiting.hide("Building complete.", 1);
						  		});
							},
							params:{application:application,target:'compile',className:className}
						});
	    			}
	    			else {
	    				Workspace.common.window.WindowWaiting.hide("Saving complete.", 1);
	    			}
				},
				params:{filename:panelId,content:value}
			}); 		
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSave');});