Ext.define('Workspace.editorjava.panel.center.function.AddTabSave',  {
	// REQUIRED
	requires: [
	    'Workspace.common.tool.Toast',
	    'Workspace.common.window.WindowWaiting',
	    'Workspace.common.window.WindowResultText',
	    'Workspace.editorjava.request.JsonEditSaveAndBuild']
	,
	statics: {

		call : function(panelId, panelEditorId) {
		    console.info('Workspace.editorjava.panel.center.function.AddTabSave.call');

			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.common.window.WindowWaiting');

			var application = Ext.getCmp('project').value;
//			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
//		    var pnl = mainCenterPanel.getComponent(panelId);
//			var pnlEdit = pnl.getComponent(panelEditorId);
			var pnlEdit = ace.edit(panelEditorId);
			if (Ext.isDefined(pnlEdit.syncValue)) {
				pnlEdit.syncValue();
			}
			var value=pnlEdit.getValue();//pnlEdit.getRawValue();
			//value=value.replace(/&\w+;/g,"");
			var className=pnlEdit.className;

			Ext.create('Workspace.editorjava.request.JsonEditSaveAndBuild',
			{
				params:{filename:panelId,content:value},
				application:application,
				build:pnlEdit.build,
				className:className
			}).request();
			Workspace.common.tool.Toast.show('File \'' + panelId + '\' saved');
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSave');});