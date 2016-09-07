// DEPENDENCE
Ext.Loader.load(['/WorkSpace/js/pageextjs/editorjava/window/package/combobox/ComboPackage.js']);

//NAMESPACE
Ext.ns('Workspace.window.Package.panel');

// Panel
Workspace.window.Package.panel.PanelPackage = Ext.extend(Ext.FormPanel, {
	// private
    initComponent : function(){
		this.items = [
  			{
  				xtype:'WorkspaceWindowPackageComboboxComboPackage',
  				id: this.comboId,
  				statusbarId: this.statusbarId,
  				pkgtype:this.pkgtype
  			},
			{
			    xtype: 'hidden',        //Balise cachée afin de dire qu'il s'agit d'une connexion
			    id: 'package',
			    name: 'package',
			    allowBlank: false
			}
		];

		this.buttons = [
    		{
    			xtype: 'button',
    			text: 'Detail',
    			pkgtype : this.pkgtype,
    			handler: function() {
//		        				var tPackageDetail = createTreePackageDetail ('treePackageDetail');
//		        				tPackageDetail.root.reload();
    				new Ext.Window({
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
    					pkgtype : this.pkgtype,
    					items: [
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
    				}).show();
    			}
    		},
    		{
    			xtype: 'button',
    			id: 'pkgsubmit',
    			text: this.submitText,
    			handler: this.callBackSubmit
    		}
    		/*
    		{
    			xtype: 'panel',
    			bodyCfg: {tag:'center'},        //alignement au milieu
    			border: false,
    			items: {
    				xtype: 'button',
    				text: submitText,
    				handler: submitFunction    //fonction à appeler lorsque l’on clique sur le bouton
    			}
    		}
    		*/
	   	];

		Workspace.window.Package.panel.PanelPackage.superclass.initComponent.call(this);
	},
//	id: formId,   //id de la fenêtre
	frame: true,                 //pour que tous les items soient dans la même frame
	autoWidth: true,            //largeur de la fenêtre
	autoHeight: true,            //hauteur de la fenêtre
	labelWidth: 110,             //largeur des labels des champs
	//defaults: {width: 230},         //largeur des champs
	labelAlign: 'right',            //les labels s'aligneront a droite        
	bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fenêtre
	bodyStyle: 'padding:5p;margin:0px; '
});

// REGISTER
Ext.reg('WorkspaceWindowPackagePanelPanelPackage', Workspace.window.Package.panel.PanelPackage);
