function init_page() {

	Ext.Loader.setPath('Workspace.editorjava', DOMAIN_NAME_ROOT + '/js/pageextjs/editorjava');

// DEPENDENCE
	Ext.Loader.setConfig({enabled: true, origine:DOMAIN_NAME_ROOT});
	Ext.Loader.setPath('Ext.ux', DOMAIN_NAME_ROOT + '/jsFramework/ext-4.0.7/examples/ux');
//	Ext.Loader.setPath('Ext.ux', '../ux/');
//	Ext.Loader.setPath("Ext.ux", "http://cdn.sencha.io/ext-4.0.7-gpl/examples/ux");
//	Ext.Loader.setPath("Ext.ux", "http://plus.xsense.co.th/ext-4.0.7/examples/ux");

	Ext.require([
	    'Ext.data.*',
	    'Ext.grid.*',
	    'Ext.util.*',
	    'Ext.ux.PagingMemoryProxy',
	    'Ext.ux.ProgressBarPager'
	]);


//	Ext.QuickTips.init();

    var viewport = Ext.create('Workspace.editorjava.view.ViewMain', {
    	renderTo: Ext.getBody(),
    	id: 'mainView'
    });
}
