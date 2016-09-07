// DEPENDENCE
Ext.Loader.load(['/WorkSpace/js/pageextjs/editorjava/window/package/window/WndPackage.js']);

function create_WindowPackageAction(windowEl,formId,comboId,statusbarId,type,submitText,callBackSubmit) {
	Ext.QuickTips.init();                //nécessaire pour initialiser les infobulles d’erreur
	Ext.form.Field.prototype.msgTarget = 'side';    //nécessaire pour initialiser les infobulles d’erreur

	var wnd = new Workspace.window.Package.WindowPackage ({
		el:windowEl,
		formId:formId,
		comboId:comboId,
		statusbarId:statusbarId,
		type:type,
		submitText:submitText,
		callBackSubmit:callBackSubmit
	});

	return wnd;
}
//
//	// package_content_panel => login
//	var comboPackageAction = create_ComboPackage(comboId, type);
//	comboPackageAction.fieldLabel = 'Package';
//	// Add a listener to take some action when a node is moved. 
//	comboPackageAction.addListener('select', function (cmb, record, index){
//		Ext.getCmp('package').value=record.data.package;
//		Ext.getCmp(statusbarId).setText('Create package \''+record.data.package+'\'');
//	});
//
//	var package_content_panel = new Ext.FormPanel({
//		id: formId,   //id de la fenêtre
//		frame: true,                 //pour que tous les items soient dans la même frame
//		autoWidth: true,            //largeur de la fenêtre
//		autoHeight: true,            //hauteur de la fenêtre
//		labelWidth: 110,             //largeur des labels des champs
//		//defaults: {width: 230},         //largeur des champs
//		labelAlign: 'right',            //les labels s'aligneront a droite        
//		bodyCfg: {tag:'center', cls:'x-panel-body'},        //on aligne tous les champs au milieu de la fenêtre
//		bodyStyle: 'padding:5p;margin:0px; ',
//		items: [
//			comboPackageAction,
//			{
//			    xtype: 'hidden',        //Balise cachée afin de dire qu'il s'agit d'une connexion
//			    id: 'package',
//			    name: 'package',
//			    allowBlank: false
//			}
//		],
//		buttons: [
//		{
//			xtype: 'button',
//			text: 'Detail',
//			handler: function() {
////				var tPackageDetail = createTreePackageDetail ('treePackageDetail');
////				tPackageDetail.root.reload();
//				new Ext.Window({
//					title: 'Package Detail',        //titre de la fenêtre
//					// el = id du div dans le code html de la page qui contiendra la popup
//					//el:windowEl,        
//					layout:'fit',
//					width:400,
//					height:300,
//					//autoHeight: true,        //hauteur de la fenêtre
//					modal: true,             //Grise automatiquement le fond de la page
//					closeAction:'hide',
//					plain: true,
//					//autoScroll:true,
//					//hideBorders:true,
//					//titleCollapse:true,
//					//header:false,
//					//items: tPackageDetail        //On met dans cette fenêtre le panel précédent
//					items: [{
//						xtype:'WorkspaceTreeTreePackageDetail',
//						id : 'treePackageDetail',
//						type : type
//					}]
//				}).show();
//			}
//		},
//		{
//			xtype: 'button',
//			text: submitText,
//			handler: callBackSubmit    //fonction à appeler lorsque l’on clique sur le bouton
//		}
//		/*
//		{
//			xtype: 'panel',
//			bodyCfg: {tag:'center'},        //alignement au milieu
//			border: false,
//			items: {
//				xtype: 'button',
//				text: submitText,
//				handler: callBackSubmit    //fonction à appeler lorsque l’on clique sur le bouton
//			}
//		}
//		*/
//		]
//	});
//
//	/**
//	 * Voila notre formulaire créé. Afin de rendre le design plus attrayant, nous allons ajouter un nouveau panel contenant une status bar. Il s’agit d’une petite ligne en bas à gauche de la fenêtre affichant l’état de la connexion : « formulaire valide, connexion réussie, mot de passe incorrect … »
//	 */
//
//	//Ce panel contiendra le panel précédent qui est le formulaire, sauf qu'en bas de celui ci figure la status bar, permettant d'afficher le status de la connexion (chargement ....)
//	var package_main_panel = new Ext.Panel({
//		autoWidth: true,             //largeur de la fenêtre
//		autoHeight: true,            //hauteur de la fenêtre
//	    layout: 'fit',
//	    bbar: new Ext.ux.StatusBar({
//	        id: statusbarId,
//	        defaultText: 'Prêt',
//	        plugins: new Ext.ux.ValidationStatus({form:formId})
//
//	    }),
////	    items: package_content_panel  //On met dans ce panel le panel de login
//		items [
//		   {
//			   xtype:'WorkspaceWindowPackagePanelPanelPackage',
//			   callBackSubmit:this.callBackSubmit
//		   }
//		]
//	});
//
//	/**
//	 * Enfin, créons la fonction qui va instancier la fenêtre contenant ce panel
//	 */
//	//Si la fenêtre de connexion n'existe pas, on la crée
//    var package_window = new Ext.Window({
//	    title: 'Package Action',        //titre de la fenêtre
//	    // el = id du div dans le code html de la page qui contiendra la popup
//	    el:windowEl,        
//	    layout:'fit',
//	    width:400,
//	    autoHeight: true,        //hauteur de la fenêtre
//	    modal: true,             //Grise automatiquement le fond de la page
//	    closeAction:'hide',
//	    plain: true,
//	    items: [
//			{
//				xtype:'panel',
//				autoWidth: true,             //largeur de la fenêtre
//				autoHeight: true,            //hauteur de la fenêtre
//			    layout: 'fit',
//			    bbar: new Ext.ux.StatusBar({
//			        id: statusbarId,
//			        defaultText: 'Prêt'
//			        //,plugins: new Ext.ux.ValidationStatus({form:formId})
//			
//			    }),
//			//    items: package_content_panel  //On met dans ce panel le panel de login
//				items [
//				   {
//					   xtype:'WorkspaceWindowPackagePanelPanelPackage',
//					   callBackSubmit:this.callBackSubmit
//				   }
//				]
//			}
//	    ]
//    });
//
//    return package_window;
//}
