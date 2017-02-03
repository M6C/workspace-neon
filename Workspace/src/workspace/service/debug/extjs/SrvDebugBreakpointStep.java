package workspace.service.debug.extjs;

import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.EventRequest;
import com.sun.jdi.request.StepRequest;

import framework.beandata.BeanGenerique;

public class SrvDebugBreakpointStep extends workspace.service.debug.SrvDebugBreakpointStep {

	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanGenerique bean, LocatableEvent brkE) throws Exception {
		// Recupere le nom de l'application du point d'arret
		boolean success = false;
		String application = "";
        String className = "";
        String line = "0";
		String fileName = "";
		String sourceName = "";
		if (brkE != null) {
			success = true;
			EventRequest brkR = (EventRequest) brkE.request();
			application = URLEncoder.encode((String) brkR.getProperty("application"), "UTF-8");
	        className = URLEncoder.encode((String)brkR.getProperty("className"), "UTF-8");
	        line = Integer.toString(brkE.location().lineNumber());
			fileName = URLEncoder.encode((String) brkR.getProperty("fileName"), "UTF-8");
			sourceName = URLEncoder.encode(brkE.location().sourceName(), "UTF-8");
		}

        String jsonData = "{"+
        	"'success':" + success + "," +
            "'application':'" + application + "'," +
            "'className':'" + className + "'," +
        	"'line':" + line + "," +
        	"'fileName':'" + fileName + "'," + 
        	"'sourceName':'" + sourceName + "'" +
        "}";

        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
        return;
    }
}