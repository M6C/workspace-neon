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

		var title=me.title;
		var panelId=me.panelId;//'['+Ext.getCmp('project').value+']'+raw.id;
		var panelEditorId=panelId+'Editor';

		var panel = Ext.create('Workspace.editorjava.panel.center.PanelCenterEditor', {
			title: title,
			id: panelId,
			panelEditorId: panelEditorId,
			panelId: panelId
		});

		Ext.apply(me, {
		    items : [
		       panel;
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.filebrowser.window.WindowEditor activate');
//					Ext.getCmp('treeCompletion').focus();
				}
				,
				'destroy' : me.listeners.destroy
			}
		});

		me.callParent(arguments);
	}
	,
	title: 'Editor',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	height:300,
	//autoHeight: true,        //hauteur de la fen�tre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.window.WindowEditor');});