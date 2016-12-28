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

		Workspace.common.tool.Pop.info(me, "Saving complete '" + filename + "'.");
        config.callback = function(options, success, response) { 

    		if (config.build == 'true') {
    			Ext.Ajax.request({
    				method:'POST',
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject',
    				callback:function(options, success, responseCompile) {
    					Workspace.common.tool.Pop.info(me, "Building complete.");
    					var jsonData = Ext.JSON.decode(responseCompile.responseText);
    					if (jsonData.success) {
    						if (config.autoDeploy == true) {
	    		    			Ext.Ajax.request({
	    		    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeployBuild',
	    		    				callback:me.callbackAutoDeploy,
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
    				callback:me.callbackAutoDeploy,
    				params:{filename:filename}
    			});
			}
    	};

        Ext.apply(me, config);

        me.callParent();
    },
    callbackAutoDeploy: function(opts, success, response) {
        var me = Workspace.editorjava.request.JsonEditSaveAndBuild;
		var jsonData = Ext.JSON.decode(response.responseText);
		if (jsonData.results > 0) {
			var cntSuccess = 0, cntFailed = 0;
			var messageSuccess = 'AutoDeploy Success<br>';
			var messageFailure = 'AutoDeploy Failed<br>';
			for(var i=0 ; i<jsonData.results ; i++) {
				data = jsonData.autodeploy[i];
				if (data.success == false) {
					cntFailure++;
					Workspace.common.tool.Pop.error(me, data.msg, false, true);
					messageFailure += data.msg + "<br>";
				} else {
					cntSuccess++;
					messageSuccess += data.src + "=>" +  data.dst + "<br>";
				}
			}
			me.showMessage('success', cntSuccess, messageSuccess);
			me.showMessage('failure', cntFailure, messageFailure);
		} else {
			Workspace.common.tool.Pop.info(me, 'AutoDeploy No file deployed.');
		}
	},
	statics: {
		showMessage: function(type, cnt, message) {
			var me = this;
			if (cnt > 0) {
				console.info('Workspace.editorjava.request.JsonEditSaveAndBuild message ' + type + ':' + message);
				var pop = Workspace.common.tool.Pop.show(type, me, 'AutoDeploy ' + type + ' ' + cnt + ' file(s).');
				var toast = pop.toast;
				Ext.fly(toast.body.dom).on('click', function () {
					toast.doClose();
					Workspace.common.tool.Pop.show(type, me, message);
				}, me);
			}
		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndBuild');});