function init_page() {

	Ext.Loader.setPath('Workspace.admin', '/WorkSpace/js/pageextjs/admin');

// DEPENDENCE
//	Ext.require('Workspace.admin.view.ViewMain');
//	Ext.syncRequire('Workspace.admin.view.ViewMain');

//	Ext.QuickTips.init();

    var viewport = Ext.create('Workspace.admin.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });
}
