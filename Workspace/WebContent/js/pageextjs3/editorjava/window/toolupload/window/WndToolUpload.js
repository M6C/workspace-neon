// DEPENDENCE
Ext.Loader.load(['/WorkSpace/js/pageextjs/editorjava/window/toolupload/panel/PanelToolUpload.js']);

//NAMESPACE
Ext.ns('Workspace.window.ToolUpload');

// Window
Workspace.window.ToolUpload.WindowToolUpload = Ext.extend(Ext.Window, {
	// private
    initComponent : function(){
	    this.items = [
			{
				xtype:'panel',
				autoWidth: true,             //largeur de la fenêtre
				autoHeight: true,            //hauteur de la fenêtre
			    layout: 'fit',
			    bbar: new Ext.ux.StatusBar({
			        id: 'form-statusbar-project',
			        defaultText: 'Prêt'
			        //,plugins: new Ext.ux.ValidationStatus({form:formId})
			    }),
				items : [
				   {
					   xtype:'WorkspaceWindowToolUploadPanelPanelToolUpload'
				   }
				]
			}
	    ]

	    Workspace.window.ToolUpload.WindowToolUpload.superclass.initComponent.call(this);
	},
	title: 'ToolUpload Action',        //titre de la fenêtre
    // el = id du div dans le code html de la page qui contiendra la popup
//    el:windowEl,        
    layout:'fit',
    width:400,
    autoHeight: true,        //hauteur de la fenêtre
    modal: true,             //Grise automatiquement le fond de la page
    closeAction:'hide',
    plain: true
});
