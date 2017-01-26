Ext.define('Workspace.editorjava.debug.ApplyDebug', {
	requires: [
	  'Workspace.editorjava.debug.request.JsonDebugBreakpointAdd'
	]
    ,
	statics: {
    	apply: function(editor) {
    	    console.debug('Workspace.editorjava.debug.ApplyDebug apply');
    	    var me = Workspace.editorjava.debug.ApplyDebug;
    
            editor.on('guttermousedown', function(e) {
                var row = e.getDocumentPosition().row;
                console.log(row);
                e.stop();

                var callback = function () {
                    var target = e.domEvent.target; 
                    if (target.className.indexOf("ace_gutter-cell") == -1)
                        return;
                    if (!editor.isFocused()) 
                        return; 
                    if (e.clientX > 25 + target.getBoundingClientRect().left) 
                        return; 
                
                    var breakpoints = e.editor.session.getBreakpoints();
                    var row = e.getDocumentPosition().row;
                    if(typeof breakpoints[row] === typeof undefined) {
                        e.editor.session.setBreakpoint(row);
                    }
                    else {
                        e.editor.session.clearBreakpoint(row);
                    }
                };
                me.add(editor.raw, row, callback);
            })
        }
        ,
        add: function(raw, row, callback) {
            Ext.create('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd', {
                filename:raw.path, breakpointLine:row, breakpointClass: raw.className
            }).request(callback);
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.ApplyDebug');});