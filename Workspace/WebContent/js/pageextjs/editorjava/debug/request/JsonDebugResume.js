Ext.define('Workspace.editorjava.debug.request.JsonDebugResume',  {
	requires: ['Workspace.common.tool.Toast']
	,
    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    }
	,
    request: function(paramCallBack) { 
        var me = this;
		Ext.Ajax.request({  
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerBreakpointResume',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			callback:function(opts, success, response) {
                Workspace.common.tool.Pop.info(me, 'Resume&nbsp;Debug');
                if (Ext.isDefined(paramCallBack)) {
                	var jsonData;
    	    		if (success) {
    	    			jsonData = Ext.decode(response.responseText);
    	    		}
                	paramCallBack(jsonData);
                }
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugResume');});