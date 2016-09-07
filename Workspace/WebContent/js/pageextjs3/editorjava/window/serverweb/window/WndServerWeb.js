//DEPENDENCE
Ext.Loader.load(fileList=[
'/WorkSpace/js/pageextjs/editorjava/window/package/window/WndPackage.js',
'/WorkSpace/js/pageextjs/editorjava/window/serverweb/function/executeCommand.js'
],
preserveOrder=true);

//NAMESPACE
Ext.ns('Workspace.window.ServerWeb');

// Window
Workspace.window.ServerWeb.WindowServerWeb = Ext.extend(Workspace.window.Package.WindowPackage, {
	// private
    initComponent : function(){

		// Fonction du bouton Submit
		this.callBackSubmit = function() {
			Workspace.window.ServerWeb.function.executeCommand(this.statusbarId,this.cmd);
		};

		Workspace.window.ServerWeb.WindowServerWeb.superclass.initComponent.call(this);

		// Positionne des paramètres sur le bouton Submit de la window
		Ext.getCmp('pkgsubmit').statusbarId = this.statusbarId;
		Ext.getCmp('pkgsubmit').cmd = this.cmd;
	}
});
