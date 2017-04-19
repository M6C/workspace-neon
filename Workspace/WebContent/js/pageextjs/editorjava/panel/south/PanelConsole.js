Ext.define('Workspace.editorjava.panel.south.PanelConsole', {
	requires: [
  	     'Workspace.common.constant.ConstantKeyboard'
  	]
	,
	extend: 'Ext.form.Panel'
	,
	alias: 'widget.panelDebugConsole',
	alternateClassName: 'WorkspacePanelDebugConsole',
	id: 'PanelDebugConsole',
	title: 'Console'
	,
    initComponent : function() {
		var me = this;

        Workspace.tool.UtilComponent.addListener(me, 'show', me.listenerShow);

		me.callParent(arguments);
	},
// 	layout: 'fit',
    items: [
        {
            xtype     : 'hiddenfield',
            // xtype     : 'textfield',
            name      : 'commandLine',
            id        : 'commandLine'
        }
        ,
        {
        xtype     : 'textareafield',
        id        : 'fieldConsole',
        fieldCls  : 'console',
        grow      : true,
        name      : 'console',
        anchor    : '100%',
        enableKeyEvents : true,
        listeners : {
            keyup: function(me, event, eOpts) {
        		var key = event.getKey();
                var field = Ext.getCmp('commandLine');
        	    if (key == event.ENTER) {
                    field.setRawValue('');
                    var form = me.up('form').getForm();
                    form.submit({
                        url : DOMAIN_NAME_ROOT + '/action.servlet?event=AdminPageExecCmdValiderExtJs',
                        success: function(form, action) {
                           Ext.Msg.alert('Success', action.result.msg);
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Failed', action.result.msg);
                        }
                    });
        	    } else if (key == event.LEFT) {
        	    } else if (key == event.RIGHT) {
        	   // } else if ((64 <= key && key <= 90 /*ALPHA*/) || (48 <= key && key <= 57 /*NUMBER*/) || (96 <= key && key <= 105 /*NUMBER PAD*/) || (key == 32 /*SPACE*/)) {
        	    } else if (!Ext.isEmpty(Workspace.common.constant.ConstantKeyboard.keyboardMapChar[key])) {
        	        var char = event.browserEvent.key;
                    field.setRawValue(field.getRawValue() + char);
        	    }
            }
        }
    }]
    ,
    listenerShow: function(me, options) {
        var fieldConsole=Ext.getCmp('fieldConsole');
        fieldConsole.focus(false, true);
    }
	,
    useArrows: true,
    autoScroll: false,
    containerScroll: true,
    border: false,
    collapsible: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.south.PanelConsole');});