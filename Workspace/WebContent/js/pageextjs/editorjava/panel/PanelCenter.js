Ext.define('Workspace.editorjava.panel.PanelCenter', {
	requires: [
	     'Workspace.common.plugin.AddTabPluginExtjs4',
	     'Workspace.editorjava.panel.center.function.ApplySessionStateCenter',
	     'Workspace.editorjava.panel.center.function.AddTabAce'
	]
	,
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

		Workspace.editorjava.panel.center.function.ApplySessionStateCenter.apply(me);

		me.callParent(arguments);
	}
	,
	onAddTabClick : function() {
		this.setActiveTab(this.add(
		{
        	closable:true,
            title: 'New Tab'
        }
		));
	}

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});
