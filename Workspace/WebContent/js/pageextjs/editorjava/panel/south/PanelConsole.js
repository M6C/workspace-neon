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

        Workspace.tool.UtilComponent.addListener(me, 'activate', me.listenerActivate);

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
    listenerActivate: function(me, options) {
        // var fieldConsole=me.child('fieldConsole');
        // fieldConsole.focus();
    }
	,
    useArrows: true,
    autoScroll: false,
    containerScroll: true,
    border: false,
    collapsible: false

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.south.PanelConsole');});