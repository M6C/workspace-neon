Ext.define('Workspace.filebrowser.panel.PanelCenter', {
	requires: [
	     'Workspace.filebrowser.panel.center.function.AddTab'
	]
	,
	extend: 'Workspace.widget.panel.PanelCenter'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'PanelCenter'
	,
	// Must be override
	onTabChange(combo, newCard, oldCard, option) {
		console.info('Workspace.filebrowser.panel.PanelCenter tabchange newCard:'+newCard.id+' oldCard:'+oldCard.id);
		var gridStore = newCard.items.getByKey('gridFileExplorer_' + newCard.id).getStore();
		gridStore.load(
			new Ext.data.Operation({
				action:'read'
			})
		);
		gridStore.sync();
	},
	onAddTab(raw) {
		Workspace.filebrowser.panel.center.function.AddTab.call(raw, 0, true, false, false);
	},
	getSelectedItem: function() {
		var ret = null;
	    var mainCenterPanel = Ext.getCmp('mainCenterPanel');
        var mainCenterTab = mainCenterPanel.getActiveTab();
        if (!Ext.isEmpty(mainCenterTab)) {
            ret = mainCenterTab.raw;
        }
        return ret;
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.PanelCenter');});
