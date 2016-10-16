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

				var filename = me.panelId.toLowerCase();
				var editor = ace.edit(me.panelEditorId);
				if (filename.endsWith('.java')) {
					editor.getSession().setMode("ace/mode/java");
				} else if (filename.endsWith('.js')) {
					editor.getSession().setMode("ace/mode/javascript");
				} else if (filename.endsWith('.html') || filename.endsWith('.htm')) {
					editor.getSession().setMode("ace/mode/html");
				} else if (filename.endsWith('.xml')) {
					editor.getSession().setMode("ace/mode/xml");
				} else if (filename.endsWith('.ini')) {
					editor.getSession().setMode("ace/mode/ini");
				} else if (filename.endsWith('.json')) {
					editor.getSession().setMode("ace/mode/json");
				} else if (filename.endsWith('.jsp')) {
					editor.getSession().setMode("ace/mode/jsp");
				} else if (filename.endsWith('.properties')) {
					editor.getSession().setMode("ace/mode/properties");
				} else {
					editor.getSession().setMode("ace/mode/text");
				}
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