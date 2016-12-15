Ext.define('Workspace.editorjava.window.WindowFindResource', {
	requires: [
   	    'Workspace.common.tool.Pop'
   	]
   	,
	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowFindResource',
	alternateClassName: 'WorkspaceEditorJavaWindowFindResource'
	,
	// private
	initComponent : function(){
		var me = this;

		var grid = Ext.create('Workspace.editorjava.window.findresource.grid.GridFindResource', {
		    anchor: '100% 90%',
    		id:'gridFindResource',
    		nameFilter: me.nameFilter,
    		application: me.application,
    		onSubmit: me.onSubmit
    	});

		Ext.apply(me, {
			layout: {
			    type: 'anchor',
                align: 'stretch'
			}
			,
		    items : [
				{
				    anchor: '100% 10%',
					xtype: 'textfield',
				    id: 'nameFilter',
				    name: 'nameFilter',
				    fieldLabel: '',
				    allowBlank: false,
				    enableKeyEvents: true,
				    value: me.nameFilter,
				    listeners: {
				    	keypress : function (field, event, option) {
				    		var key = event.getKey();
				    		if (key == event.ENTER) {
				    			var store = grid.getStore();
				    			if (store.isLoading()) {
				    				Workspace.common.tool.Pop.info(me, 'Find resource loading in progress.');
				    			} else {
									grid.getStore().load(new Ext.data.Operation({
							    		action : 'read',
							    		params: {
							    			nameFilter: field.getValue()
							    		}
							    	}));
				    			}
				    		}
				    	}
				    }
				}
				,
				grid
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowFindResource activate');
					Ext.getCmp('nameFilter').focus(false, 200);
				}
				,
				'destroy' : me.listeners.destroy
			}
		});

		me.callParent(arguments);
	}
	,
	title: 'Find Resource',
	layout:'fit',
	width:730,
	height:300,
	//autoHeight: true,        //hauteur de la fen�tre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowFindResource');});