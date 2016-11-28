Ext.define('Workspace.filebrowser.form.combobox.ComboProject', {

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
				'select': function (combo, record, index) {
					me.manageOldTab(combo, record, index);
					me.manageNewTab(combo, record, index);
				}
			}
		});
		me.callParent(arguments);
	}
	,
	manageOldTab : function ( combo, record, index ) {
		var application = Ext.getCmp('project').value;
		console.info('Workspace.filebrowser.form.combobox.ComboProject manageOldTab application:'+application);
		// Check if application change
		if (Ext.isDefined(application) && application != record.internalId) {
			var panelId = '['+application+']';

			var mainCenterPanel=Ext.getCmp('mainCenterPanel');
			var panel=mainCenterPanel.getComponent(panelId);
			var gridId = 'gridFileExplorer_'+panelId;
			// Check if old tab exist
			if (Ext.isDefined(panel)) {
				// Set close button visibility
				panel.tab.closeEl.setVisible(true);
				panel.getComponent(gridId).root=false;
			}
		}
	},
	manageNewTab : function (cmb, record, index){
		var application = record[0].data.project;
		console.info('Workspace.filebrowser.form.combobox.ComboProject manageNewTab application:'+application);

		Ext.getCmp('project').value=application;

		var tree = Ext.getCmp("treeDirectory");
		tree.getStore().getProxy().extraParams.path = '';
		tree.getStore().getProxy().extraParams.application = application;//Ext.getCmp('project').value;//record.data.project;
		tree.getStore().load(
			new Ext.data.Operation({
				action:'read'
			})
		);

		// Create new tab with closableless state at 1st position
		var raw = {contentType:'directory', id:'['+application+']', path:'', application:application};
		Workspace.filebrowser.panel.center.function.AddTab.call(raw, 0, false);
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.form.combobox.ComboProject');});