Ext.define('Workspace.editorjava.aceeditor.command.CommandFindResource',  {
	requires: [
  	     'Workspace.common.tool.Pop'
  	]
  	,
	statics: {
	    addCommand: function(editor, panelTab) {
			var me = this;
		    editor.commands.addCommand({
		        name: 'FindResource',
		        bindKey: {win: 'Ctrl-Shift-R',  mac: 'Command-Option-R'},
		        exec: me.openFindResource,
		        readOnly: true // false if this command should not apply in readOnly mode
		    });
	    }
	    ,
	    addListener: function(component) {
			var me = this;
		    component.on('keypress', function (field, event) {
    	        if (event.ctrlKey && event.shiftKey && event.charCode == Ext.EventObject.R) {
		            me.openFindResource();
		        }
		    });
/*		    component.on('specialkey', function(field, event) {
    	        if (event.ctrlKey && event.shiftKey && event.charCode == Ext.EventObject.R) {
    	            me.openFindResource();
                }
            });
*/	    }
	    ,
	    // Private
	    openFindResource: function(container) {
			console.info('Workspace.editorjava.aceeditor.command.CommandFindResource exec');

			var me = this;
			var application = Ext.getCmp('project').value;

			if (Ext.isEmpty(application)) {
				Workspace.common.tool.Pop.info(me, 'No application selected');
				return;
			}

			var panelTab=Ext.getCmp('mainCenterPanel');
            var tab = panelTab.getActiveTab();
			var editor = ace.edit(tab.panelEditorId);

//					editor.selection.selectWord();

			var text=escape(editor.getSelectedText());
			var fnOnSubmitTree = function(view, record, item, index, event, eOpts) {
				var sm = view.getSelectionModel();
				if (sm.getSelection().length>0) {
					var node = sm.getSelection()[0];
					panelTab.onAddTab(node.raw);
					this.ownerCt.close();
				}
			};

			Ext.create('Workspace.editorjava.window.WindowFindResource', {
				nameFilter: text,
				application: application,
				onSubmit:fnOnSubmitTree
				,
				listeners : {
					'destroy' : function (wnd) {
						console.info('Workspace.editorjava.window.WindowFindResource destroy');
						editor.focus();
					}
				}
			}).show();
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandFindResource');});