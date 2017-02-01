Ext.define('Workspace.editorjava.debug.request.JsonDebugStop',  {
	requires: ['Workspace.common.tool.Pop']
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
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=DebuggerStop',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			callback:function(opts, success, response) {
                if (Ext.isDefined(paramCallBack)) {
                	paramCallBack();
                }
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.debug.request.JsonDebugStop');});