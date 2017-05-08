Ext.define('Workspace.editorjava.window.WindowAutoDeploy', {
	requires: [
   	    'Workspace.common.tool.Pop'
   	]
   	,
	extend: 'Ext.Window'
	,
	alias: 'widget.editorjavaWindowAutoDeploy',
	alternateClassName: 'WorkspaceEditorJavaWindowAutoDeploy'
	,
	// Must be override
	onItemSelected: function(combo, newValue, oldValue, option) {
		console.info('Workspace.editorjava.window.WindowAutoDeploy onTabChange do nothing');
	},
	// private
	initComponent : function(){
		var me = this;

		Ext.apply(me, {
			layout: {
			    type: 'anchor',
                align: 'stretch'
			}
			,
		    items : [
				{
				    anchor: '100% 10%',
					xtype: 'combo',
				    id: 'nameFilter',
				    name: 'nameFilter',
				    fieldLabel: '',
				    allowBlank: false,
				    enableKeyEvents: true,
				    emptyText: 'Name Filter',
				    value: me.application,
        		    store: Ext.create('Workspace.common.form.combobox.data.StoreProjectExtjs4', {autoload: true, buffered: true}),
                    displayField:'project'
                	,
                    initComponent : function(){
                		var me = this;
                
                        Workspace.tool.UtilComponent.addListener(me, 'change', me.listenerChange);
                
                		me.callParent(arguments);
                	}
                	,
                	listenerChange: function (combo, newValue, oldValue, option) {
                	    if (!Ext.isEmpty(newValue)) {
                    	    me.onActionItem(combo, newValue, oldValue, option);
                	    }
                	}
				}
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowAutoDeploy show');
				}
			}
		});

		me.callParent(arguments);
	}
	,
	onKeyPress: function (field, event, option) {
        var me = field;
        var wnd = me.up('window');
		var key = event.getKey();
	    if (key == event.ENTER) {
            wnd.onItemSelected(field.getText());
	    }
	    return true;
    }
	,
	title: 'Auto Deploy',
	layout:'fit',
	width:730,
	height:300,
	//autoHeight: true,        //hauteur de la fen?tre
	modal: true
	/*,             //Grise automatiquement le fond de la page
	closeAction:'hide',
	plain: true
	*/

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.WindowAutoDeploy');});