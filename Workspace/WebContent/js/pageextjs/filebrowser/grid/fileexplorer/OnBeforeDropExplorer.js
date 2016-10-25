Ext.define('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer',  {
	requires: ['Workspace.filebrowser.grid.fileexplorer.function.CopyMove']
	,
	statics: {

		call : function(grid, nodeEl, data) {
		    console.info('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer.call OnBeforeDropExplorer');

//		    var itemPathDst = nodeEl.viewRecordId;//mainCenterTab.id;
//
//		    return Workspace.filebrowser.grid.fileexplorer.function.CopyMove.call(grid, itemPathDst, data);
		    return true;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.grid.fileexplorer.OnBeforeDropExplorer');});