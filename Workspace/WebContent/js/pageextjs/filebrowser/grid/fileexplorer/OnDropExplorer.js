Ext.define('Workspace.filebrowser.grid.fileexplorer.OnDropExplorer',  {
	requires: ['Workspace.filebrowser.grid.fileexplorer.function.CopyMove']
	,
	statics: {

		call : function(grid, node, data, overModel, dropPosition, eOpts) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.OnDropExplorer.call OnDropExplorer');

		    var itemPathDst = node.viewRecordId;//mainCenterTab.id;

		    return Workspace.filebrowser.grid.fileexplorer.function.CopyMove.request(grid, itemPathDst, data);
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.fileexplorer.OnDropExplorer');});