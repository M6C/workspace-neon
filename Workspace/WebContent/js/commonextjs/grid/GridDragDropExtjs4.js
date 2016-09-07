Ext.define('Workspace.common.grid.GridDragDropExtjs4', {
	// REQUIRED
	requiers: ['Workspace.common.grid.data.StoreDragDrop']
	,
	extend: 'Ext.grid.Panel'
	//extend: 'Ext.grid.EditorGridPanel'
	,
	alias: 'widget.commonGridDragDrop',
	alternateClassName: 'WorkspaceCommonGridDragDrop'
	,
	listeners: {
		afterrender: function(cmp, eOpts) {
//			console.info('Workspace.common.grid.GridDragDropExtjs4 cmp'+cmp.id+' eOpts:'+eOpts);
			if (this.dd) {
//				this.dd.onDragEnter = function(evt, dragId) {
//					console.info('Workspace.common.grid.GridDragDropExtjs4 onDragEnter id:'+id);
//				};
//				this.dd.afterDragEnter = function(dropTarget, evt, dragId) {
//					console.info('Workspace.common.grid.GridDragDropExtjs4 afterDragEnter id:'+id);
//				};
				Ext.apply(this.dd, {
					onDragEnter: function(evt, dragId) {
						console.info('Workspace.common.grid.GridDragDropExtjs4 onDragEnter id:'+id);
					}
				});
			}
		}
	}
	,
	viewConfig: {
	    getRowClass: function (record) {
			if (Ext.isDefined(this.panel.getRowClass))
				return this.panel.getRowClass(this, record);
			else
				return this.callParent(arguments);
		}
		,
		listeners: {
		    beforedrop: function(nodeEl, data) {
				return this.panel.onBeforeDrop(nodeEl, data);
			}
			,
			drop: function(nodeEl, data, overModel, dropPosition, eOpts) {
				return this.panel.onDrop(nodeEl, data, overModel, dropPosition, eOpts);
			}
//			,
//			afterrender: function(cmp, eOpts) {
//				console.info('kiki !!!! cmp'+cmp.id+' eOpts:'+eOpts);
//			}
		},
		plugins: {
	        ptype: 'gridviewdragdrop',
            stripeRows : true
	    }
		,
		allowCopy: true
    }
	,
//	initComponent : function(){
//		this.callParent(arguments);

//		this.view.on('beforedrop',this.onBeforeDrop,this);
//		this.view.on('drop',this.onDrop,this);
//		
//		this.on('afterRender', function(cmp, eOpts) {
//			console.info('Workspace.common.grid.GridDragDropExtjs4 afterRender');
//			//this.callParent(arguments);
//
//			Ext.apply(this.dd, {
//				onDragEnter: function(evt, id) {
//					console.info('Workspace.common.grid.GridDragDropExtjs4 onDragEnter id:'+id);
//				}
//		    });
////
////			this.dd.onDragEnter=function(evt, id) {
////				console.info('Workspace.common.grid.GridDragDropExtjs4 onDragEnter id:'+id);
////			};
//		});
//	}
//	,
	onBeforeDrop : function(nodeEl, data) {
		console.info('Workspace.common.grid.GridDragDropExtjs4 onBeforeDrop');
	}
	,
	onDrop : function(nodeEl, data, overModel, dropPosition, eOpts) {
		console.info('Workspace.common.grid.GridDragDropExtjs4 onDrop');
	}
	,
	layout: {
        type: 'hbox',
        align: 'stretch'
    },
    draggable: true 
//    {
//    	onDragEnter : function(evtObj, targetElId) {
//    		console.info('Workspace.common.grid.GridDragDropExtjs4 draggable onDragEnter');
//    	}
//    }
    ,
    defaults     : { flex : 1 },//auto stretch
	multiSelect: true
}, function() {Workspace.tool.Log.defined('Workspace.common.grid.GridDragDrop');});