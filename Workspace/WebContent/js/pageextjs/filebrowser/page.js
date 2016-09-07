function init_page() {

	Ext.Loader.setPath('Workspace.filebrowser', '/WorkSpace/js/pageextjs/filebrowser');

// DEPENDENCE
//	Ext.require('Workspace.filebrowser.view.ViewMain');
//	Ext.syncRequire('Workspace.filebrowser.view.ViewMain');

//	Ext.QuickTips.init();

    var viewport = Ext.create('Workspace.filebrowser.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });
}
