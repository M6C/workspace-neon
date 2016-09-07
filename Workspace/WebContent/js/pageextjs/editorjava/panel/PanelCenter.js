Ext.define('Workspace.editorjava.panel.PanelCenter', {
	// REQUIRED
	requires: ['Workspace.common.plugin.AddTabPluginExtjs4'],

	extend: 'Ext.tab.Panel'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'PanelCenter'
	,
	id: 'mainCenterPanel',
	region: 'center',
	activeTab: 0
	,
    initComponent : function(){
		var me = this;
//		Ext.apply(me, {
//			plugins: [ Ext.create('Workspace.editorjava.plugin.AddTabPluginNew') ]
//	    });
	    me.callParent(arguments);
	},
	onAddTabClick : function() {
		this.setActiveTab(this.add(
		{
        	closable:true,
            title: 'New Tab'
        }
		));
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});
