// DEPENDENCE
Ext.Loader.load(fileList=[
'/WorkSpace/js/commonextjs/view/ViewPort.js',
'/WorkSpace/js/commonextjs/plugin/AddTabPanel.js',
'/WorkSpace/js/commonextjs/tree/TreeDirectory.js',
'/WorkSpace/js/commonextjs/form/textarea/HtmlEditor.js',
'/WorkSpace/js/commonextjs/form/combobox/Combo.js',
'/WorkSpace/js/commonextjs/form/combobox/ComboProject.js',
'/WorkSpace/js/commonextjs/form/combobox/ComboPackage.js',
'/WorkSpace/js/commonextjs/form/textfield/TextFieldFileChose.js',
'/WorkSpace/js/commonextjs/window/WndWaiting.js',
'/WorkSpace/js/pageextjs/editorjava/form/combobox/ComboProject.js',
'/WorkSpace/js/pageextjs/editorjava/menu/MenuAction.js',
'/WorkSpace/js/pageextjs/editorjava/menu/MenuTreeAction.js',
'/WorkSpace/js/pageextjs/editorjava/menu/MenuCVSAction.js',
'/WorkSpace/js/pageextjs/editorjava/menu/MenuSVNAction.js',
'/WorkSpace/js/pageextjs/editorjava/tree/TreeMenuContext.js',
'/WorkSpace/js/pageextjs/editorjava/tree/TreePackageDetail.js',
'/WorkSpace/js/pageextjs/editorjava/tree/TreeDirectory.js',
'/WorkSpace/js/pageextjs/editorjava/window/ToolXmlXsl.js',
'/WorkSpace/js/pageextjs/editorjava/window/ClasspathDetail.js',
'/WorkSpace/js/pageextjs/editorjava/window/Completion.js',
'/WorkSpace/js/pageextjs/editorjava/window/Package.js',
'/WorkSpace/js/pageextjs/editorjava/window/package/window/WndPackage.js',
'/WorkSpace/js/pageextjs/editorjava/window/ToolUpload.js',
'/WorkSpace/js/pageextjs/editorjava/Colorize.js',
'/WorkSpace/js/pageextjs/editorjava/view/ViewMain.js'
],
preserveOrder=true);

function init_page() {
	Ext.QuickTips.init();

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
    Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

    var viewport = new Workspace.editorjava.ViewMain({
    	renderTo: Ext.getBody()
    });

	/*
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
    */
}
