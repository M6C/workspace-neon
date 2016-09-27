//Parameters :
// - callback
// - params
// - application
Ext.define('Workspace.editorjava.request.JsonEditSaveFile',  {

	method:'POST',
	url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditSaveFile',

	callback:function(options, success, response) {},

    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    },

    success: function(response, opts) {},
    failure: function(response, opts) {},

    request: function() {
        var me = this;
        Ext.Ajax.request({
            success: me.success,
            failure: me.failure,
            url: me.url,
            method: me.method,
            params: me.params,
            callback: me.callback
        });
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveFile');});