Ext.define('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer',  {
	requires: ['Workspace.filebrowser.grid.fileexplorer.function.CopyMove']
	,
	statics: {

		call : function(grid, nodeEl, data) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call OnBeforeDropExplorer');

		    if (!Ext.isDefined(nodeEl.viewRecordId)) {
				nodeEl.viewRecordId = '[' + Ext.getCmp('project').value + ']';
				dataDst = {
					internalId : nodeEl.viewRecordId,
					data: {
						contentType: 'directory'
					}
				}
			} else {
				dataDst = grid.store.data.getByKey(nodeEl.viewRecordId);
			}
			if (dataDst.data.contentType != 'directory') {
		        var text = 'No move/copy because destination is not a directory.';
		        Ext.getCmp('mainSouthPanel').log('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer', 'error', text);
		        console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer error:' + text);

				return false;
			}

		    var itemPathDst = nodeEl.viewRecordId;//mainCenterTab.id;
		    return Workspace.filebrowser.grid.fileexplorer.function.CopyMove.check(grid, itemPathDst, data);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer');});