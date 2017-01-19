Ext.define('Workspace.common.panel.function.ApplySessionStateTabPanel', {
	singleton : true,
	options : {}
	,
	apply: function(panel, stateId) {
	    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply stateId:' + stateId);
		Ext.apply(panel, {
			stateful: true,
			stateId: stateId,
			stateEvents: ['add', 'remove', 'tabchange'], 
			stateData: undefined,
		    getState: function() { 
			    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply getState');
		        var s = {raw: []}; 
		        if (!Ext.isEmpty(panel.getActiveTab())) {
		            var tab = panel.getActiveTab();
                    var raw = panel.getRawFromTab(tab);
					s.activeTab = raw;
		        }
		        if (!Ext.isEmpty(panel.items)) {
					var i = 0;
			        panel.items.each(function(tab) {
                        var raw = panel.getRawFromTab(tab);
						s.raw[i++] = raw;
					});
		        }
		        return s; 
		    }
			, 
		    applyState: function(s) { 
			    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply applyState');
		        panel.stateData = s;
		    }
		    ,
		    getRawFromTab: function(tab) {
                var raw = tab.raw;
    			var editor = ace.edit(tab.panelEditorId);
    			raw.cursorRow = editor.cursorRow;
    			raw.cursorCol = editor.cursorCol;
    			raw.changeScrollTop = editor.changeScrollTop;
    			raw.changeScrollLeft = editor.changeScrollLeft;
	    		console.info('getRawFromTab - cursorCol:' + editor.cursorCol + ' cursorRow:' + editor.cursorRow + ' ScrollTop:' + editor.changeScrollTop + ' ScrollLeft:' + editor.changeScrollLeft + ' id:' + editor.id);
    			return raw;
		    }
	    });

		panel.on('render', function(component, option) {
		    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply render');
		    var stateData = panel.stateData;
			if (!Ext.isEmpty(stateData)) {
			    if(!Ext.isEmpty(stateData.raw)) {
    		    	Ext.Array.each(stateData.raw, function(tab) {
    		    		if (tab != null) {
    		    			panel.onAddTab(tab);
    		    		}
    				});
    			}

			    if(!Ext.isEmpty(stateData.activeTab)) {
			        panel.setActiveTab(stateData.activeTab.id);
			    }

    			panel.stateData = undefined;
			}
		});

//		panel.on('show', function(component, option) {
//		    console.debug('Workspace.common.panel.function.ApplySessionStateTabPanel apply show');
//			if (Ext.isDefined(panel.stateData) && Ext.isDefined(panel.stateData.raw)) {
//				var application = Ext.getCmp('project').getValue();
//				var tree = Ext.getCmp('treeDirectory');
//		    	Ext.Array.each(panel.stateData.raw, function(tab) {
//					if (tab.application == application) {
//						var path = tab.path;
//						path = path.substring(path.indexOf(']')+1);
//						tree.expandPath(path);
//					}
//				});
//				panel.stateData = undefined;
//			}
//		});
	}
}, function() {Workspace.tool.Log.defined('Workspace.common.panel.function.ApplySessionStateTabPanel');});