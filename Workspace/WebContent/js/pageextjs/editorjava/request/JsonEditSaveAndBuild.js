//Parameters :
// - params
// - application
// - build
// - className
Ext.define('Workspace.editorjava.request.JsonEditSaveAndBuild',  {
	requires: [
		'Workspace.common.tool.Pop',
		'Workspace.common.window.WindowResultText'
   	]
	,
	extend: 'Workspace.editorjava.request.JsonEditSaveFile'
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditSaveAndBuild constructor');
        var me = this;
        var filename = config.params.filename;

		Workspace.common.tool.Pop.info("Saving complete '" + filename + "'.");
        config.callback = function(options, success, response) { 

    		if (config.build == 'true') {
    			Ext.Ajax.request({
    				method:'POST',
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject',
    				callback:function(options, success, responseCompile) {
    					Workspace.common.tool.Pop.info("Building complete.");
    					var jsonData = Ext.JSON.decode(responseCompile.responseText);
    					if (jsonData.success) {
    						if (config.autoDeploy == true) {
	    		    			Ext.Ajax.request({
	    		    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeployBuild',
	    		    				callback:function(opts, success, response) {
	    		    					var jsonData = Ext.JSON.decode(response.responseText);
	    		    					var pop = Workspace.common.tool.Pop.info('AutoDeploy complete ' + jsonData.results + ' file(s).');
	    		    					if (jsonData.results > 0) {
	    		    						var message = 'AutoDeploy complete<br>';
	    		    						for(var i=0 ; i<jsonData.results ; i++) {
	    		    							data = jsonData.autodeploy[i];
	    		    							message += data.src + "=>" +  data.dst + "<br>";
	    		    						}
	    		    						console.info('Workspace.editorjava.request.JsonEditSaveAndBuild message:' + message);
	    		    						var toast = pop.toast;
	    		    						Ext.fly(toast.body.dom).on('click', function () {
	    		    							toast.doClose();
	    		    							Workspace.common.tool.Pop.info(message);
	    		    						}, me);
	    		    					}
	    		    				},
	    		    				params:{application:me.application}
	    		    			});
    						}
    					} else {
	    					Ext.create('Workspace.common.window.WindowTextCompile', jsonData).show();
    					}
    				},
    				params:{application:me.application,target:'compile',className:me.className}
    			});
    		}
    		else if (config.autoDeploy == true) {
    			Ext.Ajax.request({
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeployWebContent',
    				callback:function(opts, success, response) {
    					Workspace.common.tool.Pop.info("AutoDeploy complete '" + filename + "'.");
    				},
    				params:{filename:filename}
    			});
			}
    	};

        Ext.apply(me, config);

        me.callParent();
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndBuild');});