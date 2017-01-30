Ext.define('Workspace.editorjava.debug.request.JsonDebugCheck',  {
	requires: ['Workspace.common.tool.Pop',
	     	  'Workspace.editorjava.debug.request.JsonDebugStart',
	    	  'Workspace.editorjava.debug.request.JsonDebugStop']
	,
	statics: {
        start: function() {
            var me = Workspace.editorjava.debug.request.JsonDebugCheck;
            if (!Ext.isDefined(me._delay)) {
            	var callback = new function() {
                    Workspace.common.tool.Pop.info(me, 'Start&nbsp;Waiting&nbsp;Debug');
                    me._delay = new Ext.util.DelayedTask();
                    me._delay.delay(0, me._check);
            	}
                Ext.create('Workspace.editorjava.debug.request.JsonDebugStart').request(callback);
            }
        }
        ,
        stop: function() {
            var me = Workspace.editorjava.debug.request.JsonDebugCheck;
            if (Ext.isDefined(me._delay)) {
            	var callback = new function() {
                    Workspace.common.tool.Pop.info(me, 'Stop&nbsp;Waiting&nbsp;Debug');
                    me._delay.cancel();
                    me._delay = undefined;
            	}

            	Ext.create('Workspace.editorjava.debug.request.JsonDebugStop').request(callback);
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
    	    		console.info('Workspace.editorjava.debug.request.JsonDebugCheck check callback success:' + success);
    	    		if (success) {
    	    			me._delay.delay(me._time, me._check);
    	    		}
    			}
    		});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugCheck');});