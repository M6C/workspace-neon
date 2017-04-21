Ext.define('Workspace.editorjava.panel.south.PanelConsole', {
	requires: [
	     'Workspace.tool.UtilString',
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
        xtype     : 'textareafield',
        id        : 'fieldConsole',
        name      : 'commandLine',
        fieldCls  : 'console',
        grow      : true,
        anchor    : '100%',
        enableKeyEvents : true,
//        autoScroll: true,
        listeners : {
            keyup: function(me, event, eOpts) {
        		var key = event.getKey();
        	    if (key == event.ENTER) {
                    var form = me.up('form').getForm();
                    form.submit({
                        url : DOMAIN_NAME_ROOT + '/action.servlet?event=AdminPageExecCmdValiderExtJs',
                        success: function(form, action) {
                        	me.updateResponse(true, action.result);
                        },
                        failure: function(form, action) {
                        	me.updateResponse(false, action.result);
                        }
                    });
        	    }
//        	    else if (key == event.LEFT) {
//        	    } else if (key == event.RIGHT) {
//        	   // } else if ((64 <= key && key <= 90 /*ALPHA*/) || (48 <= key && key <= 57 /*NUMBER*/) || (96 <= key && key <= 105 /*NUMBER PAD*/) || (key == 32 /*SPACE*/)) {
//        	    } else if (!Ext.isEmpty(Workspace.common.constant.ConstantKeyboard.keyboardMapChar[key])) {
//        	        var char = event.browserEvent.key;
//                    field.setRawValue(field.getRawValue() + char);
//        	    }
            }
        }
        ,
        updateResponse: function (success, result) {
        	var field = Ext.getCmp('fieldConsole');
        	var msg = '';
        	if (Ext.isDefined(result)) {
        		msg = result.msg;
        	}
        	field.setValue(field.getValue() + Workspace.tool.UtilString.decodeUtf8(msg));
//        	Ext.Msg.alert(success ? 'Success' : 'Failed', msg);
        }
    }]
    ,
    listenerShow: function(me, options) {
        var fieldConsole=Ext.getCmp('fieldConsole');
        fieldConsole.focus(false, true);
    }
	,
    useArrows: true,
    autoScroll: true,
    containerScroll: true,
    border: false,
    collapsible: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.south.PanelConsole');});