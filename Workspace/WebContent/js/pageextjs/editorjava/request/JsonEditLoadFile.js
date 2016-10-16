//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.request.JsonEditLoadFile',  {

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

				var editor = ace.edit(me.panelEditorId);
				editor.getSession().setMode("ace/mode/java");
				editor.setValue(resultMessage);
			    editor.gotoLine(1);
			    editor.focus();

				Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandCompletion');
			    Workspace.editorjava.aceeditor.command.CommandCompletion.addCommand(editor);
			},
			failure: function ( result, request ) {
				alert('failure');
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditLoadFile');});