Ext.define('Workspace.editorjava.panel.PanelCenter', {
	requires: [
	     'Workspace.common.tool.Pop',
	     'Workspace.editorjava.debug.WaiterDebug',
  	     'Workspace.editorjava.panel.center.function.AddTabAce'
  	]
  	,
	extend: 'Workspace.widget.panel.WidgetPanelCenter'
	,
	alias: 'widget.panelCenter',
	alternateClassName: 'PanelCenter',
    stateful:false
    ,
    initComponent : function(){
		var me = this;
		
		me.waiterDebug = Ext.create('Workspace.editorjava.debug.WaiterDebug');

	    me.callParent(arguments);
	}
	,
	// Overrided
	onAddTab(raw) {
		Workspace.editorjava.panel.center.function.AddTabAce.call(raw);
	}
	,
	getSelectedItem: function() {
		var ret = null;
	    var treeDirectory = Ext.getCmp('treeDirectory');
        var selection = treeDirectory.getSelectionModel().selected;
        if (selection.getCount() == 1) {
        	ret = selection.get(0).raw;
        }
        return ret;
	}
	,
	debugStart: function() {
		var me = this;
		me.waiterDebug.start(me.callbackDebugStart);
		me.initializeButtonDebug();
	}
	,
	debugStop: function() {
		var me = this;
		me.waiterDebug.stop(me.callbackDebugStop);
		me.initializeButtonDebug();
	}
	,
	callbackDebugStart: function(jsonData) {
		if (!Ext.isDefined(jsonData)) {
    		Workspace.common.tool.Pop.failure(me, 'Debug callback with empty json data', {toast: false});
			return;
		}

		var me = this;
		var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		var application = Workspace.tool.UtilString.decodeUtf8(jsonData.application);
		var classname = Workspace.tool.UtilString.decodeUtf8(jsonData.className);
		var fileName = Workspace.tool.UtilString.decodeUtf8(jsonData.fileName);
		var sep = (fileName.indexOf('/')>=0 ? '/' : '\\');
		var text = fileName.substring(fileName.lastIndexOf(sep) + 1);
		var row = jsonData.line;

		var raw = {
			'text':text,
			'id':fileName,
			'application':application,
			'path':fileName,
			'className':classname,
			'contentType':'text/java',
			'build':'true',
			'leaf':false,
			'autoDeploy':true,
			'cursorRow': row,
			'cursorCol': 0
		};

		// Explicit load required library (Mandatory for extending this class)
		Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
		var panelTab = Workspace.editorjava.panel.center.function.AddTabAce.call(raw);

		var callbackResume = function (jsonData, params) {
            Workspace.common.tool.Pop.info(me, 'Resume');

            mainCenterPanel.initializeButtonDebug();
		};

		Ext.Loader.syncRequire('Workspace.editorjava.debug.request.JsonDebugResume');
    	Ext.create('Workspace.editorjava.debug.request.JsonDebugResume').request(callbackResume);
	}
	,
	initializeButtonDebug: function() {
		var me = this;
		var debugging = me.waiterDebug.debugging;
		Ext.getCmp('btnDebugStart').setVisible(!debugging);
		Ext.getCmp('btnDebugStop').setVisible(debugging);
	}
	,
	callbackDebugStop: function(jsonData) {
		var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		mainCenterPanel.initializeButtonDebug();
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});