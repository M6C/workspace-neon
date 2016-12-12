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
		Ext.apply(me, {
			store: Ext.create('Workspace.common.tree.data.StoreFileExplorerExtjs4')
        });

		me.applyDragAndDrop(me);

		me.callParent(arguments);
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
