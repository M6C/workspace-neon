Ext.define('Workspace.common.panel.function.ApplySessionStateTabPanel', {
	singleton : true,
	options : {}
	,
	apply: function(panel, stateId) {
	    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply stateId:' + stateId);
		Ext.apply(panel, {
			stateful: true,
			stateId: stateId,
			stateEvents: ['add', 'remove'], 
			stateData: undefined,
		    getState: function() { 
			    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply getState');
		        var s = {raw: []}; 
		        if (Ext.isDefined(panel.items)) {
					var i = 0;
			        panel.items.each(function(tab) {
						s.raw[i++] = tab.raw;
					});
		        }
		        return s; 
		    }
			, 
		    applyState: function(s) { 
			    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply applyState');
		        panel.stateData = s;
		    }
	    });

		panel.on('render', function(component, option) {
		    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply render');
			if (Ext.isDefined(panel.stateData) && Ext.isDefined(panel.stateData.raw)) {
		    	Ext.Array.each(panel.stateData.raw, function(tab) {
		    		if (tab != null) {
		    			Workspace.editorjava.panel.center.function.AddTabAce.call(tab);
		    		}
				});
				panel.stateData = undefined;
			}
		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.panel.function.ApplySessionStateTabPanel');});