Ext.define('Workspace.common.tree.TreeFileExplorerExtjs4', {

	requiers: ['Workspace.common.tree.data.StoreFileExplorerExtjs4']
	,
	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.treeFileExplorerExtjs4',
	alternateClassName: 'WorkspaceTreeFileExplorer'
	,
    initComponent : function(){
		var me = this;

		me.applyStore(me);

		me.applyDragAndDrop(me);

		me.callParent(arguments);
	}
	,
	applyStore: function(me) {
		Ext.apply(me, {
			store: Ext.create('Workspace.common.tree.data.StoreFileExplorerExtjs4', {
		    	sorters: [
		    	    /**
		    	     * First  Sort by Directory and File
		    	     * Second Sort Alphabetic 'Asc' by Text into Directory ou File
		    	     */
		    	    {sorterFn: function(o1, o2){
		    	        var getRank = function(o){
		    	            if (o.raw.contentType === 'directory') {
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
		    	    {
                        property: 'text',
                        direction: 'ASC' // or 'DESC'
                    }
		    	]
			})
        });
	}
	,
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDrop');
		Workspace.common.draganddrop.ApplyDragAndDrop.apply(me, me.onBeforeDrop, me.onDrop);
	}
	,
    useArrows: true,
    autoScroll: false,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false

}, function() {Workspace.tool.Log.defined('Workspace.common.tree.TreeFileExplorerExtjs4');});