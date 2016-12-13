Ext.define('Workspace.common.tool.Pop', {
	requires: ['Workspace.common.tool.Toast']
	,
	statics: {

		info : function(message, toast = true) {
			var ret = {};
			if (toast) {
				ret.toast = Workspace.common.tool.Toast.show(Ext.util.Format.htmlDecode(message));
			}
			return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Pop');});