Ext.define('Workspace.filebrowser.form.combobox.ComboProject', {
	// REQUIRED
	requiers: ['Workspace.filebrowser.panel.center.function.AddTab']
	,
	extend: 'Workspace.common.form.combobox.ComboProjectExtjs4'
	,
	alias: 'widget.filebrowserComboProject',
	alternateClassName: 'WorkspaceFileBrowserComboProject'
	,
    initComponent : function(){
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');

		Ext.apply(me, {
			listeners: {
				//scope: this, //yourScope
				'select': function (cmb, record, index){
					var application = record[0].data.project;
					console.info('Workspace.filebrowser.form.combobox.ComboProject select:'+application);

					Ext.getCmp('project').value=application;

					var tree = Ext.getCmp("treeDirectory");
					tree.getStore().getProxy().extraParams.path = '';
					tree.getStore().getProxy().extraParams.application = application;//Ext.getCmp('project').value;//record.data.project;
					tree.getStore().load(
						new Ext.data.Operation({
							action:'read'
						})
					);

					var raw = {contentType:'directory', id:'['+application+']', path:'', application:application};
					Workspace.filebrowser.panel.center.function.AddTab.call(raw);
				}
			}
		});
		me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.form.combobox.ComboProject');});