Ext.define('Workspace.poc.draganddrop.TreeDirectoryExplorer', {
	// REQUIRED
	requiers: ['Workspace.poc.draganddrop.data.StoreDirectoryExplorer',
	           'Workspace.filebrowser.panel.center.function.AddTab']
	,
	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.filebrowserTreeDirectoryExplorer',
	alternateClassName: 'WorkspaceFilebrowserTreeDirectoryExplorer'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Workspace.poc.draganddrop.data.StoreDirectoryExplorer')
			,
			listeners:{
			    //scope: this, //yourScope
				'movenode': function (tree, node, oldParent, newParent, index){
					 alert('moved. Old parent node id='+ oldParent.id+'. new parent node id='+newParent.id);
				}
		    }
        });

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.poc.draganddrop.function.ApplyDragAndDrop');
		Workspace.poc.draganddrop.function.ApplyDragAndDrop.apply(me, me.onBeforeDrop, me.onDrop);

		me.callParent(arguments);
	}
	,
	onBeforeDrop : function(nodeEl, data) {
		console.info('Workspace.poc.draganddrop.TreeDirectoryExplorer onBeforeDrop');
		return true;
	}
	,
	onDrop : function(nodeEl, data, overModel, dropPosition, eOpts) {
		console.info('Workspace.poc.draganddrop.TreeDirectoryExplorer onDrop');
		return true;
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
	,
	listeners: {
		//scope: this, //yourScope
		'beforeitemdblclick' : function(view, record, item, index, event, eOpts ) {
			if (record.raw.contentType=='directory') {
				// Explicit load required library (Mandatory for extending this class)
				Ext.Loader.syncRequire('Workspace.filebrowser.panel.center.function.AddTab');
	
				Workspace.filebrowser.panel.center.function.AddTab.call(record.raw);
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.TreeDirectoryExplorer');});
