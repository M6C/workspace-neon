Ext.define('Workspace.editorjava.window.completion.tree.TreeCompletion', {
	// REQUIRED

	extend: 'Ext.tree.Panel'
	,
	alias: 'widget.editorjavaTreeCompletion',
	alternateClassName: 'WorkspaceEditorJavaTreeCompletion'
	,
//  id:treeId,
	//title:'Directorytitle',
    //renderTo: 'west-tree',
    useArrows: true,
    layout:'fit',
	autoScroll: true,
    animate: true,
    enableDD: true,
    containerScroll: true,
    border: false,
    collapsible: false,
    rootVisible: false
    ,
    dataInitialized: false,
    dataInitializedCount: 0
    ,
    constructor: function(config) {
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion constructor');
	    var me = this;
		var application = Ext.getCmp('project').value;
		Ext.create('Workspace.editorjava.request.JsonEditSaveAndCompletion',
		{
			params:{filename:config.filename,content:config.txt,caretPos:config.pos},
			application:application,
			callbackCompletion: function(opts, success, response) {
				me.data = response.responseText;
				me.dataInitialized = true;
				console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion constructor callbackCompletion data:' + me.data);
			}
		}).request();
	    me.callParent();
    }
	,
    initComponent : function() {
	    var me = this;
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initComponent dataInitialized:' + me.dataInitialized + ' count:' + me.dataInitializedCount);
		me.initView(this);
    	me.callParent(arguments);
    }
	,
	store: Ext.create('Workspace.editorjava.window.completion.tree.data.StoreCompletionMemory',
			{id: 'storeCompletionMemory'}
		)
	    ,
	    listeners : {
			'add' : function ( container, component, index, eOpts ) {
				console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion add');
				component.on('itemkeydown', function(view, record, item, index, e, eOpts) {
					var key = e.keyCode;
					if (key==Ext.EventObject.ENTER) {// code:13
						console.info('Workspace.editorjava.window.completion.tree.TreeCompletion Ext.KeyMap ENTER');
						this.panel.onSubmitTree(this, e);
					}
				});
				component.on('itemdblclick', function(view, record, item, index, e, eOpts) {
					console.info('Workspace.editorjava.window.completion.tree.TreeCompletion containerdblclick');
					this.panel.onSubmitTree(this, e);
				});
			}
			,
			'load' : function(store, records, successful, operation, eOpts) {
				console.info('<-666->Workspace.editorjava.window.completion.tree.TreeCompletion load successful:'+successful);
				if (successful) {
//					var view = this.getView();
//					view.panel.getRootNode().expand(true, function(n) {
//						view.select(n[0].firstChild);
//					});
//					view.focus();
				}
			}
			,
			'render' : function(component, eOpts) {
				console.info('Workspace.editorjava.window.completion.tree.TreeCompletion render');
				component.getView().focus();
			}
		}
	,
	initView : function(me) {
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView dataInitialized:' + me.dataInitialized + ' count:' + me.dataInitializedCount);
		if ((me.dataInitialized == undefined || me.dataInitialized == false) && (me.dataInitializedCount == undefined || me.dataInitializedCount != 10)) {
			console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView 1');
			if (me.dataInitializedCount == undefined) {
				console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView dataInitializedCount:' + me.dataInitializedCount);
				me.dataInitializedCount = 0;
			} else {
				console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView dataInitializedCount:' + me.dataInitializedCount + ' > 0');
				me.dataInitializedCount++;
			}
			console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView setTimeOut');
			setTimeout(function () {me.initView(me)}, 500);
			return;
		}
		console.info('<-666->Workspace.editorjava.windows.tree.TreeCompletion initView 2');// data:' + me.data);
//		me.store.load(me.data);
//		me.store.load({data:me.data});
//		me.store.load({data:Ext.JSON.decode(me.data)});
//		me.store.load(Ext.JSON.decode(me.data));
//
//		Ext.apply(me.store, {
//		    data: me.data
//		});
//		me.store.setRootNode(Ext.JSON.decode(me.data));
		var vdata = 
//		{
//				data:
//				[
//				      {'id':'root0','text':'java.lang.String','className':'java.lang.String','expanded':true,draggable:false,animate:false,'caretPosition':'909',
//				    	  children:[
//				    	      {'text':'equals(java.lang.Object)','name':'equals','prototype':'equals(java.lang.Object)','id':'0','leaf':true}
//				    	      ,
//				    	      {'text':'toString()','name':'toString','prototype':'toString()','id':'1','leaf':true}
//				    	      ,
//				    	      {'text':'hashCode()','name':'hashCode','prototype':'hashCode()','id':'2','leaf':true},
//				    	      {'text':'compareTo(java.lang.String)','name':'compareTo','prototype':'compareTo(java.lang.String)','id':'3','leaf':true},
//				    	      {'text':'compareTo(java.lang.Object)','name':'compareTo','prototype':'compareTo(java.lang.Object)','id':'4','leaf':true},
//				    	      {'text':'indexOf(java.lang.String, int)','name':'indexOf','prototype':'indexOf(java.lang.String, int)','id':'5','leaf':true},
//				    	      {'text':'indexOf(java.lang.String)','name':'indexOf','prototype':'indexOf(java.lang.String)','id':'6','leaf':true},
//				    	      {'text':'indexOf(int, int)','name':'indexOf','prototype':'indexOf(int, int)','id':'7','leaf':true},
//				    	      {'text':'indexOf(int)','name':'indexOf','prototype':'indexOf(int)','id':'8','leaf':true},
//				    	      {'text':'indexOf([C, int, int, [C, int, int, int)','name':'indexOf','prototype':'indexOf([C, int, int, [C, int, int, int)','id':'9','leaf':true},
//				    	      {'text':'indexOf([C, int, int, java.lang.String, int)','name':'indexOf','prototype':'indexOf([C, int, int, java.lang.String, int)','id':'10','leaf':true},
//				    	      {'text':'valueOf(int)','name':'valueOf','prototype':'valueOf(int)','id':'11','leaf':true},
//				    	      {'text':'valueOf(long)','name':'valueOf','prototype':'valueOf(long)','id':'12','leaf':true},
//				    	      {'text':'valueOf(float)','name':'valueOf','prototype':'valueOf(float)','id':'13','leaf':true},
//				    	      {'text':'valueOf(boolean)','name':'valueOf','prototype':'valueOf(boolean)','id':'14','leaf':true},
//				    	      {'text':'valueOf([C)','name':'valueOf','prototype':'valueOf([C)','id':'15','leaf':true},
//				    	      {'text':'valueOf([C, int, int)','name':'valueOf','prototype':'valueOf([C, int, int)','id':'16','leaf':true},
//				    	      {'text':'valueOf(java.lang.Object)','name':'valueOf','prototype':'valueOf(java.lang.Object)','id':'17','leaf':true},
//				    	      {'text':'valueOf(char)','name':'valueOf','prototype':'valueOf(char)','id':'18','leaf':true},
//				    	      {'text':'valueOf(double)','name':'valueOf','prototype':'valueOf(double)','id':'19','leaf':true},
//				    	      {'text':'charAt(int)','name':'charAt','prototype':'charAt(int)','id':'20','leaf':true},
//				    	      {'text':'checkBounds([B, int, int)','name':'checkBounds','prototype':'checkBounds([B, int, int)','id':'21','leaf':true},
//				    	      {'text':'codePointAt(int)','name':'codePointAt','prototype':'codePointAt(int)','id':'22','leaf':true},
//				    	      {'text':'codePointBefore(int)','name':'codePointBefore','prototype':'codePointBefore(int)','id':'23','leaf':true},
//				    	      {'text':'codePointCount(int, int)','name':'codePointCount','prototype':'codePointCount(int, int)','id':'24','leaf':true},
//				    	      {'text':'compareToIgnoreCase(java.lang.String)','name':'compareToIgnoreCase','prototype':'compareToIgnoreCase(java.lang.String)','id':'25','leaf':true},
//				    	      {'text':'concat(java.lang.String)','name':'concat','prototype':'concat(java.lang.String)','id':'26','leaf':true},
//				    	      {'text':'contains(java.lang.CharSequence)','name':'contains','prototype':'contains(java.lang.CharSequence)','id':'27','leaf':true},
//				    	      {'text':'contentEquals(java.lang.CharSequence)','name':'contentEquals','prototype':'contentEquals(java.lang.CharSequence)','id':'28','leaf':true},
//				    	      {'text':'contentEquals(java.lang.StringBuffer)','name':'contentEquals','prototype':'contentEquals(java.lang.StringBuffer)','id':'29','leaf':true},
//				    	      {'text':'copyValueOf([C)','name':'copyValueOf','prototype':'copyValueOf([C)','id':'30','leaf':true},
//				    	      {'text':'copyValueOf([C, int, int)','name':'copyValueOf','prototype':'copyValueOf([C, int, int)','id':'31','leaf':true},
//				    	      {'text':'endsWith(java.lang.String)','name':'endsWith','prototype':'endsWith(java.lang.String)','id':'32','leaf':true},
//				    	      {'text':'equalsIgnoreCase(java.lang.String)','name':'equalsIgnoreCase','prototype':'equalsIgnoreCase(java.lang.String)','id':'33','leaf':true},
//				    	      {'text':'format(java.util.Locale, java.lang.String, [Ljava.lang.Object;)','name':'format','prototype':'format(java.util.Locale, java.lang.String, [Ljava.lang.Object;)','id':'34','leaf':true},
//				    	      {'text':'format(java.lang.String, [Ljava.lang.Object;)','name':'format','prototype':'format(java.lang.String, [Ljava.lang.Object;)','id':'35','leaf':true},
//				    	      {'text':'getBytes(int, int, [B, int)','name':'getBytes','prototype':'getBytes(int, int, [B, int)','id':'36','leaf':true},
//				    	      {'text':'getBytes(java.nio.charset.Charset)','name':'getBytes','prototype':'getBytes(java.nio.charset.Charset)','id':'37','leaf':true},
//				    	      {'text':'getBytes(java.lang.String)','name':'getBytes','prototype':'getBytes(java.lang.String)','id':'38','leaf':true},
//				    	      {'text':'getBytes()','name':'getBytes','prototype':'getBytes()','id':'39','leaf':true},
//				    	      {'text':'getChars(int, int, [C, int)','name':'getChars','prototype':'getChars(int, int, [C, int)','id':'40','leaf':true},
//				    	      {'text':'getChars([C, int)','name':'getChars','prototype':'getChars([C, int)','id':'41','leaf':true},
//				    	      {'text':'indexOfSupplementary(int, int)','name':'indexOfSupplementary','prototype':'indexOfSupplementary(int, int)','id':'42','leaf':true},
//				    	      {'text':'intern()','name':'intern','prototype':'intern()','id':'43','leaf':true},
//				    	      {'text':'isEmpty()','name':'isEmpty','prototype':'isEmpty()','id':'44','leaf':true},
//				    	      {'text':'join(java.lang.CharSequence, [Ljava.lang.CharSequence;)','name':'join','prototype':'join(java.lang.CharSequence, [Ljava.lang.CharSequence;)','id':'45','leaf':true},
//				    	      {'text':'join(java.lang.CharSequence, java.lang.Iterable)','name':'join','prototype':'join(java.lang.CharSequence, java.lang.Iterable)','id':'46','leaf':true},
//				    	      {'text':'lastIndexOf(int)','name':'lastIndexOf','prototype':'lastIndexOf(int)','id':'47','leaf':true},
//				    	      {'text':'lastIndexOf(java.lang.String)','name':'lastIndexOf','prototype':'lastIndexOf(java.lang.String)','id':'48','leaf':true},
//				    	      {'text':'lastIndexOf([C, int, int, java.lang.String, int)','name':'lastIndexOf','prototype':'lastIndexOf([C, int, int, java.lang.String, int)','id':'49','leaf':true},
//				    	      {'text':'lastIndexOf(java.lang.String, int)','name':'lastIndexOf','prototype':'lastIndexOf(java.lang.String, int)','id':'50','leaf':true},
//				    	      {'text':'lastIndexOf(int, int)','name':'lastIndexOf','prototype':'lastIndexOf(int, int)','id':'51','leaf':true},
//				    	      {'text':'lastIndexOf([C, int, int, [C, int, int, int)','name':'lastIndexOf','prototype':'lastIndexOf([C, int, int, [C, int, int, int)','id':'52','leaf':true},
//				    	      {'text':'lastIndexOfSupplementary(int, int)','name':'lastIndexOfSupplementary','prototype':'lastIndexOfSupplementary(int, int)','id':'53','leaf':true},
//				    	      {'text':'length()','name':'length','prototype':'length()','id':'54','leaf':true},
//				    	      {'text':'matches(java.lang.String)','name':'matches','prototype':'matches(java.lang.String)','id':'55','leaf':true},
//				    	      {'text':'nonSyncContentEquals(java.lang.AbstractStringBuilder)','name':'nonSyncContentEquals','prototype':'nonSyncContentEquals(java.lang.AbstractStringBuilder)','id':'56','leaf':true},
//				    	      {'text':'offsetByCodePoints(int, int)','name':'offsetByCodePoints','prototype':'offsetByCodePoints(int, int)','id':'57','leaf':true},
//				    	      {'text':'regionMatches(int, java.lang.String, int, int)','name':'regionMatches','prototype':'regionMatches(int, java.lang.String, int, int)','id':'58','leaf':true},
//				    	      {'text':'regionMatches(boolean, int, java.lang.String, int, int)','name':'regionMatches','prototype':'regionMatches(boolean, int, java.lang.String, int, int)','id':'59','leaf':true},
//				    	      {'text':'replace(char, char)','name':'replace','prototype':'replace(char, char)','id':'60','leaf':true},
//				    	      {'text':'replace(java.lang.CharSequence, java.lang.CharSequence)','name':'replace','prototype':'replace(java.lang.CharSequence, java.lang.CharSequence)','id':'61','leaf':true},
//				    	      {'text':'replaceAll(java.lang.String, java.lang.String)','name':'replaceAll','prototype':'replaceAll(java.lang.String, java.lang.String)','id':'62','leaf':true},
//				    	      {'text':'replaceFirst(java.lang.String, java.lang.String)','name':'replaceFirst','prototype':'replaceFirst(java.lang.String, java.lang.String)','id':'63','leaf':true},
//				    	      {'text':'split(java.lang.String)','name':'split','prototype':'split(java.lang.String)','id':'64','leaf':true},
//				    	      {'text':'split(java.lang.String, int)','name':'split','prototype':'split(java.lang.String, int)','id':'65','leaf':true},
//				    	      {'text':'startsWith(java.lang.String, int)','name':'startsWith','prototype':'startsWith(java.lang.String, int)','id':'66','leaf':true},
//				    	      {'text':'startsWith(java.lang.String)','name':'startsWith','prototype':'startsWith(java.lang.String)','id':'67','leaf':true},
//				    	      {'text':'subSequence(int, int)','name':'subSequence','prototype':'subSequence(int, int)','id':'68','leaf':true},
//				    	      {'text':'substring(int)','name':'substring','prototype':'substring(int)','id':'69','leaf':true},
//				    	      {'text':'substring(int, int)','name':'substring','prototype':'substring(int, int)','id':'70','leaf':true},
//				    	      {'text':'toCharArray()','name':'toCharArray','prototype':'toCharArray()','id':'71','leaf':true},
//				    	      {'text':'toLowerCase(java.util.Locale)','name':'toLowerCase','prototype':'toLowerCase(java.util.Locale)','id':'72','leaf':true},
//				    	      {'text':'toLowerCase()','name':'toLowerCase','prototype':'toLowerCase()','id':'73','leaf':true},
//				    	      {'text':'toUpperCase()','name':'toUpperCase','prototype':'toUpperCase()','id':'74','leaf':true},
//				    	      {'text':'toUpperCase(java.util.Locale)','name':'toUpperCase','prototype':'toUpperCase(java.util.Locale)','id':'75','leaf':true},
//				    	      {'text':'trim()','name':'trim','prototype':'trim()','id':'76','leaf':true}
//				    	 ]
//				      }
//				]
					Ext.JSON.decode(me.data)
//			}
	;
//		me.store.setRootNode(me.data);
		me.store.proxy.data = vdata;
		me.store.load(
			new Ext.data.Operation({
				action:'read'
			})
		);
		me.render();
	}
	,
	enableKeyEvents:true
	,
    onSubmitTree: new function(tree, key, evt) {
    	console.info('Workspace.editorjava.window.completion.tree.TreeCompletion onSubmitTree!');
    }

}, function() {Workspace.tool.Log.defined('Workspace.editorjava.window.completion.tree.TreeCompletion');});