package workspace.service.debug.extjs;

import java.io.OutputStream;
import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sun.jdi.event.LocatableEvent;
import com.sun.jdi.request.BreakpointRequest;

import workspace.bean.debug.BeanDebug;

public class SrvDebugBreakpointCheck extends workspace.service.debug.SrvDebugBreakpointCheck {

	@Override
	protected void doResponse(HttpServletRequest request, HttpServletResponse response, BeanDebug beanDebug, LocatableEvent brkE) throws Exception {
		boolean stopped = false;
		String application = "";
        String className = "";
		String fileName = "";
		String line = "0";
		if (brkE != null && beanDebug.getCurrentStepEvent() == null) {
			stopped = true;
			BreakpointRequest brkR = (BreakpointRequest) brkE.request();
			application = URLEncoder.encode((String)brkR.getProperty("application"), "UTF-8");
	        className = URLEncoder.encode((String)brkR.getProperty("className"), "UTF-8");
	        fileName = URLEncoder.encode((String) brkR.getProperty("fileName"), "UTF-8");
			line = Integer.toString(brkE.location().lineNumber());
		}

        String jsonData = "{"+
        	"'stopped':" + stopped + "," +
            "'application':'" + application + "'," +
            "'className':'" + className + "'," +
        	"'line':" + line + "," +
            "'fileName':'" + fileName + "'" +
        "}";

        OutputStream os = response.getOutputStream();
        response.setContentType("text/json");
        os.write(jsonData.getBytes());
        os.close();
        return;
    }
}