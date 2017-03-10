Ext.define('Workspace.editorjava.panel.est.PanelDebugBreakpoint', {

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.panelDebugVariable',
	alternateClassName: 'WorkspacePanelDebugBreakpoint',
	id: 'PanelDebugBreakpoint',
	title: 'Breakpoint'
	,
    initComponent : function() {
		var me = this;

        me.store = Ext.create('Ext.data.TreeStore', {
        	root: {
        	    nodeType: 'async',
        	    draggable: false,
        	    id: 'root',
        	    expanded: true,
        	    text: 'Current'
        	}    
        });

        me._manageEmptyNode();

		me.callParent(arguments);
	}
	,
	setDebugBreakpoint: function(data) {
	}
	,
	/**
	 * @param data : format : {application:, line:, classname:}
	 */
	addDebugBreakpoint: function(data) {
	    var me = this;
        var root = me.getRootNode();
        var id = '[' + data.application + ']' + data.filename + ':' + data.line;
        var text = '[' + data.application + ']&nbsp;<span style="color:#4067B3">' + data.classname + '</span>&nbsp;' + data.line;
        var qtip = data.filename;
        var node = root.findChild('id', id);

        if (Ext.isEmpty(node)) {
    	    root.appendChild([{leaf:true, text:text, id:id, qtip:qtip}]);
        }
        me._manageEmptyNode();
	}
	,
	/**
	 * @param data : format : {application:, line:, classname:}
	 */
	removeDebugBreakpoint: function(data) {
	    var me = this;
        var root = me.getRootNode();
        var id = '[' + data.application + ']' + data.filename + ':' + data.line;
        var node = root.findChild('id', id);

        if (!Ext.isEmpty(node)) {
            root.removeChild(node);
        }
        me._manageEmptyNode();
	}
	,
	/**
	 * @private
	 */
	_manageEmptyNode: function() {
	    var me = this;
        var root = me.getRootNode();
        var id = 0;
        var node = root.findChild('id', id);
        var cnt = (!Ext.isEmpty(root.childNodes)) ? root.childNodes.length : 0;

        if (Ext.isEmpty(node) && cnt==0) {
            var text = id;
    	    root.appendChild([{leaf:true, text:'No breakpoint.', id:id}]);
        } else if (!Ext.isEmpty(node) && cnt>0) {
            root.removeChild(node);
        }
	}
	,
    useArrows: true,
    autoScroll: false,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.est.PanelDebugBreakpoint');});