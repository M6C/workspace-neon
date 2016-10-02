Ext.define('Workspace.editorjava.window.completion.tree.TreeCompletion', {
	// REQUIRED

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.editorjavaTreeCompletion',
	alternateClassName: 'WorkspaceEditorJavaTreeCompletion'
	,
//  id:treeId,
	//title:'Directorytitle',
    //renderTo: 'west-tree',
    useArrows: true,
    layout:'fit',
	autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false
    ,
    dataInitialized: false,
    dataInitializedCount: 0
    ,
    constructor: function(config) {
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion constructor');
	    var me = this;
		var application = Ext.getCmp('project').value;
		Ext.create('Workspace.editorjava.request.JsonEditSaveAndCompletion',
		{
			params:{filename:config.filename,content:config.txt,caretPos:config.pos},
			application:application,
			callbackCompletion: function(opts, success, response) {
				me.data = response.responseText;
				me.dataInitialized = true;
				console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion constructor callbackCompletion data:' + me.data);
			}
		}).request();
	    me.callParent();
    }
	,
    initComponent : function() {
	    var me = this;
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initComponent dataInitialized:' + me.dataInitialized + ' count:' + me.dataInitializedCount);
		me.initView(this);
    	me.callParent(arguments);
    }
	,
	store: Ext.create('Workspace.editorjava.window.completion.tree.data.StoreCompletionMemory',
			{
				id: 'storeCompletionMemory',
			    proxy: {
			        type: 'memory',
					reader: {
			            type: 'json'
			        }
			    }
			}
		)
	    ,
	    listeners : {
			'add' : function ( container, component, index, eOpts ) {
				console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion add');
				component.on('itemkeydown', function(view, record, item, index, e, eOpts) {
					var key = e.keyCode;
					if (key==Ext.EventObject.ENTER) {// code:13
						console.info('Workspace.editorjava.window.completion.tree.TreeCompletion Ext.KeyMap ENTER');
						this.panel.onSubmitTree(this, e);
					}
				});
				component.on('itemdblclick', function(view, record, item, index, e, eOpts) {
					console.info('Workspace.editorjava.window.completion.tree.TreeCompletion containerdblclick');
					this.panel.onSubmitTree(this, e);
				});
			}
			,
			'load' : function(store, records, successful, operation, eOpts) {
				console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion load successful:'+successful);
				if (successful) {
//					var view = this.getView();
//					view.panel.getRootNode().expand(true, function(n) {
//						view.select(n[0].firstChild);
//					});
//					view.focus();
				}
			}
			,
			'render' : function(component, eOpts) {
				console.info('Workspace.editorjava.window.completion.tree.TreeCompletion render');
				component.getView().focus();
			}
		}
	,
	initView : function(me) {
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView dataInitialized:' + me.dataInitialized + ' count:' + me.dataInitializedCount);
		if ((me.dataInitialized == undefined || me.dataInitialized == false) && (me.dataInitializedCount == undefined || me.dataInitializedCount != 10)) {
			console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView 1');
			if (me.dataInitializedCount == undefined) {
				console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView dataInitializedCount:' + me.dataInitializedCount);
				me.dataInitializedCount = 0;
			} else {
				console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView dataInitializedCount:' + me.dataInitializedCount + ' > 0');
				me.dataInitializedCount++;
			}
			console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView setTimeOut');
			setTimeout(function () {me.initView(me)}, 500);
			return;
		}
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView 2');// data:' + me.data);
//		Ext.apply(me, {
//			store: Ext.create('Workspace.editorjava.window.completion.tree.data.StoreCompletionMemory',
//				{
//					id: 'storeCompletionMemory',
//					data: me.data
//					,
//				    proxy: {
//				        type: 'memory',
//						data: me.data
//				        ,
//						reader: {
//				            type: 'json'
//				        }
//				    }
//				}
//			)
//		    ,
//		    listeners : {
//				'add' : function ( container, component, index, eOpts ) {
//					console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion add');
//					component.on('itemkeydown', function(view, record, item, index, e, eOpts) {
//						var key = e.keyCode;
//						if (key==Ext.EventObject.ENTER) {// code:13
//							console.info('Workspace.editorjava.window.completion.tree.TreeCompletion Ext.KeyMap ENTER');
//							this.panel.onSubmitTree(this, e);
//						}
//					});
//					component.on('itemdblclick', function(view, record, item, index, e, eOpts) {
//						console.info('Workspace.editorjava.window.completion.tree.TreeCompletion containerdblclick');
//						this.panel.onSubmitTree(this, e);
//					});
//				}
//				,
//				'load' : function(store, records, successful, operation, eOpts) {
//					console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion load successful:'+successful);
//					if (successful) {
////						var view = this.getView();
////						view.panel.getRootNode().expand(true, function(n) {
////							view.select(n[0].firstChild);
////						});
////						view.focus();
//					}
//				}
//				,
//				'render' : function(component, eOpts) {
//					console.info('Workspace.editorjava.window.completion.tree.TreeCompletion render');
//					component.getView().focus();
//				}
//			}
//        });
//		me.store.load(me.data);
//		me.store.load({data:me.data});
//		me.store.load({data:Ext.JSON.decode(me.data)});
		me.store.load(Ext.JSON.decode(me.data));

		Ext.apply(me.store, {
		    data: me.data
		});

//		me.store.sync();
	}
	,
	enableKeyEvents:true
	,
    onSubmitTree: new function(tree, key, evt) {
    	console.info('Workspace.editorjava.window.completion.tree.TreeCompletion onSubmitTree!');
    }

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.TreeCompletion');});