Ext.define('Workspace.editorjava.form.combobox.ComboProject', {

	extend: 'Workspace.common.form.combobox.ComboProjectExtjs4'
	,
	alias: 'widget.editorjavaComboProject',
	alternateClassName: 'WorkspaceEditorJavaComboProject'
	,
    initComponent : function(){
		var me = this;

		Ext.apply(me, {
			listeners: {
				//scope: this, //yourScope
				'select': function (cmb, record, index){
					var application = record[0].data.project;
					console.info('Workspace.editorjava.form.combobox.ComboProject select:'+application);

					Ext.getCmp('project').value=application;

					var tree = Ext.getCmp("treeDirectory");
					tree.getStore().getProxy().extraParams.path = '';
					tree.getStore().getProxy().extraParams.application = application;//Ext.getCmp('project').value;//record.data.project;
					tree.getStore().load(
						new Ext.data.Operation({
							action:'read',
							callback: function() {
//							    me.manageTab(application);
							}
						})
					);
				}
			}
		});
		me.callParent(arguments);
	}
	,
	manageTab: function(key) {
		var me = this;
		var regex = '^\\[' + key + '\\]';
		var tabPanel=Ext.getCmp('mainCenterPanel');
		var tabs = tabPanel.items;

		var listShow = me.listTabHide.filterBy(function(tab) {
			var id = tab.id;
			return (id.search('^\\[' + key + '\\]') == 0);
		});

		var listHide = tabs.filterBy(function(tab) {
			var id = tab.id;
			return !(id.search('^\\[' + key + '\\]') == 0);
		});

		var tabShow = null;
		listShow.each(function(tab) {
//			tabPanel.add(tab);

			tabPanel.setActiveTab(tab);
			tabShow = tab;

			tab.tab.show();
//			tab.expand(true);

//			tab.ownerCt.setVisible(true);

			me.listTabHide.remove(tab);
		});

		var tabHide = null;
		listHide.each(function(tab) {
//			tabPanel.remove(tab, true);

			tabHide = tab;
			tab.tab.hide();
//			tab.collapse();

//			tab.ownerCt.setVisible(false);

			me.listTabHide.add(tab);
		});

		if (tabShow != null) {
			tabShow.expand();
		} else if (tabHide != null) {
			tabHide.collapse();
		}
	}
	,
	listTabHide: new Ext.util.MixedCollection()
	,
	manageTab2: function(key) {
		var me = this;
		var nbActive = 0;
		var tabPanel=Ext.getCmp('mainCenterPanel');
		var tabs = tabPanel.items;
		var tabActive = null;
		var check = false;
		tabs.each(function(tab) {
			var id = tab.id;
			var find = id.search('^\\[' + key + '\\]') == 0;

			if (find) {
				if (nbActive == 0) {
					tabPanel.setActiveTab(tab);
					tabActive = tab;
					nbActive++;
					check = true;
				}
			}
			tabActive = (tabActive == null) ? tab : tabActive;

			// Hide/Show Tab Header
		    tab.tab.setVisible(find);
		});

		if (tabActive != null) {
			me.manageVisibilityTab(tabActive, check);
			me.manageVisibilityTabToolBar(tabActive, check);
		}
		else if (nbActive == 0 && tabs.getCount() >= 0) {
			var tab = tabs.getAt(0);
			me.manageVisibilityTabToolBar(tab, false);
		}
	}
	,
	manageVisibilityTab: function (tab, check) {
//		// Hide/Show Tab Header
//	    tab.tab.setVisible(check);

	    // Hide/Show Content
		if (Ext.isDefined(tab.items)) {
		    tab.items.each(function(item) {
			    item.setVisible(check);
		    });
		}

//	    // Hide/Show ToolBar
//		manageVisibilityTabToolBar(tab, check);
	}
	,
    // Hide/Show Tab ToolBar
	manageVisibilityTabToolBar(tab, check) {
		if (Ext.isDefined(tab.dockedItems)) {
		    tab.dockedItems.each(function(item) {
//		    	item.ownerCt.setVisible(check);
		    	if (item.container.id = tab.id) {
		    		item.setVisible(check);
		    	}
		    });
		}
	}
	,
	copyTab: function(tabPanel, tab) {
    	var serial = '{' + 
			'title:\'' + tab.title + '\', ' +
			'id:\'' + tab.id + '\', ' +
			'panelEditorId:\'' + tab.panelEditorId + ', ' +
			'panelId:\'' + tab.panelEditorId + '\', ' +
			'autoDeploy:' + tab.autoDeploy + 
		'}';
		var tabId = tab.id + '_Tab';
		tabPanel.add({
			xtype:'tab',
	        title: tab.title,
	        html: serial,
	        itemId: tabId
	    });
		var tabSerial = tabPanel.getComponent(tabId);
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.form.combobox.ComboProject');});