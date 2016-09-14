function init_page() {

	Ext.Loader.setPath('Workspace.editorjava', DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava');

// DEPENDENCE
	Ext.Loader.setConfig({enabled: true});

//	Ext.Loader.setPath('Ext.ux', '../ux/');
	Ext.Loader.setPath("Ext.ux", "http://cdn.sencha.io/ext-4.0.7-gpl/examples/ux");

	Ext.require([
	    'Ext.data.*',
	    'Ext.grid.*',
	    'Ext.util.*',
	    'Ext.ux.data.PagingMemoryProxy',
	    'Ext.ux.ProgressBarPager'
	]);


//	Ext.QuickTips.init();

    var viewport = Ext.create('Workspace.editorjava.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });
}
