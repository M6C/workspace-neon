var pleaseWaitMessage = 'Please Wait...';
var runningProcessMessage = 'Running process...';

function showWindowWaiting() {
  return Ext.window.MessageBox.wait(runningProcessMessage, pleaseWaitMessage);
}

/**
 * TODO Finir la fonction pour affichier un messages sans barre de progression
 */ 
function showWindowWaitingNoProgress() {
  var config = new Ext.ProgressBar();
  config.setVisible(false);
  config.hide();
  return Ext.window.MessageBox.wait(runningProcessMessage, pleaseWaitMessage, config);
}

function hideWindowWaiting(msg) {
	hideWindowWaiting(msg, 1);
}

function hideWindowWaiting(msg, sec) {
   Ext.window.MessageBox.updateProgress(1, '', msg);
   // Fermeture de la fenêtre après x sec seconde
   var x = window.setInterval(function() {Ext.window.MessageBox.hide();window.clearInterval(x);}, sec*1000);
}
