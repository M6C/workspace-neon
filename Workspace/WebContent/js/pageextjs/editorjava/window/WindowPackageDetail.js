Ext.define('Workspace.editorjava.window.WindowPackageDetail', {
	// REQUIRED

	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowPackageDetail',
	alternateClassName: 'WorkspaceEditorJavaWindowPackageDetail'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items : [
				{
					xtype:'WorkspaceTreeTreePackageDetail',
					id : 'treePackageDetail'
				},
				{
				    xtype: 'hidden',
				    id: 'pkgtype',
				    name: 'pkgtype',
				    value: this.pkgtype
				}
			]
		});

		me.callParent(arguments);
	}
	,
	title: 'Package Detail',        //titre de la fenêtre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	height:300,
	//autoHeight: true,        //hauteur de la fenêtre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true,
	//autoScroll:true,
	//hideBorders:true,
	//titleCollapse:true,
	//header:false,
	//items: tPackageDetail        //On met dans cette fenêtre le panel précédent

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowPackageDetail');});