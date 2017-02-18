Ext.define('Workspace.editorjava.panel.est.PanelDebugVariable', {

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.panelDebugVariable',
	alternateClassName: 'WorkspacePanelDebugVariable',
	id: 'PanelDebugVariable',
	title: 'Variable'
	,
    initComponent : function() {
		var me = this;

        me.store = Ext.create('Ext.data.TreeStore', {
        	root: {
        	    nodeType: 'async',
        	    draggable: false,
        	    id: 'root',
        	    expanded: true,
        	    text: 'Current'
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

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.est.PanelDebugVariable');});