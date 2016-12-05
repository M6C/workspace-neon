Ext.define('Workspace.editorjava.form.combobox.ComboProject', {

	extend: 'Workspace.common.form.combobox.ComboProjectExtjs4'
	,
	alias: 'widget.editorjavaComboProject',
	alternateClassName: 'WorkspaceEditorJavaComboProject'
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			listeners: {
				//scope: this, //yourScope
				'select': function (cmb, record, index){
					var application = record[0].data.project;
					console.info('Workspace.editorjava.form.combobox.ComboProject select:'+application);

					Ext.getCmp('project').value=application;

					var tree = Ext.getCmp("treeDirectory");
					tree.getStore().getProxy().extraParams.path = '';
					tree.getStore().getProxy().extraParams.application = application;//Ext.getCmp('project').value;//record.data.project;
					tree.getStore().load(
						new Ext.data.Operation({
							action:'read'
						})
					);
				}
			}
		});
		me.callParent(arguments);
	}
	,
	manageTab: function() {
		
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.form.combobox.ComboProject');});