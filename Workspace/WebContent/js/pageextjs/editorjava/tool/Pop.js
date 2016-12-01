Ext.define('Workspace.editorjava.tool.Pop', {
	requires: ['Workspace.common.tool.Toast']
	,
	statics: {

		info : function(message, toast = true) {
			if (toast) {
				Workspace.common.tool.Toast.show(Ext.util.Format.htmlDecode(message));
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tool.Pop');});