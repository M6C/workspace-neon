Ext.define('Workspace.common.form.combobox.function.ApplySessionStateCombo', {
	singleton : true,
	options : {}
	,
	apply: function(combo, stateId) {
	    console.debug('Workspace.common.form.combobox.function.ApplySessionStateCombo apply stateId:' + stateId);
		Ext.apply(combo, {
			stateful: true,
			stateId: stateId,
			stateEvents: ['select'], 
			stateData: undefined,
		    getState: function() { 
			    console.debug('Workspace.common.form.combobox.function.ApplySessionStateCombo apply getState');
		        var s = {value: combo.getValue()}; 
		        return s; 
		    }
			, 
		    applyState: function(s) { 
			    console.debug('Workspace.common.form.combobox.function.ApplySessionStateCombo apply applyState');
		        combo.stateData = s;
		    }
	    });

		combo.on('render', function(component, option) {
		    console.debug('Workspace.common.form.combobox.function.ApplySessionStateCombo apply render');
			if (Ext.isDefined(combo.stateData) && Ext.isDefined(combo.stateData.value)) {
				combo.setValue(combo.stateData.value);
			}
		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.form.combobox.function.ApplySessionStateCombo');});