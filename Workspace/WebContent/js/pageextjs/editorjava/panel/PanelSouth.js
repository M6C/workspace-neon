// DOUBLON A MUTUALISER
Ext.define('Workspace.editorjava.panel.PanelSouth', {
	// REQUIRED

	extend: 'Workspace.common.panel.PanelCollapsible'
	,
	alias: 'widget.panelSouth',
	alternateClassName: 'PanelSouth'
	,
	id: 'mainSouthPanel',
	region: 'south',
	bodyStyle: 'padding:0px',
//	layout: 'fit',
	hideHeaders: true,
	hideCollapseTool: true,
	collapseMode: 'mini',
	collapsed: true,
	maxHeight: 150
	,
	// private
    initComponent : function(){
		var me = this;
		Ext.apply(me, {
            items : [
				Ext.create('Workspace.editorjava.grid.GridTrace', {id: 'editorjavaGridTrace'})
            ]
			,
			listeners: {
				resize: function (cmp, adjWidth, adjHeight, eOpts ) {
					console.info('Workspace.editorjava.panel.PanelSouth resize!');
				    // Bloque le redimentionnement de la hauteur au max
				    var h = this.getSize().height;
					if (Ext.isDefined(this.maxHeight) && h>this.maxHeight) {
						this.setHeight(this.maxHeight);
					}
				}
			}
        });
	    me.callParent(arguments);
	}
	,
	listeners: {
		beforeexpand: function ( panel, animate, eOpts ) {
			var gridTrace = this.getChildByElement('editorjavaGridTrace');
			gridTrace.store.removeAll();
		}
	}
	,
	log: function (from, type, message) {

		if (this.collapsed)
			this.expand(true);

    	var gridTrace = this.getChildByElement('editorjavaGridTrace');
    	gridTrace.store.insert(0, {'image':type, 'text':message});
    	gridTrace.getSelectionModel().select(0);
    	gridTrace.doLayout();
    	this.doLayout();

    	message = from + ' ' + message;
    	if (type == 'failure')
    		console.error(message);
    	else
    		console.info(message);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.panel.PanelSouth');});
