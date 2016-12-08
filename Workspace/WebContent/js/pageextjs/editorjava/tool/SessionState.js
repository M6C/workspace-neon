Ext.define('Workspace.editorjava.tool.SessionState', {
	singleton : true,
	options : {}
	,
	constructor: function(config) {
        this._initialize();
    },
    initialize: function() {
	    console.debug('Workspace.editorjava.tool.SessionState initialize');
    },
    _initialize: function() {
	    console.debug('Workspace.editorjava.tool.SessionState _initialize');
		// State Initialization
		Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
		var tab = Ext.state.Manager.get('tab');
		if (tab == null) {
			Ext.state.Manager.set('tab', new Ext.util.MixedCollection());
		}
	}
	,
	addTab: function(raw) {
	    console.debug('Workspace.editorjava.tool.SessionState addTab');
		var tab = Ext.state.Manager.get('tab');
		tab.add(raw.id, raw);
	}
	,
	getTab: function() {
	    console.debug('Workspace.editorjava.tool.SessionState getTab');
	    return Ext.state.Manager.get('tab');
	}
	,
	getState: function(id) {
		return Ext.state.Manager.getProvider().get(id);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tool.SessionState');});