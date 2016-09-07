Ext.define('Workspace.editorjava.panel.PanelEst', {
	// REQUIRED
	requires: [
	     'Workspace.editorjava.plugin.AddTabPluginCart'
	],

	extend: 'Workspace.common.panel.TabPanelCollapsible'
	,
	alias: 'widget.panelEst',
	alternateClassName: 'PanelEst'
	,
	id: 'mainEstPanel',
	region: 'east',
	layout: 'fit',
//	title: 'ClipBoard',
	hideCollapseTool: true,
	collapseMode: 'mini',
	collapsed: true,
	activeTab: 0,
	scroll: false,
	autoscroll: false,
	width: 200
	,
    initComponent : function(){
		var me = this;
//		Ext.apply(me, {
//			plugins: [ Ext.create('Workspace.editorjava.plugin.AddTabPluginCart') ]
//	    });
	    me.callParent(arguments);
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelEst');});
