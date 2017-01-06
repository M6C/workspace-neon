Ext.define('Workspace.editorjava.aceeditor.command.CommandOptimizeImport',  {

	statics: {
	    addCommand: function(editor) {
			var me = this;
		    editor.commands.addCommand({
		        name: "editorOptimizeImport",
		        bindKey: {win: "Ctrl-Shift-O", mac: "Command-Option-O"},
		        exec: me.optimizeImport
		    });
	    }
	    ,
	    optimizeImport: function(editor) {
			var me = this;
			var application = Ext.getCmp('project').value;

			var filename = editor.panelId.toLowerCase();
            if (!filename.endsWith('.java')) {
			    console.info('Workspace.editorjava.aceeditor.command.CommandOptimizeImport no java file');
                return;
            }

            //https://ace.c9.io/tool/mode_creator.html
            //http://docs.oracle.com/javase/tutorial/java/nutsandbolts/_keywords.html
            var keywords = (
                "abstract|continue|for|new|switch|" +
                "assert|default|goto|package|synchronized|" +
                "boolean|do|if|private|this|" +
                "break|double|implements|protected|throw|" +
                "byte|else|import|public|throws|" +
                "case|enum|instanceof|return|transient|" +
                "catch|extends|int|short|try|" +
                "char|final|interface|static|void|" +
                "class|finally|long|strictfp|volatile|" +
                "const|float|native|super|while"
            );
            var langClasses = (
                "AbstractMethodError|AssertionError|ClassCircularityError|"+
                "ClassFormatError|Deprecated|EnumConstantNotPresentException|"+
                "ExceptionInInitializerError|IllegalAccessError|"+
                "IllegalThreadStateException|InstantiationError|InternalError|"+
                "NegativeArraySizeException|NoSuchFieldError|Override|Process|"+
                "ProcessBuilder|SecurityManager|StringIndexOutOfBoundsException|"+
                "SuppressWarnings|TypeNotPresentException|UnknownError|"+
                "UnsatisfiedLinkError|UnsupportedClassVersionError|VerifyError|"+
                "InstantiationException|IndexOutOfBoundsException|"+
                "ArrayIndexOutOfBoundsException|CloneNotSupportedException|"+
                "NoSuchFieldException|IllegalArgumentException|NumberFormatException|"+
                "SecurityException|Void|InheritableThreadLocal|IllegalStateException|"+
                "InterruptedException|NoSuchMethodException|IllegalAccessException|"+
                "UnsupportedOperationException|Enum|StrictMath|Package|Compiler|"+
                "Readable|Runtime|StringBuilder|Math|IncompatibleClassChangeError|"+
                "NoSuchMethodError|ThreadLocal|RuntimePermission|ArithmeticException|"+
                "NullPointerException|Long|Integer|Short|Byte|Double|Number|Float|"+
                "Character|Boolean|StackTraceElement|Appendable|StringBuffer|"+
                "Iterable|ThreadGroup|Runnable|Thread|IllegalMonitorStateException|"+
                "StackOverflowError|OutOfMemoryError|VirtualMachineError|"+
                "ArrayStoreException|ClassCastException|LinkageError|"+
                "NoClassDefFoundError|ClassNotFoundException|RuntimeException|"+
                "Exception|ThreadDeath|Error|Throwable|System|ClassLoader|"+
                "Cloneable|Class|CharSequence|Comparable|String|Object"
            );

            //https://regex101.com/r/gN4sS0/2
            // var regex ="/([;{}]+)(\s+)(\w+)([\s|\W])/ig";

            //https://ace.c9.io/#nav=api&api=editor
            //var regex ="([;{}]+)(\\s+)(\\w+)([\\s|\\W])";
            //var cnt = editor.findAll(regex, {regExp:true, wholeWord:false});

			//http://docs.sencha.com/extjs/4.0.7/#!/api/RegExp
			var value=editor.getValue();
            var reg = /([;{}]+)(\s+)(\w+)([\s|\W])/ig;
            var result;
            var cnt = 0;
            var find = "";
            while ((result = reg.exec(value)) != null) {
                var str = result[3];
                if ((find.indexOf(str + "|") <0) && (keywords.indexOf(str.toLowerCase() + "|") <0) && (langClasses.indexOf(str + "|") <0)) {
                    find += str + "|";
                    cnt++;
                }
                // var msg = "Found " + result[0] + ".  ";
                // msg += "Next match starts at " + reg.lastIndex;
                // print(msg);
            }
			Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport findAll cnt:" + cnt + "<br>find:" + find);

// 			Ext.Ajax.request({
// 				method:'GET',
// 				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonOptimizeImport',
// 				callback:function(options, success, responseCompile) {
// 				    // var jsonData = Ext.JSON.decode(responseCompile.responseText);
// 					Workspace.common.tool.Pop.info(me, "Optimize Import complete.");
// 				},
// 				params:{application:application}
// 			});
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandOptimizeImport');});