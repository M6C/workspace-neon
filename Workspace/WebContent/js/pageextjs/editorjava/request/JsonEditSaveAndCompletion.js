//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndCompletion',  {
	requires: [
	    'Workspace.common.window.WindowWaiting'
   	]
   	,
	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditSaveAndCompletion constructor');
        var me = this;

        config.params.filename += "." + Date.now() + ".tmp";
        config.callback = function(options, success, response) {
			console.info('Workspace.editorjava.request.JsonEditSaveAndCompletion JsonEditSaveFile callback');
    		Workspace.common.window.WindowWaiting.updateWindowWaiting(me.wnd, 'Completion process...');

    		Ext.Ajax.request({
    			method:'GET',
    			url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
    			callback:function(opts, success, response) {
    				Workspace.common.window.WindowWaiting.hideWindowWaiting(me.wnd, "Completion complete.", 1);
    				config.callbackCompletion(opts, success, response);
    			},
    			params:{filename:config.params.filename,caretPos:config.params.caretPos,deleteFile:'true'}
    		});
    	};

        Ext.apply(me, config);

        me.callParent();
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndCompletion');});