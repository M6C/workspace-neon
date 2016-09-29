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
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			store: Ext.create('Workspace.editorjava.window.completion.tree.data.StoreCompletion',
				{
					filename:me.filename,
					pos:me.pos,
					txt:me.txt
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
//						var view = this.getView();
//						view.panel.getRootNode().expand(true, function(n) {
//							view.select(n[0].firstChild);
//						});
//						view.focus();
					}
				}
				,
				'render' : function(component, eOpts) {
					console.info('Workspace.editorjava.window.completion.tree.TreeCompletion render');
					component.getView().focus();
				}
			}
        });
	    me.callParent(arguments);
	}
	,
	enableKeyEvents:true
	,
    onSubmitTree: new function(tree, key, evt) {
    	console.info('Workspace.editorjava.window.completion.tree.TreeCompletion onSubmitTree!');
    }

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.TreeCompletion');});