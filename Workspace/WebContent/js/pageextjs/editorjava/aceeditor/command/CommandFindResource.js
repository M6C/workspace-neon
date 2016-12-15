Ext.define('Workspace.editorjava.aceeditor.command.CommandFindResource',  {
	requires: [
  	     'Workspace.common.tool.Pop'
  	]
  	,
	statics: {
	    addCommand: function(editor, panelTab) {
		    editor.commands.addCommand({
		        name: 'FindResource',
		        bindKey: {win: 'Ctrl-Shift-R',  mac: 'Command-Option-R'},
		        exec: function(container) {
					console.info('Workspace.editorjava.aceeditor.command.CommandFindResource exec');

					var me = this;
					var application = Ext.getCmp('project').value;

					if (Ext.isEmpty(application)) {
						Workspace.common.tool.Pop.info(me, 'No application selected');
						return;
					}

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
		        },
		        readOnly: true // false if this command should not apply in readOnly mode
		    });
	    }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandFindResource');});