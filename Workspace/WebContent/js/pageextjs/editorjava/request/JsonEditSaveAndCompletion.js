//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndCompletion',  {

	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
    constructor: function(config) {
		console.info('<-666->Workspace.editorjava.request.JsonEditSaveAndCompletion constructor');
        var me = this;

//        config.params.filename += "." + Date.now() + ".tmp";
        config.callback = function(options, success, response) {
			console.info('<-666->Workspace.editorjava.request.JsonEditSaveAndCompletion JsonEditSaveFile callback');
    		Workspace.common.window.WindowWaiting.updateText('Completion process...');

    		Ext.Ajax.request({
    			method:'GET',
    			url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonCompletion',
    			callback:function(opts, success, response) {
    				Workspace.common.window.WindowWaiting.hide("Completion complete.", 1);
    				var data = response.responseText;
    				data = {
    					result: Ext.JSON.decode(data)
    				};
    				console.info('<-666->Workspace.editorjava.request.JsonEditSaveAndCompletion JsonCompletion data:' + data);
    				config.store.data = data;
    				Ext.apply(config.store.proxy, {
				        type: 'memory',
				    	reader: {
				            type: 'json',
				            root: 'result'
				        }
				    });
//    				config.store.setRootNode(data);
//    				config.store.sync();
    				config.store.load(data);
    			},
    			params:{filename:config.params.filename,caretPos:config.params.caretPos,deleteFile:'true'}
    		});
    	};

        Ext.apply(me, config);

        me.callParent();
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndCompletion');});