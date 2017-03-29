package workspace.service.debug;

import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.VirtualMachine;
import com.sun.jdi.event.BreakpointEvent;
import com.sun.jdi.event.Event;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.service.debug.tool.ToolDebug;
import workspace.thread.debug.ThrdDebugEventQueue;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugStop extends SrvGenerique {

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	  HttpSession session = request.getSession();
          PrintWriter out = response.getWriter();
    	  VirtualMachine virtualMachine = null;
    	  String application = (String)bean.getParameterDataByName("application");
    	  BeanDebug beanDebug = ToolDebug.getBeanDebug(session, application);
    	  try {
			  if (beanDebug!=null) {
				  virtualMachine = beanDebug.getVirtualMachine();

	    		  Event currentEvent = beanDebug.getCurrentEvent();
	    		  if (currentEvent instanceof BreakpointEvent) {
    				  ((BreakpointEvent)currentEvent).thread().resume();
    			  }
    			  if (beanDebug.getCurrentStepEvent() != null) {
    				  beanDebug.getCurrentStepEvent().thread().resume();
    			  }
    			  virtualMachine.resume();

    			  ToolDebug.deleteBreakpoint(beanDebug);

				  beanDebug.setCurrentEvent(null);
    			  beanDebug.setCurrentStepEvent(null);

    			  if (beanDebug.getTableBreakpoint().size() == 0) {
    				  session.removeAttribute("beanDebug");
    				  System.out.println("BeanDebug removed in session because TableBreakpoint is empty.");
    			  }
			  } else {
				  System.err.println("BeanDebug not found. Can't Stop Debug.");
			  }
			  out.print("Stopped");
    	  }
    	  catch(Exception ex) {
    		  StringWriter sw = new StringWriter();
    		  ex.printStackTrace(new PrintWriter(sw));
    		  request.setAttribute("msgText", sw.toString());
    		  throw ex;
    	  }
    	  finally {
        	  ToolDebug.dispose(beanDebug);
    	  }
    }
}
