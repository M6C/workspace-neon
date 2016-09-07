Ext.define('Workspace.filebrowser.view.ViewMain', {
	// REQUIRED
	requires: [ 'Workspace.filebrowser.panel.PanelWest',
		        'Workspace.filebrowser.panel.PanelEst',
		        'Workspace.filebrowser.panel.PanelCenter',
		        'Workspace.filebrowser.panel.PanelSouth']
	,
	extend:'Workspace.common.view.ViewPortExtjs4'
	,
//	// private
//    initComponent : function(){
//		var me = this;
//		Ext.apply(me, {
//            items : me.buildItems()
//        });
//	    me.callParent(arguments);
//	},
//	buildItems : function(){
//		return [
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
//  		];
//	}
    ]
    ,
	layout: 'border'

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.view.ViewMain');});