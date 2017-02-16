Ext.define('Workspace.editorjava.panel.PanelEst', {
	requires: [
	     'Workspace.editorjava.plugin.DebugPlugin'
	]
	,
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
	width: 200,
    stateful:false
	,
    initComponent : function(){
		var me = this;
		me.pluginDebug = Ext.create('Workspace.editorjava.plugin.DebugPlugin');

		Ext.apply(me, {
			plugins: [ me.pluginDebug ]
	    });

	    me.callParent(arguments);
	}
	,
	initializeButtonDebug: function() {
		var me = this;
		me.pluginDebug.initializeButtonDebug();
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelEst');});