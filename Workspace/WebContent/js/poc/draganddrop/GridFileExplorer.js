Ext.define('Workspace.poc.draganddrop.GridFileExplorer', {

	extend: 'Ext.grid.Panel'
	,
	columns: [
		  Ext.create('Ext.grid.column.Column', {dataIndex: 'contentType'
			  ,
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
	initComponent : function(){
		var me = this;

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove');
		Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove.apply(me, me.onBeforeDrop, me.onDrop);

		me.callParent(arguments);
	}
	,
	store: Ext.create('Ext.data.Store', {
    	sortOnLoad: true,
        clearOnLoad: true,
    	autoSync: true
    	,
    	fields:['contentType', 'text']
    	,
	    proxy: Ext.create('Ext.data.proxy.Ajax', {
	        url: DOMAIN_NAME_ROOT + '/action.servlet?event=JsonFileExplorer',
			method: 'GET',
	        reader: {
	            type: 'json'
	        },
	        extraParams: {
	        	application: '',
	        	path: ''
	        }
	    })
		,
		root: {
	        nodeType: 'async',
	        draggable: false,
	        id: 'root',
		    expanded: true,
		    text: 'Current'
		}
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
	})
	,
	refresh: function() {

		// Chargement des donn�es
		var gridStore = this.getStore();
		gridStore.load(
			new Ext.data.Operation({
				action:'read'
			})
		);
	}
	,
	hideHeaders : true
}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.GridFileExplorer');});