Ext.define('Workspace.editorjava.debug.request.JsonDebugCheck',  {
	requires: ['Workspace.common.tool.Pop',
	           'Workspace.tool.UtilString',
	     	   'Workspace.editorjava.debug.request.JsonDebugStart',
	    	   'Workspace.editorjava.debug.request.JsonDebugStop']
	,
	statics: {
        start: function() {
            var me = Workspace.editorjava.debug.request.JsonDebugCheck;
            if (!Ext.isDefined(me._delay)) {
            	var callback = function() {
                    Workspace.common.tool.Pop.info(me, 'Start&nbsp;<b>Waiting</b>&nbsp;Debug');
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
            	var callback = function() {
                    Workspace.common.tool.Pop.info(me, 'Stop&nbsp;<b>Waiting</b>&nbsp;Debug');
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
    			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointCheckExtJs',
    			headers: {'Content-Type': 'application/json; charset=UTF-8'},
    			method: 'GET',
    			callback:function(opts, success, response) {
    	    		console.info('Workspace.editorjava.debug.request.JsonDebugCheck check callback success:' + success);
    	    		if (success) {
    	    			var jsonData = Ext.decode(response.responseText);
    	    			if (jsonData.stopped === true) {
    	    				var application = Workspace.tool.UtilString.decodeUtf8(jsonData.application);
    	    				var classname = Workspace.tool.UtilString.decodeUtf8(jsonData.className);
    	    				var fileName = Workspace.tool.UtilString.decodeUtf8(jsonData.fileName);
    	    				var sep = (fileName.indexOf('/')>=0 ? '/' : '\\');
    	    				var text = fileName.substring(fileName.lastIndexOf(sep) + 1);
    	    				var line = jsonData.line;

    	    				var raw = {
        	    				'text':text,
        	    				'id':fileName,
        	    				'application':application,
        	    				'path':fileName,
        	    				'className':classname,
        	    				'contentType':'text/java',
        	    				'build':'true',
        	    				'leaf':false,
        	    				'autoDeploy':true,
        	    				'cursorRow': line,
        	    				'cursorCol': 0
        	    			};

        	    			// Explicit load required library (Mandatory for extending this class)
        	    			Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
        	    			Workspace.editorjava.panel.center.function.AddTabAce.call(raw);

        	    			Ext.Loader.syncRequire('Workspace.editorjava.debug.request.JsonDebugResume');
        	            	Ext.create('Workspace.editorjava.debug.request.JsonDebugResume').request();
    	    			} else {
    	    				me._delay.delay(me._time, me._check);
    	    			}
    	    		}
    			}
    		});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugCheck');});