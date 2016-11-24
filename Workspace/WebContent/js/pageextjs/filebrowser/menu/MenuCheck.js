Ext.define('Workspace.filebrowser.menu.MenuCheck',  {
	requires: ['Workspace.common.window.WindowWaiting'],

	statics: {

		manageWindowWaiting : function(wndWait, message, index, count, grid) {
			if (index < count) {
				Workspace.common.window.WindowWaiting.updateWindowWaiting(wndWait, message);
			} else {
				Workspace.common.window.WindowWaiting.hideWindowWaiting(wndWait, message);
				grid.refresh();
			}
		}
		,
		check : function(ret) {
			if (!Ext.isDefined(ret)) {
				ret = {};
			}
			ret.success = true;
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
				if (!Ext.isDefined(config.alertApplication) || config.alertApplication == true) {
					Ext.Msg.alert('Delete File', 'No application selected', function() {
						Ext.getCmp('project').focus();
					});
				}
				config.checkApplication = true;
				return false;
			}
			config.checkApplication = false;
			return true;
		}
		,
		checkTab : function(config) {
			config.tab = Ext.getCmp('mainCenterPanel').getActiveTab();
			if (!Ext.isDefined(config.tab)) {
				if (!Ext.isDefined(config.alertTab) || config.alertTab == true) {
					Ext.Msg.alert('Delete File', 'No active tab');
				}
				config.checkTab = true;
				return false;
			}
			config.checkTab = false;
			return true;
		}
		,
		checkGrid : function(config) {
			config.grid = config.tab.getComponent('gridFileExplorer_'+config.tab.id);
			if (!Ext.isDefined(config.grid)) {
				if (!Ext.isDefined(config.alertGrid) || config.alertGrid == true) {
					Ext.Msg.alert('Delete File', 'No active grid');
				}
				config.checkGrid = true;
				return false;
			}
			config.checkGrid = true;
			return true;
		}
		,
		checkSelection : function(config) {
			config.sm = config.grid.getSelectionModel();
			if (config.sm.getCount() == 0) {
				if (!Ext.isDefined(config.alertSelection) || config.alertSelection== true) {
					Ext.Msg.alert('Delete File', 'No row selected');
				}
				config.checkSelection = true;
				return false;
			}
			config.checkSelection = false;
			return true;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.menu.MenuCheck');});