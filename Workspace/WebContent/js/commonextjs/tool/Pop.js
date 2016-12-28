Ext.define('Workspace.common.tool.Pop', {
	requires: ['Workspace.common.tool.Toast']
	,
	statics: {

		show : function(type, from, message, toast = true, panelSouth = true, console = true) {
			return this.doPop(type, from, message, toast, panelSouth);
		}
		,
		info : function(from, message, toast = true, panelSouth = true, console = true) {
			return this.doPop('info', from, message, toast, panelSouth);
		}
		,
		success : function(from, message, toast = true, panelSouth = true, console = true) {
			return this.doPop('success', from, message, toast, panelSouth);
		}
		,
		error : function(from, message, toast = true, panelSouth = true, console = true) {
			return this.doPop('error', from, message, toast, panelSouth);
		}
		,
		failure : function(from, message, toast = true, panelSouth = true, console = true) {
			return this.doPop('failure', from, message, toast, panelSouth);
		}
		,
		// Private
		doPop : function(type, from, message, toast = true, panelSouth = true, logConsole = true) {
			var ret = {};

			var className = from;
			if (!Ext.isString(from)) {
				className = Ext.getClassName(from);
			}

			if (toast) {
				ret.toast = Workspace.common.tool.Toast.show(Ext.util.Format.htmlDecode(message));
			}
			if (panelSouth) {
				Ext.getCmp('mainSouthPanel').log(className, type, message);
				ret.panelSouth = true;
			}
			if (logConsole) {
		        console.info(className + ' ' + type + ':' + message);
				ret.logConsole = true;
			}
			return ret;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Pop');});