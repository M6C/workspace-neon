package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.Enumeration;
import java.util.Hashtable;

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
    	  VirtualMachine virtualMachine = null;
    	  try {
    		  String hostName = "localhost";
    		  Integer port = new Integer(8380);
			  BeanDebug beanDebug = ToolDebug.getBeanDebug(session, hostName, port);;

			  virtualMachine = beanDebug.getVirtualMachine();

			  Hashtable<String, BreakpointRequest> tableBreakpoint = beanDebug.getTableBreakpoint();
			  if (tableBreakpoint!=null) {
				  BreakpointRequest brkR = null, brkR2 = null;
				  Object key = null;
				  Enumeration<String> enumKeys = tableBreakpoint.keys();
				  while(enumKeys.hasMoreElements()) {
					  key = enumKeys.nextElement();
					  brkR = (BreakpointRequest)tableBreakpoint.get(key);
					  brkR2 = ToolDebug.recreateBreakpoint(beanDebug, brkR);
					  copyBreakpointProperties(brkR, brkR2);
				  }
			  }
			  
			  out.print("Started");
    	  }
    	  catch(Exception ex) {
    		  StringWriter sw = new StringWriter();
    		  ex.printStackTrace(new PrintWriter(sw));
    		  request.setAttribute("msgText", sw.toString());
    		  throw ex;
    	  }
    	  finally {
    		  if (virtualMachine!=null)
    			  virtualMachine.resume();
    	  }
    }

    protected void copyBreakpointProperties(BreakpointRequest brkR1, BreakpointRequest brkR2) throws Exception {
        brkR2.putProperty("line", brkR1.getProperty("line"));
        brkR2.putProperty("className", brkR1.getProperty("className"));
        brkR2.putProperty("application", brkR1.getProperty("application"));
        brkR2.putProperty("fileName", brkR1.getProperty("fileName"));
        brkR2.putProperty("path", brkR1.getProperty("path"));
    }
}