Ext.define('Workspace.editorjava.debug.request.JsonDebugVariable',  {

    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    }
	,
    request: function(paramCallBack) { 
        var me = this;
		Ext.Ajax.request({  
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointVariableExtJs',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			callback:function(opts, success, response) {
                if (Ext.isDefined(paramCallBack)) {
                	var jsonData;
    	    		if (success) {
    	    			jsonData = response.responseText;//Ext.decode(response.responseText);
    	    		}
                	paramCallBack(jsonData);
                }
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugVariable');});