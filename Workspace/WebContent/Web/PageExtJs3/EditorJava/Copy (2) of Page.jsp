<%@ taglib uri="Framework_Taglib_Html.tld" prefix="html" %>
<%@ taglib uri="Framework_Taglib_File.tld" prefix="file" %>
<%@ taglib uri="Framework_Taglib_Logic.tld" prefix="logic" %>
<%@ taglib uri="Framework_Taglib_Eval.tld" prefix="eval" %>
<%@ taglib uri="Framework_Taglib_Request.tld" prefix="request" %>
<%@ taglib uri="Workspace_Taglib_Versionning.tld" prefix="versionning" %>

<html>
<head>
  <title>Complex Layout</title>
    <link rel="stylesheet" type="text/css" href="/WorkSpace/jsFramework/ext-3.4.0/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="/WorkSpace/jsFramework/ext-3.4.0/resources/css/xtheme-gray.css" />
    
    <style type="text/css">
    html, body {
        font:normal 12px verdana;
        margin:0;
        padding:0;
        border:0 none;
        overflow:hidden;
        height:100%;
    }
    p {
        margin:5px;
    }
    .proj {
        background-image:url(/WorkSpace/jsFramework/ext-3.4.0/examples/shared/icons/fam/cog.png);
    }
    .dir {
        background-image:url(/WorkSpace/jsFramework/ext-3.4.0/examples/shared/icons/fam/folder_go.png);
    }
    .file {
        background-image:url(/WorkSpace/jsFramework/ext-3.4.0/examples/shared/icons/fam/book.png);
    }
    </style>

    <!-- GC -->
    <!-- LIBS -->
    <script type="text/javascript" src="/WorkSpace/jsFramework/ext-3.4.0/adapter/ext/ext-base.js"></script>
    <!-- ENDLIBS -->

    <script type="text/javascript" src="/WorkSpace/jsFramework/ext-3.4.0/ext-all.js"></script>

    <script type="text/javascript"><!--
    Ext.BLANK_IMAGE_URL = '/WorkSpace/jsFramework/ext-3.4.0/resources/images/default/s.gif';

    Ext.onReady(function(){
        Ext.QuickTips.init();

        // NOTE: This is an example showing simple state management. During development,
        // it is generally best to disable state management as dynamically-generated ids
        // can change across page loads, leading to unpredictable results.  The developer
        // should ensure that stable state ids are set for stateful components in real apps.
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        
		/*  Add the tree object. At this stage it isnt attached to the layout - it is just a stand alone object
		This section was added to the example
		*/
	    // shorthand reference to (slightly) reduce complexity later
	    var Tree = Ext.tree;

	    var treeLoader = new Ext.tree.TreeLoader({
			url: '/WorkSpace/action.servlet?event=JsonTreeDirectory',
			requestMethod: 'GET',
			preloadChildren: true,
			clearOnLoad: true
		});

	    var root = {
		        nodeType: 'async',
		        text: 'Directoryroot',
		        draggable: false,
				expanded:true,
		        id: 'root'
		    };

	    var tree = new Ext.tree.TreePanel({
		    id:'treeDirectory',
			title:'Directorytitle',
		    //renderTo: 'west-tree',
		    useArrows: true,
		    autoScroll: true,
		    animate: true,
		    enableDD: true,
		    containerScroll: true,
		    border: false,
            collapsible: true,
            rootVisible: false,
	    	loader: treeLoader,
		    root: root
		});

	    treeLoader.on("beforeload", function(treeLoader, node) {
	    	if (node.attributes.id!='root') {
	    		treeLoader.baseParams.path = node.attributes.id;
	    	}
	    }, this);

	    // Add a listener to the tree to do something when a node is clicked. 	
		tree.addListener('click', function (node, event){
			alert(node.attributes.id+'='+node.attributes.text);
		});
	
		// Add a listener to take some action when a node is moved. 
		tree.addListener('movenode', function (tree, node, oldParent, newParent, index){
			 alert('moved. Old parent node id='+ oldParent.id+'. new parent node id='+newParent.id);
		});
		/* End of tree definition */	

		var viewport = new Ext.Viewport({
            layout: 'border',
            items: [
            // create instance immediately
            new Ext.BoxComponent({
                region: 'north',
                height: 32, // give north and south regions a height
                autoEl: {
                    tag: 'div',
                    html:'<p>north - generally for menus, toolbars and/or advertisements</p>'
                }
            }), {
                // lazily created panel (xtype:'panel' is default)
                region: 'south',
                contentEl: 'south',
                split: true,
                height: 100,
                minSize: 100,
                maxSize: 200,
                collapsible: true,
                title: 'South',
                margins: '0 0 0 0'
            }, {
                region: 'east',
                id: 'east-panel',
                title: 'East Side',
                collapsible: true,
                split: true,
                width: 225, // give east and west regions a width
                minSize: 175,
                maxSize: 400,
                margins: '0 5 0 0',
                layout: 'fit', // specify layout manager for items
                items:            // this TabPanel is wrapped by another Panel so the title will be applied
                new Ext.TabPanel({
                    border: false, // already wrapped so don't add another border
                    activeTab: 1, // second tab initially active
                    tabPosition: 'bottom',
                    items: [{
                        html: '<p>A TabPanel component can be a region.</p>',
                        title: 'A Tab',
                        autoScroll: true
                    }, new Ext.grid.PropertyGrid({
                        title: 'Property Grid',
                        closable: true,
                        source: {
                            "(name)": "Properties Grid",
                            "grouping": false,
                            "autoFitColumns": true,
                            "productionQuality": false,
                            "created": new Date(Date.parse('10/15/2006')),
                            "tested": false,
                            "version": 0.01,
                            "borderWidth": 1
                        }
                    })]
                })
            }, {
                region: 'west',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'West',
                split: true,
                width: 200,
                minSize: 175,
                maxSize: 400,
                collapsible: true,
                margins: '0 0 0 5',
                layout: {
                	type: 'VBox',
                    //type: 'accordion',
                    animate: true
                },
                items: [{
	                    contentEl: 'west-project',
	                    title: 'Project',
	                    border: false,
	                    iconCls: 'proj',
	                    collapsible: true// see the HEAD section for style used
	                },
                	tree
                ]
            },
            // in this instance the TabPanel is not wrapped by another panel
            // since no title is needed, this Panel is added directly
            // as a Container
            new Ext.TabPanel({
                region: 'center', // a center region is ALWAYS required for border layout
                deferredRender: false,
                activeTab: 0,     // first tab initially active
                items: [{
                    contentEl: 'center1',
                    title: 'Close Me',
                    closable: true,
                    autoScroll: true
                }, {
                    contentEl: 'center2',
                    title: 'Center Panel',
                    autoScroll: true
                }]
            })]
        });
        // get a reference to the HTML element with id "hideit-east" and add a click listener to it 
        Ext.get("hideit-east").on('click', function(){
            // get a reference to the Panel that was created with id = 'west-panel' 
            var w = Ext.getCmp('east-panel');
            // expand or collapse that Panel based on its collapsed property state
            w.collapsed ? w.expand() : w.collapse();
        });
        // get a reference to the HTML element with id "hideit-west" and add a click listener to it 
        Ext.get("hideit-west").on('click', function(){
            // get a reference to the Panel that was created with id = 'west-panel' 
            var w = Ext.getCmp('west-panel');
            // expand or collapse that Panel based on its collapsed property state
            w.collapsed ? w.expand() : w.collapse();
        });

        Ext.getCmp('east-panel').collapse();
    });

    </script>

</head>
<body>
    <!-- use class="x-hide-display" to prevent a brief flicker of the content -->
    <div id="west-project" class="x-hide-display">
        <jsp:include page="/Web/ComponentExtJs/ToolBar/ToolBarProject.jsp" flush="true">
            <jsp:param name="eventDst" value="EditorJavaPage"/>
            <jsp:param name="formName" value="GoEditorJava"/>
            <jsp:param name="formNameToSubmit" value="GoEditorJava"/>
        </jsp:include>
    </div>
	<div id="west-tree"></div>
    <div id="center2" class="x-hide-display">
        <a id="hideit-east" href="#">Toggle the east region</a>
        <a id="hideit-west" href="#">Toggle the west region</a>
        <p>My closable attribute is set to false so you can't close me. The other center panels can be closed.</p>
        <p>The center panel automatically grows to fit the remaining space in the container that isn't taken up by the border regions.</p>
        <hr>
        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Sed metus nibh, sodales a, porta at, vulputate eget, dui. Pellentesque ut nisl. Maecenas tortor turpis, interdum non, sodales non, iaculis ac, lacus. Vestibulum auctor, tortor quis iaculis malesuada, libero lectus bibendum purus, sit amet tincidunt quam turpis vel lacus. In pellentesque nisl non sem. Suspendisse nunc sem, pretium eget, cursus a, fringilla vel, urna. Aliquam commodo ullamcorper erat. Nullam vel justo in neque porttitor laoreet. Aenean lacus dui, consequat eu, adipiscing eget, nonummy non, nisi. Morbi nunc est, dignissim non, ornare sed, luctus eu, massa. Vivamus eget quam. Vivamus tincidunt diam nec urna. Curabitur velit. Quisque dolor magna, ornare sed, elementum porta, luctus in, leo.</p>
        <p>Donec quis dui. Sed imperdiet. Nunc consequat, est eu sollicitudin gravida, mauris ligula lacinia mauris, eu porta dui nisl in velit. Nam congue, odio id auctor nonummy, augue lectus euismod nunc, in tristique turpis dolor sed urna. Donec sit amet quam eget diam fermentum pharetra. Integer tincidunt arcu ut purus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit malesuada odio. Nam augue. Aenean molestie sapien in mi. Suspendisse tincidunt. Pellentesque tempus dui vitae sapien. Donec aliquam ipsum sit amet pede. Sed scelerisque mi a erat. Curabitur rutrum ullamcorper risus. Maecenas et lorem ut felis dictum viverra. Fusce sem. Donec pharetra nibh sit amet sapien.</p>
        <p>Aenean ut orci sed ligula consectetuer pretium. Aliquam odio. Nam pellentesque enim. Nam tincidunt condimentum nisi. Maecenas convallis luctus ligula. Donec accumsan ornare risus. Vestibulum id magna a nunc posuere laoreet. Integer iaculis leo vitae nibh. Nam vulputate, mauris vitae luctus pharetra, pede neque bibendum tellus, facilisis commodo diam nisi eget lacus. Duis consectetuer pulvinar nisi. Cras interdum ultricies sem. Nullam tristique. Suspendisse elementum purus eu nisl. Nulla facilisi. Phasellus ultricies ullamcorper lorem. Sed euismod ante vitae lacus. Nam nunc leo, congue vehicula, luctus ac, tempus non, ante. Morbi suscipit purus a nulla. Sed eu diam.</p>
        <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Cras imperdiet felis id velit. Ut non quam at sem dictum ullamcorper. Vestibulum pharetra purus sed pede. Aliquam ultrices, nunc in varius mattis, felis justo pretium magna, eget laoreet justo eros id eros. Aliquam elementum diam fringilla nulla. Praesent laoreet sapien vel metus. Cras tempus, sapien condimentum dictum dapibus, lorem augue fringilla orci, ut tincidunt eros nisi eget turpis. Nullam nunc nunc, eleifend et, dictum et, pharetra a, neque. Ut feugiat. Aliquam erat volutpat. Donec pretium odio nec felis. Phasellus sagittis lacus eget sapien. Donec est. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae;</p>
        <p>Vestibulum semper. Nullam non odio. Aliquam quam. Mauris eu lectus non nunc auctor ullamcorper. Sed tincidunt molestie enim. Phasellus lobortis justo sit amet quam. Duis nulla erat, varius a, cursus in, tempor sollicitudin, mauris. Aliquam mi velit, consectetuer mattis, consequat tristique, pulvinar ac, nisl. Aliquam mattis vehicula elit. Proin quis leo sed tellus scelerisque molestie. Quisque luctus. Integer mattis. Donec id augue sed leo aliquam egestas. Quisque in sem. Donec dictum enim in dolor. Praesent non erat. Nulla ultrices vestibulum quam.</p>
        <p>Duis hendrerit, est vel lobortis sagittis, tortor erat scelerisque tortor, sed pellentesque sem enim id metus. Maecenas at pede. Nulla velit libero, dictum at, mattis quis, sagittis vel, ante. Phasellus faucibus rutrum dui. Cras mauris elit, bibendum at, feugiat non, porta id, neque. Nulla et felis nec odio mollis vehicula. Donec elementum tincidunt mauris. Duis vel dui. Fusce iaculis enim ac nulla. In risus.</p>
        <p>Donec gravida. Donec et enim. Morbi sollicitudin, lacus a facilisis pulvinar, odio turpis dapibus elit, in tincidunt turpis felis nec libero. Nam vestibulum tempus ipsum. In hac habitasse platea dictumst. Nulla facilisi. Donec semper ligula. Donec commodo tortor in quam. Etiam massa. Ut tempus ligula eget tellus. Curabitur id velit ut velit varius commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Fusce ornare pellentesque libero. Nunc rhoncus. Suspendisse potenti. Ut consequat, leo eu accumsan vehicula, justo sem lobortis elit, ac sollicitudin ipsum neque nec ante.</p>
        <p>Aliquam elementum mauris id sem. Vivamus varius, est ut nonummy consectetuer, nulla quam bibendum velit, ac gravida nisi felis sit amet urna. Aliquam nec risus. Maecenas lacinia purus ut velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sit amet dui vitae lacus fermentum sodales. Donec varius dapibus nisl. Praesent at velit id risus convallis bibendum. Aliquam felis nibh, rutrum nec, blandit non, mattis sit amet, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam varius dignissim nibh. Quisque id orci ac ante hendrerit molestie. Aliquam malesuada enim non neque.</p>
    </div>
    <div id="center1" class="x-hide-display">
        <p><b>Done reading me? Close me by clicking the X in the top right corner.</b></p>
        <p>Vestibulum semper. Nullam non odio. Aliquam quam. Mauris eu lectus non nunc auctor ullamcorper. Sed tincidunt molestie enim. Phasellus lobortis justo sit amet quam. Duis nulla erat, varius a, cursus in, tempor sollicitudin, mauris. Aliquam mi velit, consectetuer mattis, consequat tristique, pulvinar ac, nisl. Aliquam mattis vehicula elit. Proin quis leo sed tellus scelerisque molestie. Quisque luctus. Integer mattis. Donec id augue sed leo aliquam egestas. Quisque in sem. Donec dictum enim in dolor. Praesent non erat. Nulla ultrices vestibulum quam.</p>
        <p>Duis hendrerit, est vel lobortis sagittis, tortor erat scelerisque tortor, sed pellentesque sem enim id metus. Maecenas at pede. Nulla velit libero, dictum at, mattis quis, sagittis vel, ante. Phasellus faucibus rutrum dui. Cras mauris elit, bibendum at, feugiat non, porta id, neque. Nulla et felis nec odio mollis vehicula. Donec elementum tincidunt mauris. Duis vel dui. Fusce iaculis enim ac nulla. In risus.</p>
        <p>Donec gravida. Donec et enim. Morbi sollicitudin, lacus a facilisis pulvinar, odio turpis dapibus elit, in tincidunt turpis felis nec libero. Nam vestibulum tempus ipsum. In hac habitasse platea dictumst. Nulla facilisi. Donec semper ligula. Donec commodo tortor in quam. Etiam massa. Ut tempus ligula eget tellus. Curabitur id velit ut velit varius commodo. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla facilisi. Fusce ornare pellentesque libero. Nunc rhoncus. Suspendisse potenti. Ut consequat, leo eu accumsan vehicula, justo sem lobortis elit, ac sollicitudin ipsum neque nec ante.</p>
        <p>Aliquam elementum mauris id sem. Vivamus varius, est ut nonummy consectetuer, nulla quam bibendum velit, ac gravida nisi felis sit amet urna. Aliquam nec risus. Maecenas lacinia purus ut velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Suspendisse sit amet dui vitae lacus fermentum sodales. Donec varius dapibus nisl. Praesent at velit id risus convallis bibendum. Aliquam felis nibh, rutrum nec, blandit non, mattis sit amet, magna. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam varius dignissim nibh. Quisque id orci ac ante hendrerit molestie. Aliquam malesuada enim non neque.</p>
    </div>
    <div id="props-panel" class="x-hide-display" style="width:200px;height:200px;overflow:hidden;">
    </div>
    <div id="south" class="x-hide-display">
        <p>south - generally for informational stuff, also could be for status bar</p>
    </div>
</body>
</html>