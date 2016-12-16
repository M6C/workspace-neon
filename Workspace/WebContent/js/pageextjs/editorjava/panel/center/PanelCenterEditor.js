Ext.define('Workspace.editorjava.panel.center.PanelCenterEditor', {
	// REQUIRED
	requires: [
      // Explicit load required library (Mandatory for extending this class)
	  'Workspace.editorjava.panel.center.function.AddTabSave',
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
			id: me.panelEditorId,
			panelId: me.panelId,
		    stateful:false
		});

		var loadRequest = Ext.create('Workspace.editorjava.request.JsonEditLoadFile', {
			panelId: me.panelId,
			panelEditorId: me.panelEditorId
		});

		Ext.apply(me, {
		    tbar: Ext.create('Ext.toolbar.Toolbar', {
		    	cls: 'x-panel-header',
		    	height: 25,
			        items: [
//										    '<span style="color:#15428B; font-weight:bold">Title Here</span>',
					    '->',
					    {
					    	text: 'Save', 
					    	handler:  function(button, e) {
					    		Workspace.editorjava.panel.center.function.AddTabSave.call()
				    		}
					    },
			            {
					    	text: 'Reload',
					    	handler:  function(button, e) {
					    		Workspace.editorjava.panel.center.function.AddTabReload.call()
					    	}
			            }
			        ]
		    })
		    ,
		    items: [
		        panel
		    ],
		    listeners : {
		    	'render': function() {
					loadRequest.request();
		    	}
				,
				'added': function(tab, container, position, option) {
					console.debug('Workspace.editorjava.panel.center.PanelCenterEditor added DelayedTask');
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

							tree.expandPath(path, field, separator);
				        }
					};

					var delayedFnCombo = function(){
				        if(comboStore.isLoading() && (cnt-- > 0)) {
							// Waiting...
							console.debug('Workspace.editorjava.panel.center.PanelCenterEditor tab \''+me.panelId+'\' Waiting... (Combo Project Loading - Tab project:\'' + tab.raw.application + '\',cnt:'+cnt+',loading:'+comboStore.isLoading()+')');
							task.delay(500, delayedFnCombo);
				        } else {
				        	application = Ext.getCmp('project').value;
							if (tab.raw.application != application) {
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
		    }
	    });
		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.PanelCenterEditor');});