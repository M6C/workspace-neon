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

			    editor.commands.addCommand({
			        name: 'Completion',
			        bindKey: {win: 'Ctrl-space',  mac: 'Command-space'},
			        exec: function(editor) {
						console.info('Workspace.editorjava.panel.center.function.AddTabAce editor.commands Ctrl-M');

						var selection = editor.selection;
						var col = selection.getCursor().column;
						var row = selection.getCursor().row;

						selection.selectToPosition({column:0,row:0});

						var txtRange = editor.session.getTextRange(editor.getSelectionRange());
						selection.selectToPosition({column:col,row:row});
						pos = txtRange.length;
						
						var txt=editor.getValue();//.getRawValue();
						txt=escape(txt);
		
						var fnOnSubmitTree = function(tree, key, e) {
							var sm = tree.getSelectionModel();
							if (sm.getSelection().length>0) {
								var node = sm.getSelection()[0];
								editor.insert('.'+node.data.text);
								this.ownerCt.close();
							}
						};
		
						var wndClasspathDetail = Ext.create('Workspace.editorjava.window.WindowCompletion', {
							pos: pos,
							txt: txt,
							filename: editor.panelId,
							callBackSubmit:fnOnSubmitTree
							,
							panelEditorId:editor
							,
							listeners : {
								'destroy' : function (wnd) {
									console.info('Workspace.editorjava.window.WindowCompletion destroy');
									editor.focus();
								}
							}
						});
						wndClasspathDetail.show();
			        },
			        readOnly: true // false if this command should not apply in readOnly mode
			    });
			},
			failure: function ( result, request ) {
				alert('failure');
			}
		});
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditLoadFile');});