Ext.define('Workspace.tool.UtilString', {
	// REQUIRED

	statics: {
		/**
	     * Return true if the two path are equals
		 * Exemple :
		 *		- path1 : '/src' and path2 : '/src/item.txt' return true 
		 *		- path1 : '\src\java' and path2 : '/src/java/item.txt' return true 
		 *		- path1 : '/src/java' and path2 : '/src/java/tool/item.txt' return false
	     *
	     * @return true if the two path are equals
	     * @static
	     */
		isEqualPath : function(path1, path2) {
			var sep1 = (path1.indexOf('/')>=0 ? '/' : '\\');
			var sep2 = (path2.indexOf('/')>=0 ? '/' : '\\');

//			if (!this.endsWith(path1, sep1))
//				path1 += sep1;

			var lastSep1 = path1.length;//path1.lastIndexOf(sep1);
			var lastSep2 = path2.lastIndexOf(sep2);
	
			if (lastSep1 != lastSep2)
				return false;

//			if (sep1 != sep2) {
//				path1 = path1.replace(sep1, sep2);
//			}
			
//			path1 = path1.substring(0, lastSep1);
			path2 = path1.substring(0, lastSep2);
	
			return path1==path2;
		}
		,
	    /**
	     * Return true if the two path are diffent
		 * Exemple :
		 *		- path1 : '/src' and path2 : '/src/item.txt' return false 
		 *		- path1 : '\src\java' and path2 : '/src/java/item.txt' return false 
		 *		- path1 : '/src/java' and path2 : '/src/java/tool/item.txt' return true
	     *
	     * @return true if the two path are diffent
	     * @static
	     */
		isNotEqualPath : function(path1, path2) {
			return !this.isEqualPath(path1, path2);
		}
		,
		/**
	     * @return true str end with suffix
	     * @static
		 */
		endsWith : function(str, suffix) {
		    return str.indexOf(suffix, str.length - suffix.length) !== -1;
		}
	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilString');});