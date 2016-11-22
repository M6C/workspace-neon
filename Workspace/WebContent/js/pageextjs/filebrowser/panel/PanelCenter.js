Ext.define('Workspace.filebrowser.panel.PanelCenter', {
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
		Ext.apply(me, {
			plugins: [ Ext.create('Workspace.filebrowser.plugin.AddTabPluginNew') ]
			,
			listeners: {
				'tabchange' : function (tabPanel, newCard, oldCard, eOpts ) {
					console.info('Workspace.filebrowser.panel.PanelCenter tabchange newCard:'+newCard.id+' oldCard:'+oldCard.id);
					var gridStore = newCard.items.getByKey('gridFileExplorer_' + newCard.id).getStore();
					gridStore.load(
						new Ext.data.Operation({
							action:'read'
						})
					);
					gridStore.sync();
				}
			}
	    });
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

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.PanelCenter');});
