//Parameters :
// - panelId
// - panelEditorId
Ext.define('Workspace.editorjava.request.JsonEditLoadFile',  {
	requires: ['Workspace.common.tool.Toast']
	,
    constructor: function(config) {
		console.info('Workspace.editorjava.request.JsonEditLoadFile constructor');
        var me = this;

        Ext.apply(me, config);

        me.callParent();
    },

    request: function(callBackSuccess) { 
        var me = this;
		Ext.Ajax.request({  
			url : DOMAIN_NAME_ROOT + '/action.servlet?event=JsonEditLoadFile',
			headers: {'Content-Type': 'application/json; charset=UTF-8'},
			method: 'GET',
			params :{filename:me.panelId},
			success: function (result, request) {
	    		var jsonData = Ext.decode(result.responseText);
				var results = jsonData.results;
				var resultMessage = '';
				for(i=0 ; i<results ; i++) {
					resultMessage += me.decodeUtf8(jsonData.data[i].text) + '\r\n';
				}

				var filename = me.panelId.toLowerCase();
				var editor = ace.edit(me.panelEditorId);
		        var mode = 'text';
				ace.require("ace/ext/language_tools");
				if (filename.endsWith('.js')) {
					mode = 'javascript';
				} else if (filename.endsWith('.htm') || filename.endsWith('.xhtml')) {
					mode = 'html';
				} else if (filename.endsWith('.pxhtml')) {
					mode = 'php';
				} else if (filename.endsWith('.dtd') || filename.endsWith('.xsd') || filename.endsWith('.xsl')) {
					mode = 'xml';
				} else {
				    var idx=filename.lastIndexOf('.');
				    if (idx > 0) {
				        var mode = filename.substring(idx+1);
				    }
				}
		        editor.getSession().setMode({path: "ace/mode/" + mode, pure:true, /*other options here*/})
			    editor.setOptions({
			        enableBasicAutocompletion: true,
			        enableSnippets: true,
			        enableLiveAutocompletion: false
			    });

		        editor.doListenerChange = false;
				editor.setValue(resultMessage);
				editor.raw = {
				    encoding: jsonData.encoding
				};

		    	editor.dirty = false;
		    	editor.getSession().on('change', function(e){
		    	        if (editor.doListenerChange) {
        			        if (!editor.dirty) {
        					    var panelTab = Ext.getCmp(editor.panelId);
        					    panelTab.setTitle('*' + panelTab.title);
        		    	    }
        		    	    editor.dirty = true
		    	        }
		    	});
		    	editor.getSession().on('changeScrollTop', function(number){
		    		if (!editor.doListenerChange) {return;}
		    		editor.changeScrollTop = number;
		    	});
		    	editor.getSession().on('changeScrollLeft', function(number){
		    		if (!editor.doListenerChange) {return;}
		    		editor.changeScrollLeft = number;
		    	});
		    	editor.getSelection().on('changeCursor', function(number){
		    		if (!editor.doListenerChange) {return;}
					var cursor = editor.selection.getCursor();
					editor.cursorCol = cursor.column;
					editor.cursorRow = cursor.row;
		    	});
		    	if (Ext.isDefined(callBackSuccess)) {
		    		callBackSuccess();
		    	}
		    	editor.doListenerChange = true;
			},
			failure: function ( result, request ) {
				alert('failure');
			}
		});
    }
    ,
    decodeUtf8: function(str) {
        var ret = '';
        var cTmp = 0;
        for (var i = 0; i < str.length; i++) {
        	var char = str.charCodeAt(i);
        	if (char == 0x25) { //'%'
            	var c = str.substr(++i, 2);
                if (c == "C3") { // For UTF-8
	            	cTmp = 64;
                } else {
                	ret += String.fromCharCode(parseInt(c, 16) + cTmp);
                }
                i++;
            }
            else {
            	cTmp = 0;
            	if (char == 43) { //'+' => ' '
	            	ret += ' ';
	            }
	            else {
//	            	ret += decodeURIComponent(String.fromCharCode(char));
	            	ret += String.fromCharCode(char);
	            }
            }
    	}
        return ret;
    }
}, function() {Workspace.tool.Log.defined('Workspace.editorjava.request.JsonEditLoadFile');});