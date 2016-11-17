Ext.define('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove', {
	extend: 'Workspace.poc.draganddrop.common.function.ApplyDragAndDrop'
	,
	statics: {

		apply : function(cmp, onBeforeDrop, onDrop) {
		    console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove apply');

		    var me = Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove;

		    Ext.Loader.syncRequire('Workspace.poc.draganddrop.common.function.ApplyDragAndDrop');
			Workspace.poc.draganddrop.common.function.ApplyDragAndDrop.apply(cmp, me.onBeforeDrop, me.onDrop);
		}
		,
		onBeforeDrop : function(cmp, nodeEl, data) {
			console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onBeforeDrop');
			if (!Ext.isDefined(nodeEl.viewRecordId)) {
				nodeEl.viewRecordId = '[' + Ext.getCmp('project').value + ']';
				dataDst = {
					internalId : nodeEl.viewRecordId,
					data: {
						contentType: 'directory'
					}
				}
			} else {
				dataDst = cmp.store.data.getByKey(nodeEl.viewRecordId);
			}
			if (dataDst.data.contentType != 'directory') {
		        var text = 'No move/copy because destination is not a directory.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onBeforeDrop', 'error', text);
		        console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onBeforeDrop error:' + text);

				return false;
			}
			var itemsDst = cmp.store.data.items;
			var size = data.records.length;
			for(var i=0 ; i<size ; i++) {
				record = data.records[i];
				if (dataDst.internalId == record.internalId)  {
			    	var text = 'No move/copy because destination path and source path can not be same. from:'+record.internalId + ' to:'+dataDst.internalId;
			        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.function.CopyMove.call', 'error', text);
			        console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onBeforeDrop error:' + text);

			        return false;
				}
				record.internalId = dataDst.internalId + '\\' + record.data.text;
			}
			return true;
		}
		,
		onDrop : function(cmp, node, data, overModel, dropPosition, option) {
			console.info('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove onDrop');

		    Ext.Loader.syncRequire('Workspace.filebrowser.grid.fileexplorer.OnDropExplorer');

		    return Workspace.filebrowser.grid.fileexplorer.OnDropExplorer.call(cmp, node, data, overModel, dropPosition, option);
//			cmp.getStore().load();
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.poc.draganddrop.function.ApplyDragAndDropCopyMove');});