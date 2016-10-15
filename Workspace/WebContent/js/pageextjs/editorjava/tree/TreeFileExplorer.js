Ext.define('Workspace.editorjava.tree.TreeFileExplorer', {
	
	extend: 'Workspace.common.tree.TreeFileExplorerExtjs4'
	,
	alias: 'widget.editorjavaTreeFileExplorer',
	alternateClassName: 'WorkspaceEditorJavaTreeFileExplorer'
	,
    initComponent : function() {
    	var me = this;
		console.info('Workspace.editorjava.tree.TreeFileExplorer initComponent');
		Ext.apply(me, {
		    listeners : {
				'add' : function ( container, component, index, eOpts ) {
					console.info('Workspace.editorjava.tree.TreeFileExplorer add2');
				    var me = this;
					component.on('itemkeydown', function(view, record, item, index, e, eOpts) {
						var key = e.keyCode;
						if (key==Ext.EventObject.ENTER) {// code:13
							// Explicit load required library (Mandatory for extending this class)
							Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
						
							Workspace.editorjava.panel.center.function.AddTabAce.call(record.raw);
						}
					});
				}
			}
		});
    	me.callParent(arguments);
    }
	,
    listeners: {
        //scope: this, //yourScope
		'beforeitemdblclick' : function(view, record, item, index, event, eOpts ) {
			// Explicit load required library (Mandatory for extending this class)
			Ext.Loader.syncRequire('Workspace.editorjava.panel.center.function.AddTabAce');
		
			Workspace.editorjava.panel.center.function.AddTab.call(record.raw);
	    }
		,
		'load' : function(store, records, successful, operation, eOpts) {
			if (successful) {
				var view = this.getView();
				var node = records;
				if (node.parentNode == undefined && node.firstChild != undefined) {
					view.select(node.firstChild);
				}
				view.focus();
			}
		}
	}
	,
	// Not Used
	selectNodeFromViewRoot: function () {
		var view = this.getView();
		var node = view.panel.getRootNode();
		if (node.firstChild != undefined) {
			node = node.firstChild;
		}
		view.select(node);
		view.focus();
	}
	,
	// Not Used
	selectNodeFromRecord: function (records) {
		var node = records.firstChild;
		if (node == undefined) {
			node = view.panel.getRootNode();
			if (node.firstChild != undefined) {
				node = node.firstChild;
			}
		}
		view.select(node);
		view.focus();
	}
	,
	// Not Used
	getSelectPath : function(node) {
		var n = node.parentNode;
		var path = '';
		while (n != undefined) {
			if (path != '') {
				path = '<' + path;
			}
			path = n.getId() + path;
			n = n.parentNode;
		}
		return path;
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.tree.TreeFileExplorer');});
