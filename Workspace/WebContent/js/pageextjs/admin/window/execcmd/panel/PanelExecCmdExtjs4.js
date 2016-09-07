Ext.define('Workspace.admin.window.execcmd.panel.PanelExecCmdExtjs4', {
	// REQUIRED

	extend: 'Ext.form.Panel'
	,
	alias: 'workspace.PanelCExecCmd',
	alternateClassName: 'WorkspacePanelExecCmd'
	,
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
			items : [
				{
			        xtype     : 'textareafield',
			        grow      : true,
			        name      : 'commandLine',
			        id        : 'commandLine',
			        fieldLabel: 'Command',
			        anchor    : '100%'
			    }
			],
		    // Reset and Submit buttons
		    buttons : [
			    {
			        text: 'Reset',
			        handler: function() {
			            this.up('form').getForm().reset();
			        }
			    },
			    {
			        text: 'Submit',
			        formBind: true, //only enabled once the form is valid
			        disabled: true
			        ,
			        handler: function() {
			            var form = this.up('form').getForm();
			            if (form.isValid()) {
			                form.submit({
				            	url : '/WorkSpace/action.servlet?event=AdminPageExecCmdValiderExtJs',
			                    success: function(form, action) {
			                       Ext.Msg.alert('Success', action.result.msg);
			                    },
			                    failure: function(form, action) {
			                        Ext.Msg.alert('Failed', action.result.msg);
			                    }
			                });
			            }
			        }
			    }
		    ]
	    });
	    me.callParent(arguments);
	}
	,
    // Fields will be arranged vertically, stretched to full width
    layout: 'anchor',
    defaults: {
        anchor: '100%'
    },
	buttonAlign : 'center',
    bodyPadding: 5,
	border:false,
    width: 350

}, function() {Workspace.tool.Log.defined('Workspace.admin.window.execcmd.panel.PanelExecCmdExtjs4');});
