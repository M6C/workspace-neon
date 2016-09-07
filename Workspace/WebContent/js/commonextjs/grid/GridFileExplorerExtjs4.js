Ext.define('Workspace.common.grid.GridFileExplorerExtjs4', {
	// REQUIRED
	requiers: ['Workspace.common.grid.data.StoreFileExplorer',
	           'Workspace.common.grid.fileexplorer.OnRendererColumnImageType']
	,
	extend: 'Workspace.common.grid.GridDragDropExtjs4'
	,
	alias: 'widget.commonGridFileExplorer',
	alternateClassName: 'WorkspaceCommonGridFileExplorer'
	,
    initComponent : function() {
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.grid.fileexplorer.OnRendererColumnImageType');

		Ext.apply(me, {
			columns: [
				  Ext.create('Ext.grid.column.Column', {dataIndex: 'contentType',
					  width: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.width
					  ,
					  renderer: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.call
				  }),
		          Ext.create('Ext.grid.column.Column', 
		        	  {
		        	  	  header: 'Filename',  dataIndex: 'text', flex: 1
			        	  , 
			        	  editor: {xtype: 'textfield', allowBlank: false}
		        	  }
		          )
			]
			,
			store: Ext.create('Workspace.common.grid.data.StoreFileExplorer', {
				fields:['contentType', 'text']
		    	,
		    	sorters: [
		    	    {sorterFn: function(o1, o2){
		    	        var getRank = function(o){
		    	            if (o.data.contentType === 'directory') {
		    	                return 1;
		    	            } else {
		    	                return 2;
		    	            }
		    	        },
		    	        rank1 = getRank(o1),
		    	        rank2 = getRank(o2);
		    	
		    	        if (rank1 === rank2) {
		    	            return 0;
		    	        }
		    	
		    	        return rank1 < rank2 ? -1 : 1;
		    	    }}
		    	    ,
		    	    {property: 'text', direction : 'ASC' }
		    	],
		    	sortOnLoad: true
//		        ,
//		        defaults : {
//		        	flex : 1, //auto stretch
//		        	isDraggable : function() {
//		        		console.info('Workspace.common.grid.GridDragDropExtjs4 defaults isDraggable');
//		        		var ret = this.callParent(arguments);
//		        		console.info('Workspace.common.grid.GridDragDropExtjs4 defaults isDraggable ret:'+ret);
//		        		return ret;
//		        	}
//		        }
			})
        });
	    me.callParent(arguments);
	}
	,
	refresh: function() {

		// Chargement des données
		var gridStore = this.getStore();
		gridStore.load(
			new Ext.data.Operation({
				action:'read'
			})
		);
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.grid.GridFileExplorer');});