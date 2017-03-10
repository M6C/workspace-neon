package workspace.service.debug;

import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.BreakpointRequest;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Hashtable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

public class SrvDebugBreakpointList extends SrvGenerique {

	public void init() {
	}

	public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
		HttpSession session = request.getSession();
		String application = (String)bean.getParameterDataByName("application");
		BeanDebug beanDebug = null;
		try {
			beanDebug = ToolDebug.findBeanDebug(session);
		} catch (Exception ex) {
			StringWriter sw = new StringWriter();
			ex.printStackTrace(new PrintWriter(sw));
			request.setAttribute("msgText", sw.toString());
			throw ex;
		} finally {
			doResponse(request, response, beanDebug);
		}
	}

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanDebug beanDebug) throws Exception {
	    if (beanDebug != null) {
            Hashtable<String, BreakpointRequest> tableBreakpoint = beanDebug.getTableBreakpoint();
            String ret = null;
            try {
                for(BreakpointRequest brkR : tableBreakpoint.values()) {
    
            		// Recupere le nom de l'application du point d'arret
            		String application = URLEncoder.encode((String) brkR.getProperty("application"), "UTF-8");
            		// Recupere le chemin des sources de la class du point d'arret
            		String path = URLEncoder.encode((String) brkR.getProperty("path"), "UTF-8");
            		String sourceName = URLEncoder.encode((String) brkR.getProperty("fileName"), "UTF-8");
            		String className = URLEncoder.encode((String) brkR.getProperty("className"), "UTF-8");
            		String line = URLEncoder.encode((String) brkR.getProperty("line"), "UTF-8");

                    ret = (ret == null) ? "" : ret + ";";
            		ret += application + ":" + path + ":" + sourceName + ":" + className + ":" + line;
                }
            } finally {
        		PrintWriter out = response.getWriter();
        		out.print(ret);
            }
	    }
	}
}