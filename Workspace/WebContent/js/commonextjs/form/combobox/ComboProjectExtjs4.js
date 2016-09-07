Ext.define('Workspace.common.form.combobox.ComboProjectExtjs4', {
	// REQUIRED
	requiers: ['Workspace.common.form.combobox.data.StoreProjectExtjs4']
	,
	extend: 'Workspace.common.form.combobox.ComboExtjs4'
	,
	alias: 'widget.comboProjectExtjs4',
	alternateClassName: 'ComboProjectExtjs4'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
		    store: Ext.create('Workspace.common.form.combobox.data.StoreProjectExtjs4')
	    });
	    me.callParent(arguments);
	},
    displayField:'project',
    emptyText:'Select a project...'

}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.ComboProjectExtjs4');});