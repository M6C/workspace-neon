package workspace.service.debug.tool;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Enumeration;
import java.util.Hashtable;
import java.util.List;

import javax.servlet.http.HttpSession;

import com.sun.jdi.AbsentInformationException;
import com.sun.jdi.Location;
import com.sun.jdi.VirtualMachine;
import com.sun.jdi.connect.IllegalConnectorArgumentsException;
import com.sun.jdi.request.BreakpointRequest;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.EventRequestManager;

import framework.ressource.util.jdi.UtilJDI;
import workspace.bean.debug.BeanDebug;
import workspace.thread.debug.ThrdDebugEventQueue;

public class ToolDebug {

	private ToolDebug() {
	}
	
	public static BreakpointRequest findBreakpoint(VirtualMachine virtualMachine, String classname, int line) {
		BreakpointRequest ret = null;
		Location location = null;
        EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
        List<?> breakpointRequests = eventRequestManager.breakpointRequests();
        int size = breakpointRequests.size();
        for(int i=0 ; i<size ; i++) {
            EventRequest eventRequest = (EventRequest)breakpointRequests.get(i);
            if (eventRequest instanceof BreakpointRequest) {
                ret = (BreakpointRequest)eventRequest;
                location = ret.location();
                if (classname.equals(ret.getProperty("className")) && location.lineNumber()==line) {
                    break;
                }
                else {
                    ret = null;
                }
            }
        }
        return ret;
	}
	
	public static String readClassnameFromFile(File file) throws IOException {
        String className = "";//szClass;
        String fileName = file.getName();
        FileReader fileReader = new FileReader(file);
        BufferedReader fileInput = null;
        try {
            fileInput = new BufferedReader(fileReader);
            String lineFile = fileInput.readLine();
            while (lineFile!=null) {
                lineFile = lineFile.trim();
                if (lineFile.toUpperCase().startsWith("PACKAGE ")&&
                    lineFile.endsWith(";")) {
                    className = lineFile.substring(8, lineFile.length()-1);
                    break;
                }
                lineFile = fileInput.readLine();
            }
        } finally {
      	  if (fileInput != null) {
      		  fileInput.close();
      	  }
        }

        className += fileName.substring(0, fileName.lastIndexOf('.'));
        className = className.replace('\\', '.').replace('/', '.');
        return className;
	}

	public static BeanDebug getBeanDebug(HttpSession session, String hostName, int port) throws IOException, IllegalConnectorArgumentsException {
        BeanDebug beanDebug = (BeanDebug)session.getAttribute("beanDebug");
        if (beanDebug==null) {
        	beanDebug = createBeanDebug(hostName, port);
            session.setAttribute("beanDebug", beanDebug);
        } else {
    		initializeBeanDebug(beanDebug, hostName, port);
        }

        return beanDebug;
	}

	public static BeanDebug createBeanDebug(String hostName, int port) throws IOException, IllegalConnectorArgumentsException {
        VirtualMachine virtualMachine = UtilJDI.createVirtualMachine(hostName, port);
		BeanDebug beanDebug = new BeanDebug(virtualMachine);
//TODO The method createVirtualMachine(String, Integer) from the type UtilJDI refers to the missing type VirtualMachine
//Enable GlassFish Debug : https://docs.oracle.com/cd/E18930_01/html/821-2418/beafd.html
        beanDebug = new BeanDebug(virtualMachine);
		initializeBeanDebug(beanDebug, hostName, port);
		return beanDebug;
	}

	private static void initializeBeanDebug(BeanDebug beanDebug, String hostName, int port) throws IOException, IllegalConnectorArgumentsException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		if (virtualMachine == null) {
			virtualMachine = UtilJDI.createVirtualMachine(hostName, port);
	        beanDebug.setVirtualMachine(virtualMachine);
		}
		if (beanDebug.getThrdDebugEventQueue() == null) {
           ThrdDebugEventQueue thread = new ThrdDebugEventQueue(beanDebug, virtualMachine.eventQueue());
           thread.setOut(System.out);
           thread.setErr(System.err);
           thread.setErrTrace(System.err);
           thread.start();
           
           beanDebug.setThrdDebugEventQueue(thread);
        }
	}

	public static BreakpointRequest recreateBreakpoint(BeanDebug beanDebug, BreakpointRequest brkR) throws NumberFormatException, AbsentInformationException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
		Hashtable<String, BreakpointRequest> tableBreakpoint = beanDebug.getTableBreakpoint();
		String rowNum = (String) brkR.getProperty("line");
		String className = (String) brkR.getProperty("className");
		// Supprime le point d'arret du beanDebug
		try {
			eventRequestManager.deleteEventRequest(brkR);
		} catch(Exception ex) {
			//Catch hide delete raison
		}
		tableBreakpoint.remove(className+":"+rowNum);
		// Cree un nouveau point d'arret
		BreakpointRequest ret = UtilJDI.createBreakpointRequest(virtualMachine, className, Integer.parseInt(rowNum));
		// Ajoute le point d'arret au beanDebug
		tableBreakpoint.put(className+":"+rowNum, ret);
		return ret;
	}

	public static void deleteBreakpoint(BeanDebug beanDebug) throws NumberFormatException, AbsentInformationException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
		Hashtable<String, BreakpointRequest> tableBreakpoint = beanDebug.getTableBreakpoint();
		if (tableBreakpoint!=null) {
			BreakpointRequest brkR = null;
			Object key = null;
			Enumeration<String> enumKeys = tableBreakpoint.keys();
			while(enumKeys.hasMoreElements()) {
				key = enumKeys.nextElement();
				brkR = (BreakpointRequest)tableBreakpoint.get(key);
				eventRequestManager.deleteEventRequest(brkR);
			}
		}
	}

	// NOT USED
	public static void deleteAllBreakpoint(BeanDebug beanDebug) throws NumberFormatException, AbsentInformationException {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
		eventRequestManager.deleteAllBreakpoints();
	}

	// NOT USED
	public static void stopRunning(BeanDebug beanDebug) {
		  ThrdDebugEventQueue thrdDebugEventQueue = beanDebug.getThrdDebugEventQueue();
		  if (thrdDebugEventQueue!=null) {
			  thrdDebugEventQueue.stopRunning();
		  }
	}

	// NOT USED
	public static void recreateAllBreakpoint(BeanDebug beanDebug) {
		VirtualMachine virtualMachine = beanDebug.getVirtualMachine();
		EventRequestManager eventRequestManager = virtualMachine.eventRequestManager();
		// Recréé la totalitée des points d'arret
		Hashtable<String, BreakpointRequest> tableBreakpoint = beanDebug.getTableBreakpoint();
		if (tableBreakpoint!=null) {
			BreakpointRequest brkR1 = null, brkR2 = null;
			String key = null;
			Enumeration enumKeys = tableBreakpoint.keys();
			while(enumKeys.hasMoreElements()) {
				key = (String) enumKeys.nextElement();
				brkR1 = (BreakpointRequest)tableBreakpoint.get(key);
				// Suppression du point d'arret
				eventRequestManager.deleteEventRequest(brkR1);
				brkR2 = eventRequestManager.createBreakpointRequest(brkR1.location());
				if (brkR2!=null) {
					// Stock le nom de l'application dans le point d'arret
					brkR2.putProperty("application", brkR1.getProperty("application"));
					// Stock le chemin des sources de la class dans le point d'arret
					brkR2.putProperty("path", brkR1.getProperty("path"));
					// Stock le nom de la class dans le point d'arret
					brkR2.putProperty("className", brkR1.getProperty("className"));
					// Stock le nom du fichier dans le point d'arret
					brkR2.putProperty("fileName", brkR1.getProperty("fileName"));
					brkR2.enable();
				}
				tableBreakpoint.put(key, brkR2);
			}
		}
	}
}
