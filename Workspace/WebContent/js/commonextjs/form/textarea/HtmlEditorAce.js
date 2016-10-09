Ext.define('Workspace.common.form.textarea.HtmlEditorAce', {
	// REQUIRED
	requiers: ['Workspace.editorjava.panel.center.function.AddTab']
	,
	extend: 'Ext.ux.AceEditor'
	,
	alias: 'widget.commonHtmlEditor',
	alternateClassName: 'WorkspaceCommonHtmlEditor'
	,
	frame : true,
	initComponent : function() {
		console.log('Workspace.common.form.textarea.HtmlEditor initComponent');
//		this.initEditor();
		commands.addCommand({
		    name: "...",
		    exec: function() {
		    	this.onKeydown();
		    	this.onKeyUp();
		    },
		    bindKey: {mac: "cmd-enter", win: "ctrl-enter"}
		})
		this.callParent(arguments);;
		this.addEvents('submit');
	},
	initEditor : function() {
		console.log('Workspace.common.form.textarea.HtmlEditor initEditor');
//		this.callParent(arguments);;
		var iframe = this.textInput.getElement();
		iframe.htmlEditor = this;
		if (Ext.isIE) {
			///////////////IE///////////////////////////////
			iframe.attachEvent('onkeydown', this.onKeydown, this);
			iframe.attachEvent('onkeyup', this.onKeyUp, this);
		} else {
			//////////////Mozilla///////////////////////////
			iframe.addEventListener('keydown', this.onKeydown, this);
			iframe.addEventListener('keyup', this.onKeyUp, this);
		}
	},
    enableKeyEvents: true,
	onKeydown : function(evt, cmp) {
		console.log('Workspace.common.form.textarea.HtmlEditor onKeydown');
	},
    onKeyUp : function(evt, cmp) {
		console.log('Workspace.common.form.textarea.HtmlEditor onKeyUp');
	},
    getCaretSelection : function () {
        var doc = this.getDoc(), selDocFrag;
        if (this.win.getSelection){
	        console.log('Workspace.common.form.textarea.HtmlEditor win getSelection');
	        // FF, Chrome
	        return this.win.getSelection();
        } else if (doc.getSelection){
	        console.log('Workspace.common.form.textarea.HtmlEditor doc getSelection');
	        // Safari
	        return this.win.getSelection();
        } else if (doc.selection){
        	// IE
            this.win.focus();
            console.log('Workspace.common.form.textarea.HtmlEditor doc createRange text');
            return doc.selection.createRange();
        }
    },
    getCaretPositionRange : function () {
    	var agileSelection = new Workspace.Agile.Selection(this.iframe.ownerDocument.body);
    	agileSelection.setCursor(5,6);
    	var caret = agileSelection.getCaretPosition();
    	agileSelection.setCaretPosition(5, 2);

    	var sel = getCaretSelection();

        var bookmark = '~';
    	this.syncValue();
		var txtOrigine=this.getEditorBody().innerHTML;
	    var pos = 0;
		try {
	        var text = bookmark;
	        this.win.focus();
            this.execCmd('InsertHTML', text);

            this.syncValue();

			var txt=this.getRawValue();
	        pos = txt.search(bookmark);
	        return {startOffset:pos, endOffset:pos};
		} finally {
		}
    }
    ,
    insertAtCursor : function(text){
        if(!this.activated){
            return;
        }
        if(Ext.isIE){
            this.win.focus();
            var doc = this.getDoc(),
                r = doc.selection.createRange();
            if(r){
                r.pasteHTML(text);
                this.syncValue();
            }
        }else{
            this.win.focus();
            this.execCmd('InsertHTML', text);
        }
    }

}, function() {Workspace.tool.Log.defined('Workspace.common.form.textarea.HtmlEditorAce defined!');})