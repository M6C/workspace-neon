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
					new Ext.util.DelayedTask(function(){
					    console.debug('Workspace.editorjava.panel.center.PanelCenterEditor added DelayedTask');
						var application = Ext.getCmp('project').value;
						var tree = Ext.getCmp('treeDirectory');
						if (tab.raw.application == application) {
							var field = 'text';
							var separator = '\\';
							var path = separator + tab.raw.path;

							tree.expandPath(path, field, separator);
						}
					}).delay(500);
				}
		    }
	    });
		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.PanelCenterEditor');});