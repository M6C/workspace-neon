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

				var initializeEditor = false;
				var panelTab = Ext.getCmp(panelId);
				if (!Ext.isDefined(panelTab)) {

					mainCenterPanel.add(
						Ext.create('Workspace.editorjava.panel.center.PanelCenterEditor', {
							closable:true,
							title: raw.text,
							id: panelId,
							panelEditorId: panelEditorId,
							panelId: panelId,
							autoDeploy: raw.autoDeploy
						})
					);
					panelTab = Ext.getCmp(panelId);
					initializeEditor = true;
				}
				mainCenterPanel.setActiveTab(panelTab);
				var editor = ace.edit(panelEditorId);
				editor.id = panelEditorId;
				editor.panelId = panelId;

				if (initializeEditor) {
					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandSave');
				    Workspace.editorjava.aceeditor.command.CommandSave.addCommand(editor);

				    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandCompletion');
				    Workspace.editorjava.aceeditor.command.CommandCompletion.addCommand(editor);
				}

				editor.build = raw.build;
				editor.autoDeploy = raw.autoDeploy;
			    editor.focus();
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabAce');});