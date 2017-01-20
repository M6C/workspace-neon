Ext.define('Workspace.editorjava.panel.center.PanelCenterEditor', {
	// REQUIRED
	requires: [
      // Explicit load required library (Mandatory for extending this class)
	  'Workspace.editorjava.panel.center.function.AddTabSave',
	  'Workspace.editorjava.panel.center.function.AddTabSaveAll',
	  'Workspace.editorjava.panel.center.function.AddTabReload',
	  'Workspace.editorjava.request.JsonEditLoadFile'
	]
	,
	extend: 'Ext.panel.Panel'
	,
	alias: 'widget.panelCenterEditor',
	alternateClassName: 'PanelCenterEditor'
	,
	elements: 'body,tbar',
	layout: 'fit',
	collapsed: false,
    stateful:false,
//	hideCollapseTool: false,
//	hideMode: 'visibility',
    initComponent : function(){
		var me = this;

		var panel = Ext.create('Ext.panel.Panel', {
			id: me.panelEditorId
		});

		var loadRequest = Ext.create('Workspace.editorjava.request.JsonEditLoadFile', {
			panelId: me.panelId,
			panelEditorId: me.panelEditorId
		});

        var titleTech = me.raw.contentType;
        if (me.raw.build == 'true') {
            titleTech += '|build';
        }
        if (me.raw.autoDeploy === true) {
            titleTech += '|autoDeploy';
        }
        var title = me.panelId;
        title = Workspace.tool.UtilString.cuteSplitPath(title, 10);
		Ext.apply(me, {
		    tbar: Ext.create('Ext.toolbar.Toolbar', {
		    	cls: 'x-panel-header',
		    	height: 25,
			        items: [
						'<span style="color:#555555" title="'+titleTech+'">' + '<img src="'+DOMAIN_NAME_ROOT+'/imgExtJs/EditorJava/icon_info.gif" width="12px" height="12px"/>' + 
						'</span>&nbsp;<span style="color:#4067B3" title="'+me.panelId+'">' + title + '</span>',
					    '->',
					    {
					    	text: 'Save', 
					    	handler:  function(button, e) {
					            var editor = ace.edit(me.panelEditorId);
					    		Workspace.editorjava.panel.center.function.AddTabSave.call(editor)
				    		}
					    },
			            {
					    	text: 'Reload',
					    	handler:  function(button, e) {
					            var editor = ace.edit(me.panelEditorId);
					    		Workspace.editorjava.panel.center.function.AddTabReload.call(editor)
					    	}
			            }
			        ]
		    })
		    ,
		    items: [
		        panel
		    ],
		    listeners : {
		    	'show': function(tab, option) {

					var editor = ace.edit(me.panelEditorId);
					Ext.apply(editor, {
					    id: me.panelEditorId,
            			panelId: me.panelId,
						panelEditorId: me.panelEditorId,
            			application: me.application,
						build: me.build,
						autoDeploy: me.autoDeploy,
            		    stateful:false
					});

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandSave');
				    Workspace.editorjava.aceeditor.command.CommandSave.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandSaveAll');
				    Workspace.editorjava.aceeditor.command.CommandSaveAll.addCommand(editor);

				    Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandCompletion');
				    Workspace.editorjava.aceeditor.command.CommandCompletion.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandOptimizeImport');
				    Workspace.editorjava.aceeditor.command.CommandOptimizeImport.addCommand(editor);

					Ext.Loader.syncRequire('Workspace.editorjava.aceeditor.command.CommandCloseTab');
				    Workspace.editorjava.aceeditor.command.CommandCloseTab.addCommand(editor);

                    if (Ext.isDefined(me.tab) && Ext.isDefined(editor.raw)) {
    		            me.tab.setTooltip('encoding:' + editor.raw.encoding);
                    }

					var callBackSuccess = function() {
					    me.editorFocusAndScroll(me);
					    me.expandTree(tab);
					}

					if (!editor.dirty) {
						loadRequest.request(callBackSuccess);
					} else {
						callBackSuccess();
					}
		    	}
				,
				beforeclose: function(tab, option) {
					var editor = ace.edit(tab.panelEditorId);
					if (editor.dirty) {
        	        	Ext.Msg.confirm('Close', 'This file has been modified.<br>Confirm close ?', function(btn, text){
				            var mainCenterPanel=tab.up('tabpanel');
        	        	    if (btn == 'yes') {
        	        	        editor.dirty = false;
				                mainCenterPanel.remove(tab);
        	        	    } else {
				                mainCenterPanel.setActiveTab(tab);
				                editor.focus();
        	        	    }
        	        	});
					}
				    return !editor.dirty;
		    	}
				,
				removed: function(tab, container, option) {
			        // Return 
			        // true:if each method have running to the end (id not find)
			        // integer value (0...): index where id is find
			        if (Ext.isDefined(container.tabRemovedStack)) {
    			        var notFind = Ext.each(container.tabRemovedStack, function(item) {
    				        return item.id != tab.raw.id;
    				    });
    				    if (notFind === true) {
        				    container.tabRemovedStack.push(tab.raw);
    				    }
			        }
				}
		    }
	    });
		me.callParent(arguments);
	}
	,
	expandTree: function(tab) {
		console.debug('Workspace.editorjava.panel.center.PanelCenterEditor expandTree');
		var me = this;
		var cnt = 10;
		var field = 'text';
		var separator = '\\';

		var comboStore = Ext.getCmp('comboProject').getStore();
		var tree = Ext.getCmp('treeDirectory');
		var current = tree.getRootNode();
		var application;
		var task;

		var delayedFnTree = function(){
	        if(current.isLoading() && (cnt-- > 0)) {
				// Waiting...
				console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' Waiting... ('+field+':'+current.get(field)+',cnt:'+cnt+',loading:'+current.isLoading()+')');
				task.delay(500, delayedFnTree);
	        } else {
				var path = separator + tab.raw.path;

				tree.expandPath(path, field, separator, function(success, node) {
    				var editor = ace.edit(tab.panelEditorId);
	                editor.focus();
	                tab.focus();
				});
	        }
		};

		var delayedFnCombo = function(){
	        if(comboStore.isLoading() && (cnt-- > 0)) {
				// Waiting...
				console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' Waiting... (Combo Project Loading - Tab project:\'' + tab.raw.application + '\',cnt:'+cnt+',loading:'+comboStore.isLoading()+')');
				task.delay(500, delayedFnCombo);
	        } else {
	        	application = Ext.getCmp('project').value;
				if (Ext.isDefined(tab.raw) && tab.raw.application != application) {
					console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' is not on current project ! Tab project:\'' + tab.raw.application + '\' Current project:\'' + application + '\'');
					return true;
				} else {
					task.delay(0, delayedFnTree);
				}
	        }
		};

		task = new Ext.util.DelayedTask();
		task.delay(0, delayedFnCombo);
	}
	,
	editorFocusAndScroll: function(me) {
		var editor = ace.edit(me.panelEditorId);
        editor.doListenerChange = false;
	    editor.focus();

	    var cursorRow = (Ext.isDefined(editor.cursorRow) ? editor.cursorRow : 0);
	    var cursorCol = (Ext.isDefined(editor.cursorCol) ? editor.cursorCol : 0);

		editor.gotoLine(cursorRow+1, cursorCol, false);
	    editor.scrollToLine(cursorRow+1, true, false, function(){});

        if (Ext.isDefined(editor.changeScrollTop) && Ext.isDefined(editor.changeScrollLeft)) {
    	    var scrollTop = editor.changeScrollTop;
    	    var scrollLeft = editor.changeScrollLeft;
    
    		editor.getSession().setScrollTop(scrollTop);
    		editor.getSession().setScrollLeft(scrollLeft);
        }

	    new Ext.util.DelayedTask().delay(500, function() {
	        editor.doListenerChange = true;
	        editor.focus();
	    });
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.PanelCenterEditor');});