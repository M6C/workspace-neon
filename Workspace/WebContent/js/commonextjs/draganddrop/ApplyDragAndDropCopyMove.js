Ext.define('Workspace.common.draganddrop.ApplyDragAndDropCopyMove', {
	extend: 'Workspace.common.draganddrop.ApplyDragAndDrop'
	,
	statics: {

		apply : function(cmp) {
		    console.info('Workspace.common.draganddrop.ApplyDragAndDropCopyMove apply');

		    var me = Workspace.common.draganddrop.ApplyDragAndDropCopyMove;

		    Ext.Loader.syncRequire('Workspace.common.draganddrop.ApplyDragAndDrop');
			Workspace.common.draganddrop.ApplyDragAndDrop.apply(cmp, me.onBeforeDrop, me.onDrop);
		}
		,
		onBeforeDrop : function(cmp, node, data) {
			console.info('Workspace.common.draganddrop.ApplyDragAndDropCopyMove onBeforeDrop');

			Ext.Loader.syncRequire('Workspace.common.draganddrop.event.OnBeforeDropExplorer');
		    return Workspace.common.draganddrop.event.OnBeforeDropExplorer.call(cmp, node, data);
		}
		,
		onDrop : function(cmp, node, data, overModel, dropPosition, option) {
			console.info('Workspace.common.draganddrop.ApplyDragAndDropCopyMove onDrop');

			Ext.apply(overModel.data, overModel.raw);

		    Ext.Loader.syncRequire('Workspace.common.draganddrop.event.OnDropExplorer');
		    return Workspace.common.draganddrop.event.OnDropExplorer.call(cmp, node, data, overModel, dropPosition, option);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.draganddrop.ApplyDragAndDropCopyMove');});