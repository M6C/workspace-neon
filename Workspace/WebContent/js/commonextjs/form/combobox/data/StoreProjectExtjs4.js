Ext.define('Workspace.common.form.combobox.data.StoreProjectExtjs4', {
	// REQUIRED
	requiers: ['Workspace.data.model.Project']
	,
	extend: 'Ext.data.Store',

   	model: 'Workspace.data.model.Project',
    proxy: {
        type: 'ajax',
        url : '/WorkSpace/action.servlet?event=JsonProjectName',
       	reader : {
			type: 'json',
			idProperty: 'project',
			root: 'data'
	    }
    }
//	,autoLoad: true
}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.data.StoreProjectExtjs4');});
