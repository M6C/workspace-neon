Ext.define('Workspace.editorjava.panel.south.PanelConsole', {

	extend: 'Ext.panel.Panel'
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
	layout: 'fit',
    items: [{
        xtype     : 'textareafield',
        id        : 'fieldConsole',
        fieldCls  : 'console',
        grow      : true,
        name      : 'console',
        anchor    : '100%'
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