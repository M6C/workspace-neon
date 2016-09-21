Ext.require([
	'Workspace.common.window.WindowExtjs4',
	'Workspace.common.form.textarea.HtmlEditor'
]);

Ext.define('Workspace.common.window.WindowText', {

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'widget.commonWindowText',
	alternateClassName: 'CommonWindowWindowText'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
		    items : [
	 			{
					xtype:'panel',
					autoWidth: true,             //largeur de la fen�tre
					autoHeight: true,            //hauteur de la fen�tre
				    layout: 'fit'
				    ,
					items : [
					   {
//						   xtype:'commonHtmlEditor',
						   xtype:'htmleditor',
						   id:'editorText'
					   }
					]
				}
		    ]
	    	,
		    listeners:{
		        'show' : function (text){
		        	var editor = Ext.getCmp('editorText');
		        	editor.setValue(text);
		        	editor.syncValue();
//		        	Ext.getCmp('editorText').update(text);
				}
		   }
		});

		me.callParent(arguments);
	}
	,
	title: 'Message',        //titre de la fen�tre
	// el = id du div dans le code html de la page qui contiendra la popup
	//el:windowEl,        
	layout:'fit',
	width:400,
	autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowText');});