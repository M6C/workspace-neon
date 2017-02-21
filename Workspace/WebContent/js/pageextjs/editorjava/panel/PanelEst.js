Ext.define('Workspace.editorjava.panel.PanelEst', {
	requires: [
	     'Workspace.editorjava.plugin.DebugPlugin',
	     'Workspace.editorjava.debug.data.DataVariable'
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
			plugins: [ me.pluginDebug ],
			items: [
			    Ext.create('Workspace.editorjava.panel.est.PanelDebugVariable')
			]
	    });

	    me.callParent(arguments);
	}
	,
	setData: function(data) {
	    var panelDebugVariable = Ext.getCmp('PanelDebugVariable');
        var root = panelDebugVariable.getRootNode();
        root.removeAll();

        data = Workspace.editorjava.debug.data.DataVariable.formatFromRequest(data);

		var nodeList = (Ext.isEmpty(data.children) ? data : data.children);
        if (Ext.isArray(nodeList) && !Ext.isEmpty(nodeList)) {
	        root.appendChild(nodeList);
        }
	}
	,
	initializeButtonDebug: function() {
		var me = this;
		me.pluginDebug.initializeButtonDebug();
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelEst');});