Ext.define('Workspace.filebrowser.plugin.AddTabPluginNew', {
	// REQUIRED
	requires: ['Workspace.common.constant.ConstantImage',
	           'Workspace.filebrowser.plugin.addTabNew.function.New']
	,
    extend: 'Workspace.common.plugin.AddTabPluginExtjs4'
	,
	createTab : function(tp) {
		return new Ext.tab.Tab({
	        text: '&#160',
	        //icon: 'add.gif',
	        closable: false
	    	,
	        initComponent : function(){
	    		var me = this;
	    		Ext.apply(me, {
			        menu: Ext.create('Ext.menu.Menu', {
					    items: [{
					    	icon: Workspace.common.constant.ConstantImage.ICON_FOLDER,
					        text: 'Directory',
					        handler: function(button, e) {
				 				// Explicit load required library (Mandatory for extending this class)
				 				Ext.Loader.syncRequire('Workspace.filebrowser.plugin.addTabNew.function.New');

				 				Workspace.filebrowser.plugin.addTabNew.function.New.call('directory');
					    	}
					    },{
					    	icon: Workspace.common.constant.ConstantImage.ICON_FILE,
					        text: 'File',
					        handler: function(button, e) {
				 				// Explicit load required library (Mandatory for extending this class)
				 				Ext.Loader.syncRequire('Workspace.filebrowser.plugin.addTabNew.function.New');
	
				 				Workspace.filebrowser.plugin.addTabNew.function.New.call('file');
					    	}
					    }]
					})
	    		});
	    	    me.callParent(arguments);
			}
	    });
	}
	,
	initTab : function(tp, tab) {
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.plugin.AddTabPluginNew');});
