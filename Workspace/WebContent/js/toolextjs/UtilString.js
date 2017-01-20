Ext.define('Workspace.tool.UtilString', {

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
		,
		cuteSplitPath: function(str, length) {
		    var me = Workspace.tool.UtilString;
		    var ret = str;
		    var size = str.length;
		    if (size > length) {
    		    var middle = size / 2;
    			var sep = (ret.indexOf('/')>=0 ? '/' : '\\');
    			var idx1 = me.reverse(ret).indexOf(sep, middle);
    			var idx2 = ret.indexOf(sep, middle);
    			if (idx1 > 0 && idx2 > 0) {
    			    idx1 = middle - (idx1 - middle);
    			    ret = ret.substr(0, idx1) + '...' + ret.substr(idx2);
/*
    			    if (ret.length > length) {
    			        ret = me.cuteSplitPath(ret, length);
    			    }
*/
    			}
		    }
		    return ret;
		}
        ,
        reverse(str) {
            return str.split('').reverse().join('');
        }
	}

}, function() {Workspace.tool.Log.defined('Workspace.tool.UtilString');});