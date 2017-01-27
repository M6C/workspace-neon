Ext.define('Workspace.editorjava.debug.request.JsonDebugCheck',  {
	requires: ['Workspace.common.tool.Toast']
	,
	static: {
        start: function() {
            var me = Workspace.editorjava.debug.request.JsonDebugCheck;
            if (!Ext.isDefined(me._delay)) {
                me._delay = new Ext.util.DelayedTask();
		        task.delay(0, me._check);
            }
        }
        ,
        stop: function() {
            var me = Workspace.editorjava.debug.request.JsonDebugCheck;
            if (Ext.isDefined(me._delay)) {
                me._delay.cancel();
                me._delay = undefined;
            }
        }
        ,    
	    // private
	    _delay: undefined,
	    _time: 1000
	    ,
        _check: function() { 
            var me = Workspace.editorjava.debug.request.JsonDebugCheck;
    		Ext.Ajax.request({  
    			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointCheck',
    			headers: {'Content-Type': 'application/json; charset=UTF-8'},
    			method: 'GET',
    			callback:function(opts, success, response) {
				    task.delay(me._time, me._check);
    			}
    		});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugCheck');});