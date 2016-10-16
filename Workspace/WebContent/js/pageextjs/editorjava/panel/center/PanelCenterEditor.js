Ext.define('Workspace.editorjava.panel.center.PanelCenterEditor', {
	// REQUIRED
	requires: [
      // Explicit load required library (Mandatory for extending this class)
	  'Workspace.editorjava.panel.center.function.AddTabSave',
	  'Workspace.editorjava.panel.center.function.AddTabReload'
	]
	,
	extend: 'Ext.panel.Panel'
	,
	alias: 'widget.panelCenterEditor',
	alternateClassName: 'PanelCenterEditor'
	,
	elements: 'body,tbar',
	closable:true,
	layout: 'fit',
    initComponent : function(){
		var me = this;
	
		Ext.apply(me, {
		    items: [
				Ext.create('Ext.panel.Panel', {
					id: me.panelEditorId,
					panelId: me.panelId
				})
		    ],
		    tbar: Ext.create('Ext.toolbar.Toolbar', {
		    	cls: 'x-panel-header',
		    	height: 25,
			        items: [
	//								    '<span style="color:#15428B; font-weight:bold">Title Here</span>',
					    '->',
					    {
					    	text: 'Save', 
					    	handler:  function(button, e) {
					    		Workspace.editorjava.panel.center.function.AddTabSave.call(panelId, panelEditorId)
				    		}
					    },
			            {
					    	text: 'Reload',
					    	handler:  function(button, e) {
					    		Workspace.editorjava.panel.center.function.AddTabReload.call(panelId, panelEditorId)
					    	}
			            }
			        ]
		    })
		    ,
		    listeners : {
		    	'render': function() {
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
		    }
	    });
		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.PanelCenterEditor');});