Ext.define('Workspace.tool.Log', {
	// REQUIRED

	statics: {
		// Current pattern logger
		currentPattern : Ext.Date.patterns.UniversalSortableDateTime,

		defined : function (text) {
			var dt = new Date();
			var textOut = Ext.Date.format(dt, Workspace.tool.Log.currentPattern)+' '+text;
			console.info(textOut);
		}
	}

}, function() {console.info(Ext.Date.format(new Date(), Workspace.tool.Log.currentPattern)+' Workspace.tool.Log');});
