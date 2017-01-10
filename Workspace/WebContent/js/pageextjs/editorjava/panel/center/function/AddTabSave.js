Ext.define('Workspace.editorjava.panel.center.function.AddTabSave',  {
	requires: [
	    'Workspace.common.tool.Pop',
	    'Workspace.editorjava.request.JsonEditSaveAndBuild']
	,
	statics: {

		call : function() {
		    console.info('Workspace.editorjava.panel.center.function.AddTabSave.call');
		    var me = this;

			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
            var tab = mainCenterPanel.getActiveTab();
            var panelId = tab.id;
            var panelEditorId = tab.panelEditorId;
		    var pnl = mainCenterPanel.getComponent(panelId);
//			var pnlEdit = pnl.getComponent(panelEditorId);
			var editor = ace.edit(panelEditorId);
			if (!editor.dirty) {
			    Workspace.common.tool.Pop.info(me, 'No&nbsp;need&nbsp;Save', {detail:panelId});
				return;
			}
			if (Ext.isDefined(editor.syncValue)) {
				editor.syncValue();
			}
			var value=editor.getValue();//pnlEdit.getRawValue();
			//value=value.replace(/&\w+;/g,"");
			var application = pnl.application;
			var className = editor.className;
			var autoDeploy = editor.autoDeploy;

			Ext.create('Workspace.editorjava.request.JsonEditSaveAndBuild',
			{
				params:{filename:panelId,content:value},
				application:application,
				build:editor.build,
				className:className,
				autoDeploy:autoDeploy,
				panelEditorId:panelEditorId
			}).request();
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSave');});