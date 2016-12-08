Ext.define('Workspace.editorjava.view.ViewMain', {
	// REQUIRED
	requires: [ 'Workspace.editorjava.panel.PanelWest',
		        'Workspace.editorjava.panel.PanelEst',
		        'Workspace.editorjava.panel.PanelCenter',
		        'Workspace.editorjava.panel.PanelSouth',
			    'Workspace.editorjava.tool.SessionState'
		  ]
	,
	extend:'Workspace.common.view.ViewPortExtjs4'
	,
    initComponent : function(){
		var me = this;

		// Session State Initialization
		Workspace.editorjava.tool.SessionState.initialize();

		me.callParent(arguments);
	}
	,
	items: [
    		{
  				region: 'north',
  				xtype: 'panel',
  				height: 38,
  				contentEl:'menuTable',
  				bodyStyle:'background-color:#EFEFEF'
  			}
    		,
			{
					xtype: 'panelWest',
					items: []
			}
    		,
			{
				xtype: 'panelCenter',
	  			items: []
			}
    		,
			{
				xtype: 'panelEst',
				items: []
			}
    		,
			{
				xtype: 'panelSouth',
				items: []
			}
    ]
    ,
	layout: 'border'

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.view.ViewMain');});