Ext.define('Workspace.common.tool.Toast', {
	requires: ['Ext.ux.window.Notification']
	,
	statics: {

		show : function(message, closeDelay = 4000) {
		    console.info('Workspace.common.function.ApplyDragAndDrop apply');
		    Ext.create('widget.uxNotification', {
				position: 'tr',
				useXAxis: true,
				cls: 'ux-notification-light',
				iconCls: 'ux-notification-icon-information',
				closable: false,
				title: '',
				html: message,
				slideInDuration: 800,
				slideBackDuration: 1500,
				autoCloseDelay: closeDelay,
				slideInAnimation: 'elasticIn',
				slideBackAnimation: 'elasticIn'
			}).show();
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.tool.Toast');});