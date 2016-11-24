Ext.define('Workspace.common.window.WindowUpload', {

	extend: 'Workspace.common.window.WindowExtjs4'
	,
	alias: 'widget.commonWindowText',
	alternateClassName: 'CommonWindowWindowText'
	,
	// private
	initComponent : function(){
		var me = this;

		Ext.applyIf(me, {
		    items : [
	 			{
					xtype:'form',
				    bodyPadding: 10,
					items : [
					   {
					        xtype: 'filefield',
					        name: 'file',
					        fieldLabel: 'File',
					        labelWidth: 50,
					        msgTarget: 'side',
					        allowBlank: false,
					        anchor: '100%',
					        buttonText: 'Select File...'
					   },
					   {
						   xtype: 'hidden',
						   name: 'path',
						   value: arguments.path
					   }
					]
					,
				    buttons: [{
				        text: 'Upload',
				        handler: function() {
				            var form = this.up('form').getForm();
				            if(form.isValid()){
				                form.submit({
				                    url: 'action.servlet?event=EditorJavaPageUploadValider',
				                    waitMsg: 'Uploading...',
				                    success: function(fp, o) {
				                        Ext.Msg.alert('Success', 'Your file "' + o.result.file + '" has been uploaded.');
				                    }
				                });
				            }
				        }
				    }]
				}
		    ]
		});

		me.callParent(arguments);
	}
	,
    title: 'Upload a File',
	layout:'fit',
	width:850,
	height:450,
//	autoHeight: true,        //hauteur de la fen�tre
	modal: true,             //Grise automatiquement le fond de la page
	plain: true

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowUpload');});