Ext.define('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd',  {
	requires: ['Workspace.common.tool.Toast']
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd constructor');
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    }
	,
    request: function(paramCallBack) { 
        var me = this;
		Ext.Ajax.request({  
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointAddExtJs',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params :{filename:me.filename, breakpointLine:me.line, breakpointClass: me.classname},
			callback:function(opts, success, response) {
				paramCallBack();
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd');});