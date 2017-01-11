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

        config.callback = Ext.Function.createSequence (me.callback, me.callbackBuild);

        Ext.apply(me, config);

        me.callParent();
    },
    callbackBuild: function(options, success, response) {
    	var me = this;
        var me_static = Workspace.editorjava.request.JsonEditSaveAndBuild;

		if (me.build == 'true') {
			Ext.Ajax.request({
				method:'POST',
				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditCompileProject',
				callback:function(options, success, responseCompile) {
					var jsonData = Ext.JSON.decode(responseCompile.responseText);
                    var msg = "Building complete.";
					if (jsonData.success && me.autoDeploy == true) {
                        msg += "<br>Waiting for deploy complet."
					}
					Workspace.common.tool.Pop.info(me, msg);
					if (jsonData.success) {
						if (me.autoDeploy == true) {
    		    			Ext.Ajax.request({
    		    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeploy',
    		    				callback:me.callbackAutoDeploy,
    		    				params:{application:me.application}
    		    			});
						}
					} else {
		                me_static.modifyDirty(false);
    					Ext.create('Workspace.common.window.WindowTextCompile', jsonData).show();
					}
				},
				params:{application:me.application,target:'compile',className:me.className}
			});
		}
		else if (me.autoDeploy == true) {
			var filename = options.params.filename;
			Ext.Ajax.request({
				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonAutoDeploy',
				callback:me.callbackAutoDeploy,
				params:{filename:filename}
			});
		} else {
		    me_static.modifyDirty(!success);
		}
	},
    callbackAutoDeploy: function(opts, success, response) {
        var me = Workspace.editorjava.request.JsonEditSaveAndBuild;
		var jsonData = Ext.JSON.decode(response.responseText);
		if (jsonData.results > 0) {
			var cntSuccess = 0, cntFailure = 0;
			var messageSuccess = '';
			var messageFailure = '';
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
	    me.modifyDirty(!success);
	},
	statics: {
    	modifyDirty: function(dirty) {
            var me = Workspace.editorjava.request.JsonEditSaveAndBuild;
            if (Ext.isDefined(me.panelEditorId)) {
        		var editor = ace.edit(me.panelEditorId);
        		editor.dirty = dirty;
            }
    	},
		showMessage: function(type, cnt, message) {
			var me = this;
			if (cnt > 0) {
				Workspace.common.tool.Pop.show(type, me, 'AutoDeploy ' + type + ' ' + cnt + ' file(s).', {detail:message});
			}
		}
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditSaveAndBuild');});