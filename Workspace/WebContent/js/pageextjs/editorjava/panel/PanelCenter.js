Ext.define('Workspace.editorjava.panel.PanelCenter', {
	requires: [
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
	debug: function() {
		var me = this;
		me.waiterDebug.debug(me.callbackDebug);
	}
	,
	callbackDebug: function(jsonData) {
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
		Workspace.editorjava.panel.center.function.AddTabAce.call(raw);

//			var editor = ace.editor(fileName + 'Editor');
//			var callbackResume = function (jsonData, params) {
//				Workspace.editorjava.debug.ApplyDebug.callbackAdd(jsonData, params, editor, row)
//            };
//			Ext.Loader.syncRequire('Workspace.editorjava.debug.request.JsonDebugResume');
//        	Ext.create('Workspace.editorjava.debug.request.JsonDebugResume').request(callbackResume);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelCenter');});