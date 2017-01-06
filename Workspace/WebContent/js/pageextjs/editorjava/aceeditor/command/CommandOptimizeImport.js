Ext.define('Workspace.editorjava.aceeditor.command.CommandOptimizeImport',  {
	requires: [
	    'Workspace.common.constant.ConstantJava'
	],
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

            //https://regex101.com/r/gN4sS0/2
            // var regex ="/([;{}]+)(\s+)(\w+)([\s|\W])/ig";

            //https://ace.c9.io/#nav=api&api=editor
            //var regex ="([;{}]+)(\\s+)(\\w+)([\\s|\\W])";
            //var cnt = editor.findAll(regex, {regExp:true, wholeWord:false});

			//http://docs.sencha.com/extjs/4.0.7/#!/api/RegExp
			var value=editor.getValue();

            // RegEx Import
            var regImport = /(\bimport\b)(\s*)([\w|.]+)(\s*)(;)/g

			// RegEx Classname
            // var reg = /([;{}]+)(\s+)(\w+)([\s|\W])/ig;
            var reg = /(([\,(;{}]+)|(\bnew\b|\bthrows\b))(\s*)([A-Z]{1}[A-Za-z0-9]+)/g;

            var result;
            var cnt = 0;
            var find = "";
            var keywords = Workspace.common.constant.ConstantJava.KEYWORDS;
            var langClasses = Workspace.common.constant.ConstantJava.LANG_CLASSES;
            while ((result = reg.exec(value)) != null) {
                var str = result[5];
                if ((find.indexOf(str + "|") <0) && (keywords.indexOf(str.toLowerCase()) <0) && (langClasses.indexOf(str) <0)) {
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