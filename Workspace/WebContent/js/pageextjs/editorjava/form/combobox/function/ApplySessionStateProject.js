Ext.define('Workspace.editorjava.form.combobox.function.ApplySessionStateProject', {
	singleton : true,
	options : {}
	,
	apply: function(panel) {
	    console.debug('Workspace.editorjava.form.combobox.function.ApplySessionStateProject apply');

	    Ext.Loader.syncRequire('Workspace.common.form.combobox.function.ApplySessionStateCombo');
	    Workspace.common.form.combobox.function.ApplySessionStateCombo.apply(panel, 'Workspace.editorjava.form.combobox.ComboProject');
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.form.combobox.function.ApplySessionStateProject');});