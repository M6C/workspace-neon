package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.Properties;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.VirtualMachine;
import com.sun.jdi.request.BreakpointRequest;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugStart extends SrvGenerique {

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	  HttpSession session = request.getSession();
          PrintWriter out = response.getWriter();
          String application = (String)bean.getParameterDataByName("application");
          BeanDebug beanDebug = ToolDebug.getBeanDebug(session, application);
          if (beanDebug==null) {
        	  System.err.println("BeanDebug not found. Can't Start Debug.");
        	  return;
          }
    	  try {
			  ToolDebug.recreateAllBreakpoint(beanDebug);

			  out.print("Started");
    	  }
    	  catch(Exception ex) {
    		  StringWriter sw = new StringWriter();
    		  ex.printStackTrace(new PrintWriter(sw));
    		  request.setAttribute("msgText", sw.toString());
    		  throw ex;
    	  }
    	  finally {
    		  VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
    		  if (virtualMachine!=null)
    			  virtualMachine.resume();
    	  }
    }
}