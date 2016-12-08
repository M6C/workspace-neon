Ext.define('Workspace.editorjava.panel.center.function.ApplySessionStateCenter', {
	singleton : true,
	options : {}
	,
	apply: function(panel) {
	    console.debug('Workspace.editorjava.panel.center.function.ApplySessionStateCenter apply');
		Ext.apply(panel, {
			stateful: true,
			stateId: 'Workspace.editorjava.panel.PanelCenter',
			stateEvents: ['add'], 
			stateData: undefined,
		    getState: function() { 
		        var me = this, s = {raw: []}; 
		        if (Ext.isDefined(me.items)) {
					var i = 0;
			        me.items.each(function(tab) {
						s.raw[i++] = tab.raw;
					});
		        }
		        return s; 
		    }
			, 
		    applyState: function(s) { 
		        var me = this;
		        me.stateData = s;
		    }
	    });

		panel.on('render', function(panel, option) {
			var me = this;
			if (Ext.isDefined(me.stateData) && Ext.isDefined(me.stateData.raw)) {
		    	Ext.Array.each(me.stateData.raw, function(tab) {
		    		if (tab != null) {
		    			Workspace.editorjava.panel.center.function.AddTabAce.call(tab);
		    		}
				});
			}
		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.center.function.ApplySessionStateCenter');});