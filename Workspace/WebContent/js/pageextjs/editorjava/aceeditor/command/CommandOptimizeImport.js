Ext.define('Workspace.editorjava.aceeditor.command.CommandOptimizeImport',  {
	requires: [
	    'Workspace.common.constant.ConstantJava'
	],
	statics: {
        regExtractImport: /(\bimport\b)(\s*)([\w|.]+)(\s*)(;)/g
        ,
        regExtractPackage: /(\bpackage\b)(\s*)([\w|.]+)(\s*)(;)/
        ,
        regExtractClass: /(([\,(;{}=]+)|(\bnew\b|\bthrows\b|\bextends\b|\bimplements\b))(\s*)([A-Z]{1}[A-Za-z0-9]+)/g
        ,
        regExtractClassname: /(((\bprotected\b|\bprivate\b|\bpublic\b)(\s*))*)(\bclass\b)(\s*)([\w|.]+)(\s*)({|\bthrows\b|\bextends\b|\bimplements\b)/
        ,
        regDeleteImport: function(strImport) {
            var strReg = "(\\bimport\\b)(\\s*)(\\b"+strImport+"\\b)(\\s*)(;)";
    		return new RegExp(strReg);
        }
        ,
        regFindClass: function(strClass) {
            return new RegExp("\\b."+strClass+"\\b$");
        }
        ,
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

			var filename = editor.panelId.toLowerCase();
            if (!filename.endsWith('.java')) {
			    console.info('Workspace.editorjava.aceeditor.command.CommandOptimizeImport no java file');
                return;
            }
		    Workspace.common.tool.Pop.info(me, 'Optimize Import waiting complete.', {detail: filename});

    		var selection = editor.selection;
    		var col = selection.getCursor().column;
    		var row = selection.getCursor().row;
    		var position = {column:col,row:row};

            //https://regex101.com/r/gN4sS0/2
            // var regex ="/([;{}]+)(\s+)(\w+)([\s|\W])/ig";

            //https://ace.c9.io/#nav=api&api=editor
            //var regex ="([;{}]+)(\\s+)(\\w+)([\\s|\\W])";
            //var cnt = editor.findAll(regex, {regExp:true, wholeWord:false});

			//http://docs.sencha.com/extjs/4.0.7/#!/api/RegExp
			var value=editor.getValue();

            var listClass = me.extractClass(value);
 			// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractClass cnt:" + listClass.length + "<br>ret:" + listClass.join(","), false);
            var listImport = me.extractImport(value);
 			// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport exractImport cnt:" + listImport.length + "<br>ret:" + listImport.join(","), false);

            var listClassWithOutImport = me.getClassWithOutImport(listImport, listClass);
			// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getClassWithOutImport cnt:" + listClassWithOutImport.length + "<br>ret:" + listClassWithOutImport.join(","), false);

            var listImportUnused = me.getImportUnused(listImport, listClass);
			// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getImportUnused cnt:" + listImportUnused.length + "<br>ret:" + listImportUnused.join(","), false);
            var listImportUsed = me.removeImportUnused(listImport, listImportUnused);
			// Workspace.common.tool.Pop.info(me, "Workspace.editorjava.aceeditor.command.CommandOptimizeImport getImportUsed cnt:" + listImportUsed.length + "<br>ret:" + listImportUsed.join(","), false);

            me.doOptimizeImport(editor, position, value, listImportUsed, listClassWithOutImport);
        }
        ,
        deleteImportUnused: function(editor, listImportUnused) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
			var selection = editor.selection;
			var col = selection.getCursor().column;
			var row = selection.getCursor().row;
            var value = editor.getValue();

            Ext.Array.each(listImportUnused, function(strImport, index, importItSelf) {
				var reg = me.regDeleteImport(strImport);
				value = value.replace(reg, "");
            });

			selection.selectToPosition({column:col,row:row});
			return value;
        }
        ,
        doOptimizeImport: function(editor, position, value, listImportUsed, listClassWithOutImport) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;

            var listClass = Ext.clone(listClassWithOutImport);
            if (!Ext.isEmpty(listClass)) {
			    var paramApplication = Ext.getCmp('project').value;
                var paramClassname = listClass.join(";");

    			Ext.Ajax.request({
    				method:'GET',
    				url:DOMAIN_NAME_ROOT + '/action.servlet?event=JsonOptimizeImport',
    				params:{application:paramApplication, classname: paramClassname},
    				callback:function(options, success, responseCompile) {
    				// 	Workspace.common.tool.Pop.info(me, "Optimize Import complete." + responseCompile.responseText);
    				    var jsonData = Ext.JSON.decode(responseCompile.responseText);
    				    if (Ext.isArray(jsonData.import) && !Ext.isEmpty(jsonData.import)) {
                            var cnt = jsonData.import.length;
                            var importList = jsonData.import;
                            Ext.Array.each(importList, function(objImport, index, importItSelf) {
                                var classname = objImport.classname;
                                var list = objImport.list;
                                if (list.length == 1) {
                                    listImportUsed.push(list[0].classname);  
                                    Ext.Array.remove(listClass, classname);
                                } else {
                                	var textConverter = function(value, record) {
                                        return record.raw.classname;
                                    };

                                    // Do Replace Import on 1st Window because WindowCombo is ASYNCHRONOUS and the 1st Window will be the last showing window
        			                var doReplaceImport = (index == 0);
        			                var msgbox = Ext.create('Workspace.common.window.WindowCombo',  {
        			                    value: list, 
        			                    doReplaceImport: doReplaceImport, 
        			                    textConverter: textConverter, 
        			                    minPromptWidth:420,
        			                    resizable:true
        			                    ,
        			                    comboConfig: {
        			                        width: 390
        			                    }
                                    });

                                    var maxLenTitle = 60;
                                    var getTitle = function(data) {
        			                	var path = data.path;//classname;
        			                	var len = path.length;
        			                	if (len > maxLenTitle) {
        			                	    path = "..." + path.substring(len - maxLenTitle)
        			                	}
        			                	return path;
                                    }
        			                msgbox.textField.on('select', function(combo, records, option) {
        			                	var title = '';
        			                	if (records.length == 1) {
	        			                	title = getTitle(records[0].data.data);
        			                	}
        			                	msgbox.setTitle(title);
        			                });

        			                var onSpecialkey = function (field, e) {
        			                	var key = e.getKey();
        			                	if (key == e.UP || key == e.DOWN) {

        			                    	var idx = field.idxFocus;
	        			                    if (Ext.isDefined(idx) && idx >= 0) {
	        			                	    var title = getTitle(field.store.data.items[idx].data.data);
		        			                    msgbox.setTitle(title);
	        			                    }
        			                	}
        			                };

        			                // Add listener no need to use Ext.Function.createSequence. Because old listener is not removed.
        			                msgbox.textField.on('specialkey', onSpecialkey);

        			                msgbox.prompt("Optimize Import", classname,
                                        function (btn, text, option) {
                                            if (btn == 'ok') {
                                                listImportUsed.push(text.classname);
                                                Ext.Array.remove(listClass, classname);
                                            }
			                                if (Ext.isEmpty(listClass)) {
                                                me.replaceImport(editor, position, value, listImportUsed);
                                            }
                                        }
                                    , msgbox);
                                }
                            });
    				    } else {
                            listClass = [];
    				    }
            			if (Ext.isEmpty(listClass)) {
                            me.replaceImport(editor, position, value, listImportUsed);
            			}
				    }
    			});
            } else  {
                me.replaceImport(editor, position, value, listImportUsed);
			}
        }
        ,
        replaceImport: function(editor, position, value, listImportUsed) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
			var filename = editor.panelId.toLowerCase();

            // value = me.deleteImportUnused(editor, listImportUnused);
            var generatedImport = me.generateImport(listImportUsed);

            // RegEx Import
            var reg = me.regExtractImport;

            var idxStart = -1, idxEnd = -1;
            var result;
            while ((result = reg.exec(value)) != null) {
                var str = result[0];
                if (idxStart == -1) {
                    idxStart = result.index;
                }
                idxEnd = result.index + str.length;
            }

            var oldImport = "";
            if (idxStart > -1) {
                oldImport = value.substring(idxStart, idxEnd);
            } else {
            	// Try insert import after package declaration
                var regPack = me.regExtractPackage;
                if ((result = regPack.exec(value)) != null) {
                    var str = result[0];
                    idxStart = result.index + str.length;
                    idxEnd = idxStart;
                    generatedImport = "\r\n\r\n" + generatedImport;
                } else {
	                // Try insert import before class definition
	                var regClsn = me.regExtractClassname;
	                if ((result = regClsn.exec(value)) != null) {
	                    idxStart = result.index;
	                    idxEnd = idxStart;
	                    generatedImport += "\r\n\r\n";
	                }
                }
            }
            var valueResult = value.substring(0, idxStart) + generatedImport + value.substring(idxEnd);

            editor.setValue(valueResult);

		    editor.focus();
		    var cursorRow = position.row;//(Ext.isDefined(editor.cursorRow) ? editor.cursorRow : 0);
		    var cursorCol = position.column;//(Ext.isDefined(editor.cursorCol) ? editor.cursorCol : 0);

            if (!Ext.isEmpty(oldImport)) {
                cursorRow = cursorRow - oldImport.match(/\r/g).length + generatedImport.match(/\r/g).length;
            }

		    editor.scrollToLine(cursorRow+1, true, false, function(){});
			editor.gotoLine(cursorRow+1, cursorCol, false);
		    Workspace.common.tool.Pop.info(me, 'Optimize Import complete.', {detail: filename});
        }
        ,
        generateImport: function(listImport) {
            var ret = "";

            listImport = listImport.sort(function(a, b){
                if (a < b) return -1;
                if (a > b) return 1;
                return 0;
            });

            var rootPackage = undefined;
            Ext.Array.each(listImport, function(classname, index, importItSelf) {
                var idx = classname.indexOf(".");
                if (idx > 0 && (!Ext.isDefined(rootPackage) || (classname.indexOf(rootPackage) != 0))) {
                    ret += "\r\n";
                    rootPackage = classname.substring(0, idx+1);
                }
                ret += "import " + classname + ";\r\n";
            });

            return ret.trim();
        }
        ,
        removeImportUnused: function(listImport, listImportUnused) {
            return listImport.filter(function(classname, index, array) {
                return (listImportUnused.indexOf(classname) < 0);
            });
        }
        ,
        getClassWithOutImport: function(listImport, listClass) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

            Ext.Array.each(listClass, function(strClass, index, importItSelf) {
                var find = false;
                Ext.Array.each(listImport, function(classname, index, importItSelf) {
                    var idx = classname.lastIndexOf(".");

    				var reg = me.regFindClass(strClass);
                    if (!Ext.isEmpty(classname.match(reg))) {
                        find = true;
                    }
                    return !find;
                });
                if (!find) {
                    ret.push(strClass);
                }
            });

            return ret;
        }
        ,
        getImportUnused: function(listImport, listClass) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

            Ext.Array.each(listImport, function(classname, index, importItSelf) {
                var idx = classname.lastIndexOf(".");

                if ((idx <= 0) || (listClass.indexOf(classname.substring(idx+1)) < 0)) {
                    ret.push(classname);
                }
            });

            return ret;
        }
        ,
        extractClass: function(value) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

			// RegEx Classname
            var reg = me.regExtractClass

            var result;
            var keywords = Workspace.common.constant.ConstantJava.KEYWORDS;
            var langClasses = Workspace.common.constant.ConstantJava.LANG_CLASSES;
            while ((result = reg.exec(value)) != null) {
                var str = result[5];
                if ((ret.indexOf(str) < 0) && (keywords.indexOf(str.toLowerCase()) < 0) && (langClasses.indexOf(str) < 0)) {
                    ret.push(str);
                }
            }

			return ret;
        }
        ,
        extractImport: function(value) {
			var me = Workspace.editorjava.aceeditor.command.CommandOptimizeImport;
            var ret = [];

            // RegEx Import
            var reg = me.regExtractImport

            var result;
            var ret = [];
            while ((result = reg.exec(value)) != null) {
                var str = result[3];
                if (ret.indexOf(str) < 0) {
                    ret.push(str);
                }
            }

			return ret;
        }
	}
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.aceeditor.command.CommandOptimizeImport');});