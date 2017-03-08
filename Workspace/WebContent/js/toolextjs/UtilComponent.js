Ext.define('Workspace.tool.UtilComponent', {

	statics: {
		addListener : function(component, event, fn, option) {
		    if (!Ext.isDefined(option)) {
		        option = {preserve:true};
		    }
		    if (Ext.isDefined(option.preserve) && option.preserve) {
		        // Preserve previous event function if defined
		    }
		    component.on(event, fn);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilComponent');});