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
//	hideCollapseTool: false,
//	hideMode: 'visibility',
    tbar: Ext.create('Ext.toolbar.Toolbar', {
    	cls: 'x-panel-header',
    	height: 25,
	        items: [
//								    '<span style="color:#15428B; font-weight:bold">Title Here</span>',
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
    initComponent : function(){
		var me = this;

		var panel = Ext.create('Ext.panel.Panel', {
			id: me.panelEditorId,
			panelId: me.panelId
		});

		var loadRequest = Ext.create('Workspace.editorjava.request.JsonEditLoadFile', {
			panelId: me.panelId,
			panelEditorId: me.panelEditorId
		});

		Ext.apply(me, {
		    items: [
		        panel
		    ],
		    listeners : {
		    	'render': function() {
					loadRequest.request();
		    	}
		    }
	    });
		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.PanelCenterEditor');});