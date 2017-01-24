Ext.define('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd',  {
	requires: ['Workspace.common.tool.Toast']
	,
    request: function(callBackSuccess) { 
        var me = this;
		Ext.Ajax.request({  
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointAdd'+
			    '&application=' + escape(me.application) + 
			    "&pathToExpand=" + escape(me.path) + 
			    "&FileName=" + escape(me.filename) + 
			    "&breakpointClass=" + escape(me.class) + 
			    "&breakpointLine=" + me.line
			,
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params :{filename:me.panelId},
			success: function (result, request) {
			},
			failure: function ( result, request ) {
				alert('failure');
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugBreakpointAdd');});