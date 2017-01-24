Ext.define('Workspace.editorjava.debug.ApplyDebug', {
	requires: [
	  'Workspace.editorjava.debug.request.JsonDebugBreakpointAdd'
	]
    ,
	statics: {
    	apply: function(editor) {
    	    console.debug('Workspace.editorjava.debug.ApplyDebug apply');
    
            editor.on('guttermousedown', function(e) {
                console.log(e.getDocumentPosition().row);
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
                    if(typeof breakpoints[row] === typeof undefined)
                        e.editor.session.setBreakpoint(row);
                    else
                        e.editor.session.clearBreakpoint(row);
                };
                Ext.create('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd', callback);
            })
        }
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.ApplyDebug');});