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
//		    var pnl = mainCenterPanel.getComponent(panelId);
//			var pnlEdit = pnl.getComponent(panelEditorId);
			var pnlEdit = ace.edit(panelEditorId);
			if (!pnlEdit.dirty) {
			    Workspace.common.tool.Pop.info(me, 'No&nbsp;need&nbsp;Save ' + panelId);
				return;
			}
			if (Ext.isDefined(pnlEdit.syncValue)) {
				pnlEdit.syncValue();
			}
			var value=pnlEdit.getValue();//pnlEdit.getRawValue();
			//value=value.replace(/&\w+;/g,"");
			var application = pnlEdit.application;
			var className=pnlEdit.className;
			var autoDeploy = pnlEdit.autoDeploy;

			Ext.create('Workspace.editorjava.request.JsonEditSaveAndBuild',
			{
				params:{filename:panelId,content:value},
				application:application,
				build:pnlEdit.build,
				className:className,
				autoDeploy:autoDeploy
			}).request();
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabSave');});