Ext.define('Workspace.editorjava.panel.center.function.AddTabAce',  {
	// REQUIRED
	requires: [
	     'Workspace.editorjava.panel.center.function.AddTabSave',
	     'Workspace.editorjava.panel.center.function.AddTabReload'
	]
	,
	statics: {

		call : function(raw) {
		    console.info('Workspace.editorjava.panel.center.function.AddTab.call');
			if (raw.contentType!='directory') {
				//var panelId='['+comboRecord.data.project+']'+raw.id;
				var panelId=raw.id;//'['+Ext.getCmp('project').value+']'+raw.id;
				var panelEditorId=panelId+'Editor';
				var mainCenterPanel=Ext.getCmp('mainCenterPanel');

				var panelTab = Ext.getCmp(panelId);
				if (panelTab == undefined) {

					mainCenterPanel.add(
						Ext.create('Workspace.editorjava.panel.center.PanelCenterEditor', {
							title: raw.text,
							id: panelId,
							panelEditorId: panelEditorId,
							panelId: panelId
						})
					);
					panelTab = Ext.getCmp(panelId);
					mainCenterPanel.setActiveTab(panelTab);
				} else {
					mainCenterPanel.setActiveTab(panelTab);
					var editor = ace.edit(panelEditorId);
				    editor.focus();
				}
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabAce');});