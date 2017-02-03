Ext.define('Workspace.editorjava.debug.ApplyDebug', {
	requires: [
	  'Workspace.common.tool.Pop',
	  'Workspace.editorjava.debug.request.JsonDebugBreakpointAdd'
	]
    ,
	statics: {
    	apply: function(editor) {
    	    var me = Workspace.editorjava.debug.ApplyDebug;

			Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDebugStepNext');
			Workspace.editorjava.aceeditor.command.CommandDebugStepNext.addCommand(editor);

		    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDebugStepOut');
		    Workspace.editorjava.aceeditor.command.CommandDebugStepOut.addCommand(editor);

		    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandDebugResume');
		    Workspace.editorjava.aceeditor.command.CommandDebugResume.addCommand(editor);

		    editor.on('guttermousedown', function(e) {
                var row = e.getDocumentPosition().row;
                console.log(row);
                e.stop();

                var editor = e.editor;
                var target = e.domEvent.target;
                if (target.className.indexOf("ace_gutter-cell") == -1)
                    return;
                if (!editor.isFocused()) 
                    return; 
                if (e.clientX > 25 + target.getBoundingClientRect().left) 
                    return; 

                var row = e.getDocumentPosition().row;

                var callback = function (jsonData, params) {
                	me.callbackAdd(jsonData, params, editor, row)
                };
                me.add(editor.raw, row, callback);
            })
        }
		,
		callbackAdd: function (jsonData, params, editor, row) {
    	    var me = Workspace.editorjava.debug.ApplyDebug;

    	    if (!Ext.isDefined(jsonData) || !Ext.isDefined(jsonData.success || !jsonData.success)) {
				return;
			}
		
		    var breakpoints = editor.session.getBreakpoints();
		    if(typeof breakpoints[row] === typeof undefined) {
		    	if (jsonData.text == 'added') {
		            editor.session.setBreakpoint(row);
		    	} else {
		    		Workspace.common.tool.Pop.failure(me, 'Breakpoint has not be added', {toast: false, detail: Ext.encode(jsonData)});
		    	}
		    }
		    else {
		    	if (jsonData.text == 'deleted') {
		    		editor.session.clearBreakpoint(row);
		    	} else {
		    		Workspace.common.tool.Pop.failure(me, 'Breakpoint has not be removed', {toast: false, detail: Ext.encode(jsonData)});
		    	}
		    }
		}
        ,
        add: function(raw, row, callback) {
            Ext.create('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd', {
                application: raw.application, filename:raw.path, line:row, classname: raw.className
            }).request(callback);
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.ApplyDebug');});