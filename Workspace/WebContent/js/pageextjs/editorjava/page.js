function init_page() {

	Ext.Loader.setPath('Workspace.editorjava', '/WorkSpace/js/pageextjs/editorjava');

// DEPENDENCE

//	Ext.QuickTips.init();

    var viewport = Ext.create('Workspace.editorjava.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });
}
