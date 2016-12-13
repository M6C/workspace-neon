Ext.define('Workspace.widget.combobox.ComboProject', {
	requires: [
  	     'Workspace.common.form.combobox.function.ApplySessionStateCombo'
  	]
  	,
	extend: 'Workspace.common.form.combobox.ComboProjectExtjs4'
	,
	alias: 'widget.widgetComboProject',
	alternateClassName: 'WorkspaceWidgetComboProject'
	,
	// Must be override
	onActionItem(combo, newValue, oldValue, option) {
		console.info('Workspace.widget.combobox.ComboProject actionItem do nothing');
	}
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			listeners: {
				'change': function (combo, newValue, oldValue, option) {
					me.onActionItem(combo, newValue, oldValue, option);
				}
			}
		});

		var stateId = Ext.getClassName(me);
		Workspace.common.form.combobox.function.ApplySessionStateCombo.apply(me, stateId);

		me.callParent(arguments);
	}
}, function() {Workspace.tool.Log.defined('Workspace.widget.combobox.ComboProject');});