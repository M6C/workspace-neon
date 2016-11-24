Ext.define('Workspace.filebrowser.menu.MenuFile',  {
	requires: ['Workspace.common.window.WindowWaiting'],

//	statics: {

		deleteFile : function () {
			var me = this;

			var config = me.check();
			if (config.success == false) {
				return;
			}
		
			var msg = 'Confirm delete ' + config.sm.getCount() + ' element(s) ?';
			Ext.Msg.confirm('Delete File', msg, function(btn, text) {
		      if (btn == 'yes'){
				var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();
		    	Ext.Array.each(config.sm.getSelection(), function(item, index, allItems) {
		        	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageDeleteValider';
		    		Ext.Ajax.request({
		    		   url: requestUrl,
		    		   params: {fileName:item.internalId},
		    		   success: function(result, request){
		    			   me.manageWindowWaiting(wndWait, 'Delete successfull.', index, allItems.length-1, config.grid);
		    		   },
		    		   failure: function (result, request) {
		    			   me.manageWindowWaiting(wndWait, 'Delete failed.', index, allItems.length-1, config.grid);
		    		   }
		    		});
		    	});
		      }
		    });
		}
		,
		archive : function (type) {
			var me = this;

			var msg = "";
			var pathSrc = "";
			var config = me.check();
			if (config.success == false) {
				if (Ext.isDefined(config.sm) && (config.sm.getCount() == 0)) {
					msg = 'Archive all current elements in ' + type + '?';
					pathSrc = config.tab.id;
				} else {
					return;
				}
			} else {
				var cnt = config.sm.getCount();
				msg = 'Archive ' + cnt + ' element' + (cnt > 1 ? 's' : '') + ' in ' + type + '?';
		    	Ext.Array.each(config.sm.getSelection(), function(item, index, allItems) {
		    		if (index>0) {
		    			pathSrc += ";";
		    		}
		    		pathSrc += item.internalId;
		    	});
			}

	    	var fx = function(btn, text) {
				if (btn == 'ok'){
					var wndWait = Workspace.common.window.WindowWaiting.showWindowWaiting();

			    	var pathDst = config.tab.id;
					var fileName = text.toLowerCase();
			    	var requestUrl = DOMAIN_NAME_ROOT + '/action.servlet?event=EditorJavaPageZipValider';
		    		Ext.Ajax.request({
		    		   url: requestUrl,
		    		   params: {pathSrc:pathSrc, pathDst:pathDst, fileName:fileName},
		    		   success: function(result, request){
		    			   me.manageWindowWaiting(wndWait, 'Archive \'' + type + '\' successfull.', 1, 1, config.grid);
		    		   },
		    		   failure: function (result, request) {
		    			   me.manageWindowWaiting(wndWait, 'Archive \'' + type + '\' failed.', 1, 1, config.grid);
		    		   }
		    		});
				}
			};

			var fileName = "archive." + type.toLowerCase();
			Ext.Msg.prompt('Delete File', msg, fx, me, false, fileName);
		}
		// Private Stuff
		,
		manageWindowWaiting : function(wndWait, message, index, count, grid) {
			if (index < count) {
				Workspace.common.window.WindowWaiting.updateWindowWaiting(wndWait, message);
			} else {
				Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, message);
				grid.refresh();
			}
		}
		,
		check : function() {
			var ret = {success:true};
			var me = this;

			if (!me.checkApplication(ret)) {
				ret.success = false;
				return ret;
			}
		
			if (!me.checkTab(ret)) {
				ret.success = false;
				return ret;
			}
		
			if (!me.checkGrid(ret)) {
				ret.success = false;
				return ret;
			}

			if (!me.checkSelection(ret)) {
				ret.success = false;
				return ret;
			}

			return ret;
		}
		,
		checkApplication : function(config) {
			config.application = Ext.getCmp('project').value;
			if (!Ext.isDefined(config.application)) {
				Ext.Msg.alert('Delete File', 'No application selected', function() {
					Ext.getCmp('project').focus();
				});
				return false;
			}
			return true;
		}
		,
		checkTab : function(config) {
			config.tab = Ext.getCmp('mainCenterPanel').getActiveTab();
			if (!Ext.isDefined(config.tab)) {
				Ext.Msg.alert('Delete File', 'No active tab');
				return false;
			}
			return true;
		}
		,
		checkGrid : function(config) {
			config.grid = config.tab.getComponent('gridFileExplorer_'+config.tab.id);
			if (!Ext.isDefined(config.grid)) {
				Ext.Msg.alert('Delete File', 'No active grid');
				return false;
			}
			return true;
		}
		,
		checkSelection : function(config) {
			config.sm = config.grid.getSelectionModel();
			if (config.sm.getCount() == 0) {
				Ext.Msg.alert('Delete File', 'No row selected');
				return false;
			}
			return true;
		}
//	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.panel.center.function.AddTab');});