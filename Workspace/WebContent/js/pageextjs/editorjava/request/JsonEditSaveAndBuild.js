//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndBuild',  {
	requires: [
	    'Workspace.common.window.WindowWaiting',
		'Workspace.common.tool.Toast',
		'Workspace.common.window.WindowResultText'
   	]
	,
	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditSaveAndBuild constructor');
        var me = this;

        config.callback = function(options, success, response) { 

    		if (config.build == 'true') {
    			Workspace.common.window.WindowWaiting.updateWindowWaiting(me.wnd, 'Building process...');
    			Ext.Ajax.request({
    				method:'POST',
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject',
    				callback:function(options, success, response) {
    					if (success) {
    		    			Workspace.common.window.WindowWaiting.updateWindowWaiting(me.wnd, 'AutoDeploy process...');
    		    			Ext.Ajax.request({
    		    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeployBuild',
    		    				callback:function(opts, success, response) {
    		    					var jsonData = Ext.JSON.decode(response.responseText);
    		    					var message = 'AutoDeploy&nbsp;complete&nbsp;' + jsonData.results + '&nbsp;file(s).';
    		    					Workspace.common.window.WindowWaiting.hideWindowWaiting(me.wnd, message, 0);
    	    						Workspace.common.tool.Toast.show(message);
    		    				},
    		    				params:{application:me.application}
    		    			});
    					} else {
        					Workspace.common.window.WindowWaiting.hideWindowWaiting(me.wnd, "Building complete.", 1);

        					var option = {response: response};
	    					Ext.create('Workspace.common.window.WindowTextCompile', option).show();
    					}
    				},
    				params:{application:me.application,target:'compile',className:me.className}
    			});
    		}
    		else {
    			Workspace.common.window.WindowWaiting.updateWindowWaiting(me.wnd, 'AutoDeploy process...');
    			Ext.Ajax.request({
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeployWebContent',
    				callback:function(opts, success, response) {
    					var message = "Saving&nbsp;complete&nbsp;'" + me.filename + "'.";
    					Workspace.common.window.WindowWaiting.hideWindowWaiting(me.wnd, message, 0);
						Workspace.common.tool.Toast.show(message);
    				},
    				params:{filename:me.filename}
    			});
    		}
    	};

        Ext.apply(me, config);

        me.callParent();
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndBuild');});