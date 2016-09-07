function showClasspathDetail() {
	Ext.create('Workspace.editorjava.window.WindowClasspath').show();
}

function showPackageJar() {
	// Explicit load required library (Mandatory for extending this class)
	Ext.Loader.syncRequire('Workspace.editorjava.window.package.function.OnSubmit');

	Ext.create('Workspace.editorjava.window.WindowPackage').show(
		{
			formId:'package_content_jar',
		    comboId:'package_combo_jar',
		    statusbarId:'package_statusbar_jar',
			type:'Jar',
			submitText:'Create Jar',
			callBackSubmit:Workspace.editorjava.window.package.function.OnSubmitJar.call()
		}
	);
}


function showPackageWar() {
	// Explicit load required library (Mandatory for extending this class)
	Ext.Loader.syncRequire('Workspace.editorjava.window.package.function.OnSubmit');

	Ext.create('Workspace.editorjava.window.WindowPackage').show(
		{
			formId:'package_content_war',
		    comboId:'package_combo_war',
		    statusbarId:'package_statusbar_war',
			type:'War',
			submitText:'Create War',
			callBackSubmit:Workspace.editorjava.window.package.function.OnSubmitJar.call()
		}
	);
}