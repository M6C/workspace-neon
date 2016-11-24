Ext.define('Workspace.filebrowser.menu.MenuFile',  {
	requires: ['Workspace.common.window.WindowWaiting',
	           'Workspace.filebrowser.menu.MenuCheck'
	],

//	statics: {

		deleteFile : function () {
			var me = this;

			var config = Workspace.filebrowser.menu.MenuCheck.check();
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
			var config = {alertSelection: false}; 
			config = Workspace.filebrowser.menu.MenuCheck.check(config);
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
//	}

}, function() {Workspace.tool.Log.defined('Workspace.filebrowser.menu.MenuFile');});