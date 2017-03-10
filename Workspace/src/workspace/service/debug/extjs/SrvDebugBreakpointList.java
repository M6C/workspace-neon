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
                    if (cnt > 0) {
                        ret += ",";
                    }
    
            		// Recupere le nom de l'application du point d'arret
            		String application = URLEncoder.encode((String) brkR.getProperty("application"), "UTF-8");
            		// Recupere le chemin des sources de la class du point d'arret
            		String path = URLEncoder.encode((String) brkR.getProperty("path"), "UTF-8");
            		String sourceName = URLEncoder.encode((String) brkR.getProperty("fileName"), "UTF-8");
            		String className = URLEncoder.encode((String) brkR.getProperty("className"), "UTF-8");
            		String line = URLEncoder.encode((String) brkR.getProperty("line"), "UTF-8");

            		ret += "{application:'" + application + "',line:" + line + ",classname:'" + className + "',filename:'" + sourceName + "'}";
                }
            } finally {
                ret += "]}";

        		PrintWriter out = response.getWriter();
        		out.print(ret);
            }
	    }
	}

}