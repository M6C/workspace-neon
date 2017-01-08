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
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
			var application = Ext.getCmp('project').value;

			var filename = editor.panelId.toLowerCase();
            if (!filename.endsWith('.java')) {
			    console.info('Workspace.editorjava.aceeditor.command.CommandOptimizeImport no java file');
                return;
            }

    		var selection = editor.selection;
    		var col = selection.getCursor().column;
    		var row = selection.getCursor().row;

            //https://regex101.com/r/gN4sS0/2
            // var regex ="/([;{}]+)(\s+)(\w+)([\s|\W])/ig";

            //https://ace.c9.io/#nav=api&api=editor
            //var regex ="([;{}]+)(\\s+)(\\w+)([\\s|\\W])";
            //var cnt = editor.findAll(regex, {regExp:true, wholeWord:false});

			//http://docs.sencha.com/extjs/4.0.7/#!/api/RegExp
			var value=editor.getValue();

            var listClass = me.extractClass(value);
            var listImport = me.extractImport(value);

            var listClassWithOutImport = me.getClassWithOutImport(listImport, listClass);

            if (listClassWithOutImport.length > 0) {
                var classname = listClassWithOutImport.join("");

    			Ext.Ajax.request({
    				method:'GET',
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonOptimizeImport',
    				callback:function(options, success, responseCompile) {
    				    // var jsonData = Ext.JSON.decode(responseCompile.responseText);
    					Workspace.common.tool.Pop.info(me, "Optimize Import complete.");
    				},
    				params:{application:application, classname: classname}
    			});
            }

            var listImportUnused = me.getImportUnused(listImport, listClass);
            var listImportUsed = me.removeImportUnused(listImport, listImportUnused);

            var generatedImport = me.generateImport(listImportUsed);

            // value = me.deleteImportUnused(editor, listImportUnused);
            value = me.replaceImport(value, generatedImport);

            editor.setValue(value);

			selection.selectToPosition({column:col,row:row});
        }
        ,
        deleteImportUnused: function(editor, listImportUnused) {
			var selection = editor.selection;
			var col = selection.getCursor().column;
			var row = selection.getCursor().row;
            var value = editor.getValue();

            Ext.Array.each(listImportUnused, function(strImport, index, importItSelf) {
                var strReg = "(\\bimport\\b)(\\s*)(\\b"+strImport+"\\b)(\\s*)(;)";
				var reg = new RegExp(strReg);
				value = value.replace(reg, "");
            });

			selection.selectToPosition({column:col,row:row});
			return value;
        }
        ,
        replaceImport: function(value, generatedImport) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;

            // RegEx Import
            var reg = /(\bimport\b)(\s*)([\w|.]+)(\s*)(;)/g

            var idxStart = -1, idxEnd = -1;
            var result;
            while ((result = reg.exec(value)) != null) {
                var str = result[0];
                if (idxStart == -1) {
                    idxStart = result.index;
                }
                idxEnd = result.index + str.length;
            }

            if (idxStart > -1) {
                value = value.substring(0, idxStart) + generatedImport + value.substring(idxEnd);
            }
// 			Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractImport cnt:" + ret.length + "<br>find:" + ret.join(","));
			return value;
        }
        ,
        generateImport: function(listImport) {
            var ret = "";

            listImport = listImport.sort(function(a, b){
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

            Ext.Array.each(listImport, function(strImport, index, importItSelf) {
                ret += "import " + strImport + ";\r\n";
            });
            return ret;
        }
        ,
        removeImportUnused: function(listImport, listImportUnused) {
            return listImport.filter(function(strImport, index, array) {
                return (listImportUnused.indexOf(strImport) >= 0);
            });
        }
        ,
        getClassWithOutImport: function(listImport, listClass) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

            Ext.Array.each(listClass, function(strClass, index, importItSelf) {
                var find = false;
                Ext.Array.each(listImport, function(strImport, index, importItSelf) {
                    var idx = strImport.lastIndexOf(".");

    				var reg = new RegExp("\\b."+strClass+"\\b$");
                    if (!Ext.isEmpty(strImport.match(reg))) {
                        find = true;
                    }
                    return !find;
                });
                if (!find) {
                    ret.push(strClass);
                }
            });

			Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getClassWithOutImport cnt:" + ret.length + "<br>ret:" + ret.join(","));
            return ret;
        }
        ,
        getImportUnused: function(listImport, listClass) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

            Ext.Array.each(listImport, function(strImport, index, importItSelf) {
                var idx = strImport.lastIndexOf(".");

                if ((idx <= 0) || (listClass.indexOf(strImport.substring(idx+1)) < 0)) {
                    ret.push(strImport);
                }
            });

			Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getImportUnused cnt:" + ret.length + "<br>ret:" + ret.join(","));
            return ret;
        }
        ,
        extractClass: function(value) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

			// RegEx Classname
            var reg = /(([\,(;{}]+)|(\bnew\b|\bthrows\b))(\s*)([A-Z]{1}[A-Za-z0-9]+)/g;

            var result;
            var keywords = Workspace.common.constant.ConstantJava.KEYWORDS;
            var langClasses = Workspace.common.constant.ConstantJava.LANG_CLASSES;
            while ((result = reg.exec(value)) != null) {
                var str = result[5];
                if ((ret.indexOf(str) < 0) && (keywords.indexOf(str.toLowerCase()) < 0) && (langClasses.indexOf(str) < 0)) {
                    ret.push(str);
                }
            }
// 			Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractClass cnt:" + ret.length + "<br>ret:" + ret.join(","));
			return ret;
        }
        ,
        extractImport: function(value) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

            // RegEx Import
            var reg = /(\bimport\b)(\s*)([\w|.]+)(\s*)(;)/g

            var result;
            var ret = [];
            while ((result = reg.exec(value)) != null) {
                var str = result[3];
                if (ret.indexOf(str) < 0) {
                    ret.push(str);
                }
            }
// 			Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractImport cnt:" + ret.length + "<br>find:" + ret.join(","));
			return ret;
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandOptimizeImport');});