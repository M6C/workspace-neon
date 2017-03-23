package workspace.service.debug.extjs;

import com.sun.jdi.request.BreakpointRequest;

import java.io.PrintWriter;
import java.net.URLEncoder;
import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointList extends workspace.service.debug.SrvDebugBreakpointList {

	public void init() {
	}

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanDebug beanDebug) throws Exception {
	    if (beanDebug != null) {
            Hashtable<String, BreakpointRequest> tableBreakpoint = beanDebug.getTableBreakpoint();
            String ret = "{\"success\":true,\"children\":[";
            int cnt = 0;
            try {
                for(BreakpointRequest brkR : tableBreakpoint.values()) {
                    if (cnt++ > 0) {
                        ret += ",";
                    }
    
            		// Recupere le nom de l'application du point d'arret
            		String application = getProperty(brkR, "application");
            		// Recupere le chemin des sources de la class du point d'arret
            		String sourceName = getProperty(brkR, "fileName");
            		String className = getProperty(brkR, "className");
            		String line = getProperty(brkR, "line");

            		ret += "{application:'" + application + "',line:" + line + ",classname:'" + className + "',filename:'" + sourceName + "'}";
                }
            } finally {
                ret += "]}";

        		PrintWriter out = response.getWriter();
        		out.print(ret);
            }
	    }
	}

	private String getProperty(BreakpointRequest brkR, String name) {
		String ret = "";
		try {
			ret = URLEncoder.encode((String) brkR.getProperty(name), "UTF-8");
		} catch(Exception ex) {
        	System.err.println("SrvDebugBreakpointList getProperty '" + name + "' error message:" + ex.getMessage());
		}
		return ret;
	}
}