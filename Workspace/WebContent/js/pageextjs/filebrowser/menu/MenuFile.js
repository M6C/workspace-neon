Ext.define('Workspace.filebrowser.menu.MenuFile',  {
	requires: ['Workspace.common.window.WindowWaiting'],

//	statics: {

		deleteFile : function () {
			var me = this;

			var application = me.checkApplication();
			if (!Ext.isDefined(application))
				return;
		
			var tab = me.checkTab();
			if (!Ext.isDefined(tab))
				return;
		
			var grid = me.checkGrid(tab);
			if (!Ext.isDefined(grid)) {
				return;
			}
		
			var sm = me.checkSelection(grid);
			if (!Ext.isDefined(sm)) {
				return;
			}
		
			var msg = 'Confirm delete ' + sm.getCount() + ' element(s) ?';
			Ext.Msg.confirm('Delete File', msg, function(btn, text) {
		      if (btn == 'yes'){
				var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
		    	Ext.Array.each(sm.getSelection(), function(item, index, allItems) {
		        	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageDeleteValider';
		    		Ext.Ajax.request({
		    		   url: requestUrl,
		    		   params: {fileName:item.internalId},
		    		   success: function(result, request){
		    			   me.manageWindowWaiting(wndWait, 'Delete successfull.', index, allItems.length-1, grid);
		    		   },
		    		   failure: function (result, request) {
		    			   me.manageWindowWaiting(wndWait, 'Delete failed.', index, allItems.length-1, grid);
		    		   }
		    		});
		    	});
		      }
		    });
		}
		,
		manageWindowWaiting(wndWait, message, index, count, grid) {
			if (index < count) {
				Workspace.common.window.WindowWaiting.updateWindowWaiting(wndWait, message);
			} else {
				Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, message);
				grid.refresh();
			}
		}
		,
		checkApplication() {
			var application = Ext.getCmp('project').value;
			if (!Ext.isDefined(application)) {
				Ext.Msg.alert('Delete File', 'No application selected', function() {
					Ext.getCmp('project').focus();
				});
			}
			return application;
		}
		,
		checkTab() {
			var mainCenterPanel = Ext.getCmp('mainCenterPanel');
			var tab = mainCenterPanel.getActiveTab();
			if (!Ext.isDefined(tab)) {
				Ext.Msg.alert('Delete File', 'No active tab');
			}
			return tab;
		}
		,
		checkGrid(tab) {
			var gridId = 'gridFileExplorer_'+tab.id;
			var grid = tab.getComponent(gridId);
			if (!Ext.isDefined(grid)) {
				Ext.Msg.alert('Delete File', 'No active grid');
			}
			return grid;
		}
		,
		checkSelection(grid) {
			var sm = grid.getSelectionModel();
			if (sm.getCount() == 0) {
				Ext.Msg.alert('Delete File', 'No row selected');
				return;
			}
			return sm;
		}
//	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.center.function.AddTab');});