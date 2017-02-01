Ext.define('Workspace.editorjava.debug.WaiterDebug',  {
	requires: ['Workspace.common.tool.Pop',
	     	   'Workspace.editorjava.debug.request.JsonDebugCheck',
	     	   'Workspace.editorjava.debug.request.JsonDebugStart',
	    	   'Workspace.editorjava.debug.request.JsonDebugStop']
	,
    debugging: false
    ,
    debug: function(callback) {
	    var me = this;
        if (!me.debugging) {
        	me.debugging = true;
            me.start(callback);
        } else {
        	me.debugging = false;
            me.stop(callback);
        }
    }
    ,
    start: function(paramcallback) {
        var me = this;
        if (!Ext.isDefined(me._delay)) {
        	var callback = function() {
                Workspace.common.tool.Pop.info(me, 'Start&nbsp;Debug');
                me._delay = new Ext.util.DelayedTask();
                me._delay.delay(0, function() {
                	me._check(paramcallback);
                });
        	}
            Ext.create('Workspace.editorjava.debug.request.JsonDebugStart').request(callback);
        }
    }
    ,
    stop: function() {
        var me = this;
        if (Ext.isDefined(me._delay)) {
        	var callback = function() {
                Workspace.common.tool.Pop.info(me, 'Stop&nbsp;Debug');
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
    _check: function(paramcallback) { 
        var me = this;
        var callback = function(jsonData) {
    		console.info('Workspace.editorjava.debug.WaiterDebug _check callback');
    		if (!Ext.isDefined(jsonData)) {
    			// Retry
				me._delay.delay(me._time, function() {
                	me._check(paramcallback);
                });
    			return;
    		}
			if (jsonData.stopped === true) {
                if (Ext.isDefined(paramcallback)) {
                	paramcallback(jsonData);
                }
			} else {
				me._delay.delay(me._time, function() {
                	me._check(paramcallback);
                });
			}
		};
        Ext.create('Workspace.editorjava.debug.request.JsonDebugCheck').request(callback);
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.WaiterDebug');});