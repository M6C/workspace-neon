Ext.define('Workspace.editorjava.panel.center.function.AddTabAce',  {
	// REQUIRED
	requires: [
	     'Workspace.editorjava.panel.center.function.AddTabSave',
	     'Workspace.editorjava.panel.center.function.AddTabReload'
	]
	,
	statics: {

		call : function(raw) {
		    console.info('Workspace.editorjava.panel.center.function.AddTab.call');
			if (raw.contentType!='directory') {
				//var panelId='['+comboRecord.data.project+']'+raw.id;
				var panelId=raw.id;//'['+Ext.getCmp('project').value+']'+raw.id;
				var panelEditorId=panelId+'Editor';
				var mainCenterPanel=Ext.getCmp('mainCenterPanel');

				var panelTab = Ext.getCmp(panelId);
				if (panelTab == undefined) {
					// Explicit load required library (Mandatory for extending this class)
					Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabSave');
					Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabReload');
	
					mainCenterPanel.add({
						title: raw.text,
						id: panelId,
						elements: 'body,tbar',
						closable:true,
						layout: 'fit',
					    items: [
								Ext.create('Ext.panel.Panel', {
									id: panelEditorId,
									panelId: panelId
								})
					    ],
					    tbar: Ext.create('Ext.toolbar.Toolbar', {
					    	cls: 'x-panel-header',
					    	height: 25,
	//				        initComponent : function(){
	//				    		var me = this;
	//
	//				    		Ext.apply(me, {
							        items: [
	//								    '<span style="color:#15428B; font-weight:bold">Title Here</span>',
									    '->',
									    {
									    	text: 'Save', 
									    	handler:  function(button, e) {
									    		// Explicit load required library (Mandatory for extending this class)
									    		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabSave');
	
									    		Workspace.editorjava.panel.center.function.AddTabSave.call(panelId, panelEditorId)
								    		}
									    },
							            {
									    	text: 'Reload',
									    	handler:  function(button, e) {
									    		// Explicit load required library (Mandatory for extending this class)
									    		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabReload');
	
									    		Workspace.editorjava.panel.center.function.AddTabReload.call(panelId, panelEditorId)
									    	}
							            }
							        ]
	//				    	    });
	//				    	    me.callParent(arguments);
	//				    	}
					    })
					    ,
					    listeners : {
					    	'render': function() {
								var filePanel = mainCenterPanel.getComponent(panelId);
								mainCenterPanel.setActiveTab(filePanel);
							
								Ext.Ajax.request({
									url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditLoadFile',
									method: 'GET',
									params :{filename:panelId},
									success: function ( result, request ) {
							    		var jsonData = Ext.decode(result.responseText);
										var results = jsonData.results;
										var resultMessage = '';
										for(i=0 ; i<results ; i++) {
											resultMessage += jsonData.data[i].text + '\r\n';
										}
	
										var editor = ace.edit(panelEditorId);
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
					panelTab = Ext.getCmp(panelId);
					mainCenterPanel.setActiveTab(panelTab);
				} else {
					mainCenterPanel.setActiveTab(panelTab);
					var editor = ace.edit(panelEditorId);
				    editor.focus();
				}
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.AddTabAce');});