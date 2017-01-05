//Parameters :
// - callback
// - params
// - application
Ext.define('Workspace.editorjava.request.JsonEditSaveFile',  {

	method:'POST',
	url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditSaveFile',

	callback:function(options, success, response) {
        var me = this;
        var filename = me.params.filename;

        var msg = "Saving complete '" + filename + "'.";
        if (me.build == 'true') {
            msg += "<br>Waiting for building project complet."
        } else if (me.autoDeploy == true) {
            msg += "<br>Waiting for deploy complet."
        }
		Workspace.common.tool.Pop.info(me, msg);
	},

    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditSaveFile constructor');
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    },

    success: function(response, opts) {},
    failure: function(response, opts) {},

    request: function() {
        var me = this;
//        me.wnd = Workspace.common.window.WindowWaiting.showWindowWaiting();
//		Workspace.common.window.WindowWaiting.updateWindowWaiting(me.wnd, 'Saving...');
        Ext.Ajax.request({
            success: me.success,
            failure: me.failure,
            url: me.url,
            method: me.method,
            params: me.params,
            callback: me.callback,
            scope: me
        });
//        me.callback(null, true, null);
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveFile');});