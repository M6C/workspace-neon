Ext.define('Workspace.common.form.combobox.ComboPackageExtjs4', {
	// REQUIRED
	requiers: ['Workspace.common.form.combobox.data.StorePackageExtjs4']
	,
	extend: 'Workspace.common.form.combobox.ComboExtjs4'
	,
	alias: 'widget.comboPackageExtjs4',
	alternateClassName: 'ComboPackageExtjs4'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
		    store: Ext.create('Workspace.common.form.combobox.data.StorePackageExtjs4')
	    });
	    me.callParent(arguments);
	},
    displayField:'project',
    emptyText:'Select a project...'

}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.ComboPackageExtjs4');});