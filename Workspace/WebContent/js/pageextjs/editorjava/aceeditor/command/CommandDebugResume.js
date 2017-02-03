Ext.define('Workspace.editorjava.aceeditor.command.CommandDebugResume',  {
	requires: [
  	     'Workspace.common.tool.Pop',
	]
	,
	statics: {
	    addCommand: function(editor) {
		    editor.commands.addCommand({
		        name: "editorDebugResume",
		        bindKey: {win: "Ctrl-F8", mac: "'Command-F8"},
		        exec: function(container) {
		        	var me = Workspace.editorjava.aceeditor.command.CommandDebugResume;

		        	var mainCenterPanel = Ext.getCmp('mainCenterPanel');
	                if (mainCenterPanel.isDebugging()) {
	        			Ext.create('Workspace.editorjava.debug.request.JsonDebugResume').request(me.callbackResume);
	                } else {
	            		Workspace.common.tool.Pop.failure(me, 'Debuger is disabled', {toast: false});
	                }
		        }
		    });
	    }
		,
		callbackResume: function (jsonData, params) {
			var me = Workspace.editorjava.aceeditor.command.CommandDebugResume;

			var mainCenterPanel = Ext.getCmp('mainCenterPanel');
            mainCenterPanel.initializeButtonDebug();

            Workspace.common.tool.Pop.info(me, 'Resume');
		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandDebugResume');});