Ext.define('Workspace.editorjava.window.completion.tree.TreeCompletion', {
	// REQUIRED

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.editorjavaTreeCompletion',
	alternateClassName: 'WorkspaceEditorJavaTreeCompletion'
	,
    useArrows: true,
    layout:'fit',
	autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false,
	enableKeyEvents:true
    ,
    constructor: function(config) {
    	var me = this;
		console.info('Workspace.editorjava.windows.tree.TreeCompletion constructor');
		var application = Ext.getCmp('project').value;
		Ext.create('Workspace.editorjava.request.JsonEditSaveAndCompletion',
		{
			params:{filename:config.filename,content:config.txt,caretPos:config.pos},
			application:application,
			callbackCompletion: function(opts, success, response) {
				var vdata = response.responseText;
				console.info('Workspace.editorjava.windows.tree.TreeCompletion constructor callbackCompletion data:' + vdata);
				me.store.proxy.data = Ext.JSON.decode(vdata);
				me.store.load(
					new Ext.data.Operation({
						action:'read'
					})
				);
			}
		}).request();
		me.id = config.id;
		me.onSubmitTree = config.onSubmitTree;
	    me.callParent();
    }
	,
    initComponent : function() {
    	var me = this;
		console.info('Workspace.editorjava.windows.tree.TreeCompletion initComponent dataInitialized:' + me.dataInitialized + ' count:' + me.dataInitializedCount);
		Ext.apply(me, {
		    listeners : {
				'add' : function ( container, component, index, eOpts ) {
					console.info('Workspace.editorjava.window.completion.tree.TreeCompletion add');
				    var me = this;
					component.on('itemkeydown', function(view, record, item, index, e, eOpts) {
						var key = e.keyCode;
						if (key==Ext.EventObject.ENTER) {// code:13
							console.info('Workspace.editorjava.window.completion.tree.TreeCompletion Ext.KeyMap ENTER');
							me.onSubmitTree(me, key, e);
						}
					});
					component.on('itemdblclick', function(view, record, item, index, e, eOpts) {
						console.info('Workspace.editorjava.window.completion.tree.TreeCompletion containerdblclick');
						me.onSubmitTree(me, -1, e);
					});
				}
	 			,
	 			'load' : function(store, records, successful, operation, eOpts) {
	 				console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion load successful:'+successful);
	 				if (successful) {
	 					var view = this.getView();
	 					view.panel.getRootNode().expand(true, function(n) {
	 						view.select(n[0].firstChild);
	 					});
	 					view.focus();
	 				}
	 			}
			}
		});
    	me.callParent(arguments);
    }
	,
	store: Ext.create('Workspace.editorjava.window.completion.tree.data.StoreCompletionMemory',
			{id: 'storeCompletionMemory'}
		)
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.TreeCompletion');});