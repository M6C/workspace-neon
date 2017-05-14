Ext.define('Workspace.editorjava.window.WindowAutoDeploy', {
	requires: [
   	    'Workspace.common.tool.Pop',
	    'Workspace.common.form.combobox.ComboProjectExtjs4'
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

        var combo = Ext.create('Workspace.common.form.combobox.ComboProjectExtjs4', {
            anchor: '100% 10%', 
		    id: 'nameFilter',
		    name: 'nameFilter',
            // value: me.application,
            valueField: me.application
        });

        Workspace.tool.UtilComponent.addListener(me, 'change', me.onItemSelected);
        // Workspace.tool.UtilComponent.addListener(me.store, 'load', function() {me.focus();});

		Ext.apply(me, {
			layout: {
			    type: 'anchor',
                align: 'stretch'
			}
			,
		    items : [
		        combo
		    ]
			,
			listeners : {
				'show' : function (wnd) {
					console.info('Workspace.editorjava.window.WindowAutoDeploy show');
					new Ext.util.DelayedTask().delay(100, function() {
                        combo.setRawValue(me.application);
    					new Ext.util.DelayedTask().delay(100, function() {
                            combo.setSelectText(0,0);
                            combo.focus(false, true);
    					});
					});
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