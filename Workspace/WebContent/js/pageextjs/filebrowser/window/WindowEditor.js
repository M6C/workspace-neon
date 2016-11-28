Ext.define('Workspace.filebrowser.window.WindowEditor', {
	requires: [
	    'Workspace.editorjava.panel.center.PanelCenterEditor'
 	]
 	,
	extend: 'Ext.Window'
	,
	alias: 'widget.filebrowserWindowEditor',
	alternateClassName: 'WorkspaceFileBrowserWindowEditor'
	,
	// private
	initComponent : function(){
		var me = this;

		var panelId=me.panelId;//'['+Ext.getCmp('project').value+']'+raw.id;
		var panelEditorId=panelId+'Editor';

		var panel = Ext.create('Workspace.editorjava.panel.center.PanelCenterEditor', {
			panelEditorId: panelEditorId,
			panelId: panelId
		});

		Ext.apply(me, {
		    items : [
		       panel
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.filebrowser.window.WindowEditor activate');
//					Ext.getCmp('treeCompletion').focus();
				}
			}
		});

		me.callParent(arguments);
	}
	,
	title: 'File Editor',        //titre de la fen�tre
	layout:'fit',
	width:400,
	height:300,
	modal: true

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.window.WindowEditor');});