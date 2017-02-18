package workspace.service.debug.extjs;

import java.io.File;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.LocalVariable;
import com.sun.jdi.StackFrame;
import com.sun.jdi.ThreadReference;
import com.sun.jdi.Value;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;

import framework.beandata.BeanGenerique;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;
import workspace.util.UtilFile;

/**
 *
 * a servlet handles upload request.<br>
 * refer to http://www.ietf.org/rfc/rfc1867.txt
 * 
 */

public class SrvDebugBreakpointVariable extends SrvGenerique {

	public void init() {
    }

    public void execute(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean) throws Exception {
    	  HttpSession session = request.getSession();
    	  StringBuffer sb = new StringBuffer("{\"success\":true,\"children\":[");
    	  try {
	    	  BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
	    	  if (beanDebug!=null) {
//	    		  Event currentEvent = beanDebug.getCurrentEvent();
	    		  Event currentEvent = (beanDebug.getCurrentStepEvent() != null) ? beanDebug.getCurrentStepEvent() : beanDebug.getCurrentEvent();
	    		  if ((currentEvent!=null)&&(currentEvent instanceof LocatableEvent)) {
	    			  LocatableEvent event = (LocatableEvent)currentEvent;
		    		  ThreadReference thread = event.thread();
		    		  if (thread == null) {
		    			  System.err.println("No Thread found for event");
		    			  return;
		    		  }
		    		  List frames = thread.frames();
		    		  if ((frames!=null)&&(!frames.isEmpty())) {
		    			  StackFrame frame = null;
		    			  Iterator it = frames.iterator();
		    			  int cnt = 0;
		    			  while(it.hasNext()) {
		    				  frame = (StackFrame)it.next();
				              if (cnt > 0) {
				                sb.append(",");
				              }
		    				  String classname = "";
		    				  String sourcePath = "";
		    				  String methode = "";
		    				  String signature = "";
		    				  boolean leaf = true;
		    				  try {
			    				  classname = frame.location().declaringType().name();
			    				  sourcePath = frame.location().sourcePath();
			    				  methode = frame.location().method().name();
			    				  signature = frame.location().method().signature();
		    				  }
		    				  catch(Exception ex) {}

		    				  try{classname = URLEncoder.encode(classname);}catch(Exception ex){}
		    				  try{sourcePath = URLEncoder.encode(sourcePath);}catch(Exception ex){}
		    				  try{methode = URLEncoder.encode(methode);}catch(Exception ex){}
		    				  try{signature = URLEncoder.encode(signature);}catch(Exception ex){}

		    				  sb.append("{\"text\":\"").append(classname).append("\"");
		    				  sb.append(",\"expanded\":").append(cnt == 0? "true" : "false").append(",\"children\":[");

				              sb.append("{\"text\":\"info\",\"expanded\":false,\"leaf\":false,\"children\":[");
				              sb.append("{\"text\":\"sourcePath:").append(sourcePath).append("\",\"leaf\":true},");
				              sb.append("{\"text\":\"methode:").append(methode).append("\",\"leaf\":true},");
				              sb.append("{\"text\":\"signature:").append(signature).append("\",\"leaf\":true}");
				              sb.append("]}");
		    				  
		    				  try {
			    				  List visibleVariables = frame.visibleVariables();
					    		  if ((visibleVariables!=null)&&(!visibleVariables.isEmpty())) {
					    			  leaf = false;
					    			  String typename = "", valueText = "";
					    			  LocalVariable variable = null;
					    			  Value value = null;
					    			  Iterator itV = visibleVariables.iterator();
					    			  while(itV.hasNext()) {
					    				  variable = (LocalVariable)itV.next();
					    				  value = frame.getValue(variable);

					    				  try{typename = URLEncoder.encode(variable.typeName());}catch(Exception ex){}
					    				  try{valueText = URLEncoder.encode(value.toString());}catch(Exception ex){}

					    				  sb.append(",");
					    				  sb.append("{\"text\":\"").append(variable.name()).append("\",\"expanded\":false,\"leaf\":false,\"children\":[");
							              sb.append("{\"text\":\"type:").append(typename).append("\",\"leaf\":true},");
							              sb.append("{\"text\":\"value:").append(valueText).append("\",\"leaf\":true}");
							              sb.append("]}");
					    			  }
					    		  }
		    				  }
		    				  catch(Exception ex) {}
		    				  sb.append("]").append(",\"leaf\":").append(leaf).append("}");
		    				  cnt++;
		    			  }
		    		  }
	    		  }
	    	  }
			  sb.append("]}");
    	  }
    	  catch(Exception ex) {
    		  StringWriter sw = new StringWriter();
    		  ex.printStackTrace(new PrintWriter(sw));
    		  request.setAttribute("msgText", sw.toString());
    		  sb = new StringBuffer("{success:false,message:\"").append(ex.getMessage()).append("\"}");
    	  }
		  PrintWriter out = response.getWriter();
          out.print(sb.toString());
//          File file = new File("out_json.txt");
//          file.createNewFile();
//          try{UtilFile.write(file, sb.toString());}catch(Exception ex){ex.printStackTrace();}
    }
}