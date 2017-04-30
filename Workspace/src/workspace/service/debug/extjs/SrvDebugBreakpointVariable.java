package workspace.service.debug.extjs;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URLEncoder;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.sun.jdi.ClassNotLoadedException;
import com.sun.jdi.Field;
import com.sun.jdi.InvalidTypeException;
import com.sun.jdi.LocalVariable;
import com.sun.jdi.ObjectReference;
import com.sun.jdi.PrimitiveValue;
import com.sun.jdi.ReferenceType;
import com.sun.jdi.StackFrame;
import com.sun.jdi.StringReference;
import com.sun.jdi.ThreadReference;
import com.sun.jdi.Value;
import com.sun.jdi.event.Event;
import com.sun.jdi.event.LocatableEvent;

import framework.beandata.BeanGenerique;
import framework.ressource.util.UtilString;
import framework.service.SrvGenerique;
import workspace.bean.debug.BeanDebug;

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
    		  String variableName = (String) bean.getParameterDataByName("variableName");
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

		    				  sb.append("{")
		    				  	.append("\"classname\":\"").append(classname).append("\",")
					            .append("\"source\":\"").append(sourcePath).append("\",")
					            .append("\"methode\":\"").append(methode).append("\",")
					            .append("\"signature\":\"").append(signature).append("\",");

		    				  if (UtilString.isNotEmpty(variableName)) {
			    				  	sb.append("\"variableName\":\"").append(variableName).append("\",");
		    				  }

				              sb.append("\"variable\":[");
		    				  
		    				  try {
			    				  List<LocalVariable> visibleVariables = frame.visibleVariables();
					    		  if ((visibleVariables!=null)&&(!visibleVariables.isEmpty())) {
					    			  int cntVar = 0;
					    			  String varName = "", typename = "", valueText = "";
					    			  Value value = null;
					    			  for(LocalVariable variable : visibleVariables) {
					    				  value = frame.getValue(variable);
					    				  varName = variable.name();
					    				  boolean isObjectReference = !(value instanceof StringReference || value instanceof PrimitiveValue);

					    				  if (UtilString.isNotEmpty(variableName)) {
					    					  if (UtilString.isEquals(varName, variableName)) {
							    				  if (isObjectReference) {
							    					  ObjectReference objectReference = (ObjectReference) value;
							    					  inspectObjectReference(sb, objectReference);

							    					  break;
							    				  }
					    					  }
					    				  } else {
						    				  try{typename = URLEncoder.encode(variable.typeName());}catch(Exception ex){}
						    				  try{valueText = URLEncoder.encode(value.toString());}catch(Exception ex){}
	
						    				  if (cntVar > 0) {
						    					  sb.append(",");
						    				  }
								              sb.append("{")
								              	.append("\"name\":\"").append(varName).append("\",")
								              	.append("\"type\":\"").append(typename).append("\",")
								              	.append("\"value\":\"").append(valueText).append("\",")
								              	.append("\"objectReference\":").append(isObjectReference)
								              	.append("}");
								              cntVar++;
					    				  }
					    			  }
					    		  }
		    				  }
		    				  catch(Exception ex) {}
				              sb.append("]}");
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

	// http://alvinalexander.com/java/jwarehouse/eclipse/org.eclipse.jdt.debug.jdi.tests/tests/org/eclipse/debug/jdi/tests/ObjectReferenceTest.java.shtml
	private void inspectObjectReference(StringBuffer sb, ObjectReference fObject) {
		// setup
		ReferenceType type = fObject.referenceType();
		List<Field> fields = type.fields();
		List<Field> instanceFields = new LinkedList<>();
		for (Field field : fields) {
			if (!field.isStatic())
				instanceFields.add(field);
		}

		Map<Field, Value> values = fObject.getValues(instanceFields);
		int cntVar = 0;
		String varName = "", typename = "", valueText = "";
		for (Field field : instanceFields) {
			Value value = (Value) values.get(field);
			  boolean isObjectReference = !(value instanceof StringReference || value instanceof PrimitiveValue);

			try {typename = URLEncoder.encode(field.typeName());} catch (Exception ex) {}
			try {valueText = URLEncoder.encode(value.toString());} catch (Exception ex) {}

			if (cntVar > 0) {
				sb.append(",");
			}
			sb.append("{")
				.append("\"name\":\"").append(varName).append("\",")
				.append("\"type\":\"").append(typename).append("\",")
				.append("\"value\":\"").append(valueText).append("\",")
				.append("\"objectReference\":").append(isObjectReference)
				.append("}");
			cntVar++;
		}

//		 setValue(Field,Value)
//		 Value newValue = fVM.mirrorOf('b');
//		 try {
//		 fObject.setValue(field, newValue);
//		 } catch (ClassNotLoadedException e) {
//		 assertTrue("4.1", false);
//		 } catch (InvalidTypeException e) {
//		 assertTrue("4.2", false);
//		 }
//		
//		 getValue(Field)
//		 assertEquals("5", fObject.getValue(field), newValue);
//
//		 assertEquals("6", "fString2", field.name());
//		 try {
//		 fObject.setValue(field, null);
//		 } catch (ClassNotLoadedException e) {
//		 assertTrue("7.1", false);
//		 } catch (InvalidTypeException e) {
//		 assertTrue("7.2", false);
//		 }
//
//		 getValue(Field)
//		 assertEquals("8", fObject.getValue(field), null);
//
//		 test get final value.
//		 The value is null and should be because it's final
//		 assertEquals("10", fVM.mirrorOf("HEY"), fObject.getValue(field));

	}
}