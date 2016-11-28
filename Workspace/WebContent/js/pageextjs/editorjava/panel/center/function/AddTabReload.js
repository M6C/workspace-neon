Ext.define('Workspace.editorjava.panel.center.function.AddTabReload',  {
	// REQUIRED

	statics: {

		call : function(panelId, panelEditorId) {
		    console.info('Workspace.editorjava.panel.center.function.AddTabReload.call');
//			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
//			var pnl = mainCenterPanel.getComponent(panelId);
//			var pnlEdit = pnl.getComponent(panelEditorId);
			var pnlEdit = ace.edit(panelEditorId);
			if (Ext.isDefined(pnlEdit.syncValue)) {
				pnlEdit.syncValue();
			}
			var value=pnlEdit.getPosition();
			console.info('Reload pnlEdit.getPosition(true):'+pnlEdit.getPosition(true)+' pnlEdit.getPosition(false):'+pnlEdit.getPosition(false));
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabReload');});