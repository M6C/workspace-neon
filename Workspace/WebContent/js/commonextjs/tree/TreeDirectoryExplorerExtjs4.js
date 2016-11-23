Ext.define('Workspace.common.tree.TreeDirectoryExplorerExtjs4', {

	requiers: ['Workspace.common.tree.data.StoreDirectoryExplorer']
	,
	extend: 'Ext.tree.Panel'
		,
		alias: 'widget.CommonTreeDirectoryExplorer',
		alternateClassName: 'WorkspaceCommonTreeDirectoryExplorer'
	,
	initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Workspace.common.tree.data.StoreDirectoryExplorerExtjs4')
	    });
	
		me.applyDragAndDrop(me);

		me.callParent(arguments);
	}
	,
	applyDragAndDrop: function(me) {
		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.common.function.ApplyDragAndDrop');
		Workspace.common.function.ApplyDragAndDrop.apply(me, me.onBeforeDrop, me.onDrop);
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

}, function() {Workspace.tool.Log.defined('Workspace.common.tree.TreeDirectoryExplorerExtjs4');});
