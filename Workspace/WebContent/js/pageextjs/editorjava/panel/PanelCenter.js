Ext.define('Workspace.editorjava.panel.PanelCenter', {
	requires: [
	     'Workspace.common.plugin.AddTabPluginExtjs4',
	     'Workspace.editorjava.panel.center.data.StoreCenterTab',
	     'Workspace.editorjava.tool.SessionState',
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
	activeTab: 0,
	stateful: true,
	stateId: 'Workspace.editorjava.panel.PanelCenter2',
	stateEvents: ['add'], 
    getState: function(p1, p2, p3, p4, p5) { 
        var me = this, s = {raw: new Ext.util.MixedCollection()}; 
//        me.activeTab && (s.activeTab = me.items.indexOf( me.activeTab ));
        if (Ext.isDefined(me.items)) {
	        me.items.each(function(tab) {
				s.raw.add(tab.id);
			});
        }
        return s; 
    }, 
    applyState: function( s ) { 
        var me = this; 
        if (Ext.isDefined(s.raw)) {
	        s.raw.each(function(tab) {
	        	Workspace.editorjava.panel.center.function.AddTabAce.call(tab);
			});
        }
    } 
	,
    initComponent : function(){
		var me = this;

//		var store = Ext.create('Workspace.editorjava.panel.center.data.StoreCenterTab');
//		store.load(
//			new Ext.data.Operation({
//				action:'read'
//			})
//		);
//		store.sync();

		// Retrieve tab from Session state
		var tab = Workspace.editorjava.tool.SessionState.getTab();
		tab.each(function(raw) {
			Workspace.editorjava.panel.center.function.AddTabAce.call(raw);
		});
		var state = Workspace.editorjava.tool.SessionState.getState(me.stateId);

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
