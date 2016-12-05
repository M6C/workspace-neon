//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.request.JsonEditLoadFile',  {
	requires: ['Workspace.common.tool.Toast']
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditLoadFile constructor');
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    },

    request: function() {
        var me = this;
		Ext.Ajax.request({
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditLoadFile',
			method: 'GET',
			params :{filename:me.panelId},
			success: function (result, request) {
	    		var jsonData = Ext.decode(result.responseText);
				var results = jsonData.results;
				var resultMessage = '';
				for(i=0 ; i<results ; i++) {
					resultMessage += jsonData.data[i].text + '\r\n';
				}

				var filename = me.panelId.toLowerCase();
				var editor = ace.edit(me.panelEditorId);
		        var mode = 'text';
				ace.require("ace/ext/language_tools");
				if (filename.endsWith('.js')) {
					mode = 'javascript';
				} else if (filename.endsWith('.htm') || filename.endsWith('.xhtml')) {
					mode = 'html';
				} else if (filename.endsWith('.dtd') || filename.endsWith('.xsd') || filename.endsWith('.xsl')) {
					mode = 'xml';
				} else {
				    var idx=filename.lastIndexOf('.');
				    if (idx > 0) {
				        var mode = filename.substring(idx+1);
				    }
				}
		        editor.getSession().setMode({path: "ace/mode/" + mode, pure:true, /*other options here*/})
			    editor.setOptions({
			        enableBasicAutocompletion: true,
			        enableSnippets: true,
			        enableLiveAutocompletion: false
			    });
				editor.setValue(resultMessage);
			    editor.focus();
			    editor.scrollToLine(1, true, false, function(){});
		    	editor.gotoLine(1, 0, true);
			},
			failure: function ( result, request ) {
				alert('failure');
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditLoadFile');});