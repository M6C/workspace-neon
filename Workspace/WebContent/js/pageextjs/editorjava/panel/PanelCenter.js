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
	isDebugging: function() {
		var me = this;
		return me.waiterDebug.debugging;
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
		var sourceName = jsonData.sourceName;
		var row = jsonData.line - 1;
		if (Ext.isEmpty(sourceName)) {
    		Workspace.common.tool.Pop.failure(me, "No Source found for class:'" + classname + "' line:" + row );
			return;
		}
		var sourceName = Workspace.tool.UtilString.decodeUtf8(jsonData.sourceName[0]);

		var sep = (sourceName.indexOf('/')>=0 ? '/' : '\\');
		var text = sourceName.substring(sourceName.lastIndexOf(sep) + 1);
		var panelId = sourceName;

		var mainCenterPanel=Ext.getCmp('mainCenterPanel');
		var panel = mainCenterPanel.getActiveTab();
		if (panel.id == panelId) {
			var editor = ace.edit(panel.panelEditorId);
	    	Ext.apply(editor, {
	    		cursorRow: row,
	    		cursorCol: 0,
	    		changeScrollTop: undefined,
	    		changeScrollLeft: undefined
    		});
	    	panel.editorFocusAndScroll(panel);
		} else {
			var raw = {
				'text':text,
				'id':panelId,
				'application':application,
				'path':sourceName,
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
			Workspace.editorjava.panel.center.function.AddTabAce.call(raw);
		}

		var callbackVariable = function(jsonData) {
    		Workspace.common.tool.Pop.info(me, 'Variable:', {toast: false, detail:jsonData});
		};
        Ext.create('Workspace.editorjava.debug.request.JsonDebugVariable').request(callbackVariable);
	}
	,
	initializeButtonDebug: function() {
		var me = this;
		var debugging = me.isDebugging();
		Ext.getCmp('btnDebugStart').setVisible(!debugging);
		Ext.getCmp('btnDebugStop').setVisible(debugging);
	}
	,
	callbackDebugStop: function(jsonData) {
		var mainCenterPanel = Ext.getCmp('mainCenterPanel');
		mainCenterPanel.initializeButtonDebug();
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});