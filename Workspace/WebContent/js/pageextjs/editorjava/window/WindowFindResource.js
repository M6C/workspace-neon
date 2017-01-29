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

        var gridHeight = 100;
		if(!Ext.isDefined(me.showNameFilter) || me.showNameFilter == true) {
		    gridHeight -= 10;
		}
	    if(!Ext.isDefined(me.showContentFilter) || me.showContentFilter == true) {
		    gridHeight -= 20;
	    }

		var grid = Ext.create('Workspace.editorjava.window.findresource.grid.GridFindResource', {
		    anchor: '100% ' + gridHeight + '%',
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
				    emptyText: 'Name Filter',
				    value: me.nameFilter,
				    listeners: {
				    	keypress : me.onKeyPress
				    }
				}
				,
				{
				    anchor: '100% 10%',
					xtype: 'textfield',
				    id: 'contentFilter',
				    name: 'contentFilter',
				    fieldLabel: '',
				    allowBlank: false,
				    enableKeyEvents: true,
				    emptyText: 'Content Filter',
				    value: me.contentFilter,
				    listeners: {
				    	keypress : me.onKeyPress
				    }
				}
				,
				{
				    anchor: '100% 10%',
					xtype: 'textfield',
				    id: 'extentionFilter',
				    name: 'extentionFilter',
				    fieldLabel: '',
				    allowBlank: true,
				    enableKeyEvents: true,
				    emptyText: 'Extention Filter (Separator=\';\')',
				    value: me.extentionFilter,
				    listeners: {
				    	keypress : me.onKeyPress
				    }
				}
				,
				grid
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowFindResource show');
					if (me.showContentFilter) {
					    Ext.getCmp('contentFilter').focus(false, 200);
					} else if (me.showNameFilter) {
					    Ext.getCmp('nameFilter').focus(false, 200);
					}

				    Ext.getCmp('nameFilter').setVisible(!Ext.isDefined(me.showNameFilter) || me.showNameFilter == true);
				    Ext.getCmp('contentFilter').setVisible(!Ext.isDefined(me.showContentFilter) || me.showContentFilter == true);
				    Ext.getCmp('extentionFilter').setVisible(!Ext.isDefined(me.showContentFilter) || me.showContentFilter == true);
				}
				,
				'destroy' : me.listeners.destroy
			}
		});

		me.callParent(arguments);
	}
	,
	onKeyPress: function (field, event, option) {
		var key = event.getKey();
		if (key == event.ENTER) {
		    var nameFilter = Ext.getCmp('nameFilter').getValue();
		    var contentFilter = Ext.getCmp('contentFilter').getValue();
		    var extentionFilter = Ext.getCmp('extentionFilter').getValue();
			var grid=Ext.getCmp('gridFindResource');
			var store = grid.getStore();
			if (store.isLoading()) {
				Workspace.common.tool.Pop.info(me, 'Find resource loading in progress.');
			} else {
			    var idx1 = nameFilter.indexOf('[');
			    var idx2 = nameFilter.indexOf(']');
			    if (idx1 == 0 && idx2 > 0) {
			        
			    }
				grid.getStore().load(new Ext.data.Operation({
		    		action : 'read',
		    		params: {
		    			nameFilter: nameFilter,
		    			contentFilter: contentFilter,
		    			extentionFilter: extentionFilter
		    		}
		    	}));
			}
		}
	}
	,
	title: 'Find Resource',
	layout:'fit',
	width:730,
	height:300,
	//autoHeight: true,        //hauteur de la fen?tre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowFindResource');});