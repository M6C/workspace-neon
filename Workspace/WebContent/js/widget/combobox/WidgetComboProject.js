Ext.define('Workspace.widget.combobox.WidgetComboProject', {
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
	onActionItem(tabPanel, newCard, oldCard, option) {
		console.info('Workspace.widget.combobox.WidgetComboProject onActionItem do nothing');
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
}, function() {Workspace.tool.Log.defined('Workspace.widget.combobox.WidgetComboProject');});