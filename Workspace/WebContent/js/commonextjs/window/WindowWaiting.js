Ext.define('Workspace.common.window.WindowWaiting',  {
	// REQUIRED

	statics: {
		pleaseWaitMessage : 'Please Wait...',
		runningProcessMessage : 'Running process...'
		,
		current : null
		,
		show : function() {
			if (Ext.isEmpty(this.current)) {
				//Ext.MessageBox.wait(this.runningProcessMessage, this.pleaseWaitMessage);
				this.current = Ext.window.MessageBox.create().wait(this.runningProcessMessage, this.pleaseWaitMessage);
//				this.current.wait(this.runningProcessMessage, this.pleaseWaitMessage);
			}
		}
		,
		/**
		 * TODO Finir la fonction pour affichier un messages sans barre de progression
		 */ 
		showNoProgress : function() {
			if (Ext.isEmpty(this.current)) {
				var config = new Ext.ProgressBar();
				config.setVisible(false);
				config.hide();
//				return Ext.MessageBox.wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
				this.current = Ext.window.MessageBox.create().wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
//				this.current.wait(this.runningProcessMessage, this.pleaseWaitMessage, config);
			}
			return this.current;
		}
		,
		updateText : function(text) {
			if (!Ext.isEmpty(this.current)) {
				this.current.updateText(text);
			}
		}
		,
		hide : function (msg) {
			hide(msg, 1);
		}
		,
		hide : function (msg, sec) {
			if (!Ext.isEmpty(this.current)) {
				this.current.updateProgress(1, '', msg);
				// Fermeture de la fenetre apres x sec seconde
				Ext.callback(function(wnd) {wnd.hide();}, null, [this.current], sec*1000);
				this.current = null;
			}
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.common.window.WindowWaiting');});