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

        if (!Ext.isDefined(me.showMessage) || me.showMessage == true) {
            var msg = "Saving complete.";
            if (me.build == 'true') {
                msg += " Waiting for building project complet."
            } else if (me.autoDeploy == true) {
                msg += " Waiting for deploy complet."
            }
    		Workspace.common.tool.Pop.info(me, msg, {detail:"'" + filename + "'"});
        }
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
        if (!Ext.isDefined(me.showMessage) || me.showMessage == true) {
		    Workspace.common.tool.Pop.info(me, "Saving in progress", {detail:"'" + me.params.filename + "'"});
        }
        Ext.Ajax.request({
            success: me.success,
            failure: me.failure,
            url: me.url,
            method: me.method,
            params: me.params,
            callback: me.callback,
            scope: me
        });
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveFile');});