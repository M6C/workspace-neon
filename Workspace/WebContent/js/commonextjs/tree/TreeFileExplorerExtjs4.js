Ext.define('Workspace.common.tree.TreeFileExplorerExtjs4', {
	// REQUIRED
	requiers: ['Workspace.common.tree.data.StoreFileExplorerExtjs4']
	,
	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.treeFileExplorerExtjs4',
	alternateClassName: 'WorkspaceTreeFileExplorer'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Workspace.common.tree.data.StoreFileExplorerExtjs4')
			,
			listeners:{
			    //scope: this, //yourScope
				'movenode': function (tree, node, oldParent, newParent, index){
					 alert('moved. Old parent node id='+ oldParent.id+'. new parent node id='+newParent.id);
				}
//		    	,
//				'render': function (tree){
//					new Ext.tree.TreeSorter(tree, {folderSort:true});
//				}
		    }
        });
	    me.callParent(arguments);
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
