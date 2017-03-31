Ext.define('Workspace.editorjava.constant.ConstantState', {

	statics: {
	    _inProgressInitialize: false,
	    _inProgressBuild: false,

	    inProgressInitialize: function(value) {
	        var me = Workspace.editorjava.constant.ConstantState;
		    if (Ext.isDefined(value)) {
		        me._inProgressInitialize = value;
		    }
		    return me._inProgressInitialize;
		},
		inProgressBuild: function(value) {
	        var me = Workspace.editorjava.constant.ConstantState;
		    if (Ext.isDefined(value)) {
		        me._inProgressBuild = value;
		    }
		    return me._inProgressBuild;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.constant.ConstantState');});