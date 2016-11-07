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
//	listeners:{
//		'render': function (view){
//			// https://www.sencha.com/forum/showthread.php?42762-Looking-for-demo-Drag-and-Drop-from-Tree-to-Grid/page2
//			console.info('Workspace.filebrowser.view.ViewMain render');
//
//			var tree = Ext.getCmp('treeDirectory');
//			var estPanel = Ext.getCmp('mainEstPanel');
//			var gridPanel = estPanel.getActiveTab();
//			var panelId = gridPanel.getId();
//			var gridId = 'gridFileExplorer_'+panelId;
//			var grid = gridPanel;//gridPanel.getComponent(gridId);
//			var ddGroupId = 'secondTreeDDGroup';
//			tree.ddGroup = ddGroupId;
//			grid.ddGroup = ddGroupId;
//
//		    var secondGridDropTargetEl = grid.getView().el.dom.childNodes[0].childNodes[1]
//		    var destGridDropTarget = new Ext.dd.DropTarget(secondGridDropTargetEl, {
//		        ddGroup    : ddGroupId,
//		        copy       : false,
//		        notifyDrop : function(ddSource, e, data){
////		                    var record = new blankRecord({
////		                        name     : ddSource.dragData.node.attributes.text,
////		                        column1  : ddSource.dragData.node.attributes.id,
////		                        column2  : ddSource.dragData.node.attributes.cls
////		                    });
////		                    firstGridStore.add(record);
//					console.info('Workspace.filebrowser.view.ViewMain DropTarget notifyDrop');
//		            return(true);
//		        
//		        }
//		    }); 
//		}
//	}
//	,
	layout: 'border'

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.view.ViewMain');});