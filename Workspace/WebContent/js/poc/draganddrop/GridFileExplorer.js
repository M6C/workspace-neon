Ext.define('Workspace.poc.draganddrop.GridFileExplorer', {

	extend: 'Ext.grid.Panel'
	,
	initComponent : function(){
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove');
		Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove.apply(me, me.onBeforeDrop, me.onDrop);

		var column1 = Ext.create('Ext.grid.column.Column', {dataIndex: 'contentType',
			width: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.width,
			renderer: Workspace.common.grid.fileexplorer.OnRendererColumnImageType.call
		});

		var column2 = Ext.create('Ext.grid.column.Column', {
			header: 'Filename',  dataIndex: 'text', flex: 1, 
			editor: {xtype: 'textfield', allowBlank: false}
		});

		var store = Ext.create('Workspace.poc.draganddrop.data.StoreFileExplorer', {
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
	    	]
		});

		Ext.apply(me, {
			store: store
			,
			columns: [ column1, column2 ]
	    });

	    me.callParent(arguments);
	}
	,
	refresh: function() {

		// Chargement des donnees
		var gridStore = this.getStore();
		gridStore.load(
			new Ext.data.Operation({
				action:'read'
			})
		);
		this.getView().refresh();
	}
	,
	hideHeaders : false
}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.GridFileExplorer');});